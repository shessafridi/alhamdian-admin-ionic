import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  defer,
  delay,
  EMPTY,
  filter,
  finalize,
  forkJoin,
  map,
  of,
  race,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { Segment, Segments } from '../models/data/segment';
import { MappedSegment } from '../models/data/mapped-segment';
import { v4 } from 'uuid';

interface CreateAction<T> {
  type: 'create';
  segmentName: Segments;
  record: T;
}

interface DeleteAction {
  type: 'delete';
  segmentName: Segments;
  recordId: number | string;
}

interface UpdateRecordAction<T> {
  type: 'updateRecord';
  segmentName: Segments;
  recordId: number | string;
  record: T;
}

type OpQueueAction = CreateAction<any> | DeleteAction | UpdateRecordAction<any>;

@Injectable({
  providedIn: 'root',
})
export class SegmentService {
  private subject = new BehaviorSubject<Segment[]>([]);
  private dataLoaded = false;
  private busy = false;

  private opQueue$ = new Subject<OpQueueAction>();
  private doneOps$ = new Subject<OpQueueAction>();
  private failedOps$ = new Subject<{
    op: OpQueueAction;
    error: any;
  }>();

  constructor(private httpClient: HttpClient) {
    this.opQueue$
      .pipe(
        concatMap((action) =>
          forkJoin({
            action: of(action),
            results: this.performAction(action),
          }).pipe(
            tap((op) => {
              this.doneOps$.next(op.action);
            }),
            catchError((err) => {
              this.failedOps$.next({
                error: err,
                op: action,
              });

              return EMPTY;
            })
          )
        )
      )
      .subscribe(({ action, results }) => {
        console.log({ newSegments: results });
        this.subject.next(results);
      });
  }

  getAllSegmentsOnce() {
    return this.getAllSegments().pipe(take(1));
  }

  getSegmentOnce<T>(segment: Segments) {
    return this.getSegment<T>(segment).pipe(take(1));
  }

  getAllSegments() {
    return this.subject.asObservable().pipe(
      tap(this.startLoading),
      filter(() => this.dataLoaded),
      map((data) => [...data])
    );
  }

  getSegment<T>(segmentName: Segments) {
    return this.getAllSegments().pipe(
      map((ss) => ss.find((s) => s.Title === segmentName)!),
      map((segment) => {
        const mapped: MappedSegment<T> = {
          segmentId: segment.SegmentID,
          title: segment.Title,
          data: JSON.parse(segment.Details),
        };
        return mapped;
      })
    );
  }

  addRecord<T>(segmentName: Segments, record: T) {
    return this.runAction({
      type: 'create',
      record,
      segmentName,
    });
  }

  deleteRecord(segmentName: Segments, recordId: string | number) {
    return this.runAction({
      type: 'delete',
      recordId,
      segmentName,
    });
  }

  updateRecord<T>(
    segmentName: Segments,
    recordId: string | number,
    newRecord: T
  ) {
    return this.runAction({
      type: 'updateRecord',
      recordId,
      record: newRecord,
      segmentName,
    });
  }

  private loadAll() {
    if (this.busy) return;

    this.busy = true;

    this.httpClient
      .get<Segment[]>(environment.apiUrl + '/SegmentDetail')
      .pipe(finalize(() => (this.busy = false)))
      .subscribe((templates) => {
        this.dataLoaded = true;
        this.subject.next(templates);
      });
  }
  private startLoading = () => {
    if (this.busy || this.dataLoaded) return;
    this.loadAll();
  };

  private performAction(action: OpQueueAction) {
    return this.getSegmentOnce<{ id: string | number }[]>(
      action.segmentName
    ).pipe(
      switchMap((segment) => {
        console.log({ action, segment });
        if (action.type === 'create') {
          action.record.id = v4();
          segment.data = [...segment.data, action.record];
        } else if (action.type === 'delete') {
          segment.data = segment.data.filter((s) => s.id !== action.recordId);
        } else if (action.type === 'updateRecord') {
          const index = segment.data.findIndex((s) => s.id === action.recordId);
          if (index !== -1) {
            const temp = [...segment.data];
            temp.splice(index, 1, action.record);
            segment.data = [...temp];
          }
        }

        return this.saveSegment(segment);
      }),
      switchMap((dbSegment) =>
        this.getAllSegmentsOnce().pipe(
          map((allDbSegments) => {
            console.log({ dbSegment });
            const index = allDbSegments.findIndex(
              (s) => s.Title === dbSegment.Title
            );
            if (index !== -1) {
              allDbSegments.splice(index, 1, dbSegment);
            }
            return [...allDbSegments];
          })
        )
      )
    );
  }

  private saveSegment<T>(segment: MappedSegment<T>) {
    const dbSegment: Segment = {
      Details: JSON.stringify(segment.data),
      SegmentDetailID: segment.segmentId,
      SegmentID: segment.segmentId,
      Title: segment.title,
    };

    return of(null).pipe(
      // Simulating a network request
      delay(1000),
      // tap(() => {
      //   throw new Error('An error occured while saving the record');
      // }),
      map(() => dbSegment)
    );
  }

  private runAction(op: OpQueueAction) {
    const done$ = this.doneOps$.pipe(
      filter((o) => o === op),
      take(1)
    );
    const error$ = this.failedOps$.pipe(
      filter((o) => o.op === op),
      take(1),
      switchMap((val) => {
        throw val;
        return EMPTY;
      })
    );

    return defer(() => {
      this.opQueue$.next(op);
      return race(done$, error$);
    });
  }
}
