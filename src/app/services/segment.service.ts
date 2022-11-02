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
@Injectable({
  providedIn: 'root',
})
export class SegmentService {
  private segmentStream = new BehaviorSubject<Segment[]>([]);
  private dataLoaded = false;
  private busy = false;

  constructor(private httpClient: HttpClient) {}

  getAllSegmentsOnce() {
    return this.getAllSegments().pipe(take(1));
  }

  getSegmentOnce<T>(segment: Segments) {
    return this.getSegment<T>(segment).pipe(take(1));
  }

  getAllSegments() {
    return this.segmentStream.asObservable().pipe(
      tap(this.startLoading),
      filter(() => this.dataLoaded),
      map((data) => [...data])
    );
  }

  getSegment<T>(segmentName: Segments) {
    return this.getAllSegments().pipe(
      map((ss) => ss.find((s) => s.Title === segmentName)!),
      map(this.toMappedSegment<T>)
    );
  }

  addRecord<T extends { id: string | number }>(
    segmentName: Segments,
    record: T
  ) {
    return this.eagerUpdateSegmentArray<T>(
      segmentName,
      (segment) => {
        record.id = v4();
        segment.data = [...segment.data, record];
        return segment;
      },
      (segment) => {
        const recordIndex = segment.data.findIndex((r) => r.id === record.id);
        if (recordIndex !== -1) {
          segment.data.splice(recordIndex, 1);
        }
        return segment;
      }
    );
  }

  deleteRecord(segmentName: Segments, recordId: string | number) {
    let removedItem: null | { id: number | string } = null;
    let removedIndex = -1;
    return this.eagerUpdateSegmentArray<{ id: number | string }>(
      segmentName,
      (segment) => {
        removedItem = segment.data.find((i) => i.id === recordId) || null;
        if (removedItem) {
          removedIndex = segment.data.indexOf(removedItem);
          segment.data = segment.data.filter((d) => d.id !== recordId);
        }
        return segment;
      },
      (segment) => {
        if (removedItem && removedIndex) {
          segment.data.splice(removedIndex, 0, removedItem);
        }
        return segment;
      }
    );
  }

  updateRecord<T extends { id: string | number }>(
    segmentName: Segments,
    recordId: string | number,
    newRecord: T
  ) {
    let oldItem: null | { id: number | string } = null;
    let oldIndex = -1;
    return this.eagerUpdateSegmentArray<{ id: number | string }>(
      segmentName,
      (segment) => {
        oldItem = segment.data.find((i) => i.id === recordId) || null;
        if (oldItem) {
          oldIndex = segment.data.indexOf(oldItem);
          segment.data.splice(oldIndex, 1, newRecord);
        }
        return segment;
      },
      (segment) => {
        if (oldItem && oldIndex) {
          segment.data.splice(oldIndex, 1, oldItem);
        }
        return segment;
      }
    );
  }

  private loadAll() {
    if (this.busy) return;

    this.busy = true;

    this.httpClient
      .get<Segment[]>(environment.apiUrl + '/SegmentDetail')
      .pipe(finalize(() => (this.busy = false)))
      .subscribe({
        next: (templates) => {
          this.dataLoaded = true;
          this.segmentStream.next(templates);
        },
        error: (err) => {
          this.segmentStream.error(err);
        },
      });
  }
  private startLoading = () => {
    if (this.busy || this.dataLoaded) return;
    this.loadAll();
  };

  private toDbSegment = <T>(segment: MappedSegment<T>): Segment => ({
    SegmentDetailID: segment.segmentId,
    Details: JSON.stringify(segment.data),
    Title: segment.title,
    SegmentID: segment.segmentId,
  });

  private toMappedSegment = <T>(segment: Segment): MappedSegment<T> => ({
    segmentId: segment.SegmentID,
    title: segment.Title,
    data: JSON.parse(segment.Details),
  });

  private eagerUpdateSegmentArray<T>(
    segmentName: Segments,
    getData: (segment: MappedSegment<T[]>) => MappedSegment<T[]>,
    handleFailure: (segment: MappedSegment<T[]>) => MappedSegment<T[]>
  ) {
    return this.getSegmentOnce<T[]>(segmentName).pipe(
      switchMap((segment) => {
        const currentSegmentCopy: typeof segment = JSON.parse(
          JSON.stringify(segment)
        );
        const newSegment = getData(currentSegmentCopy);
        this.updateStreamWithSegment(newSegment);

        return this.saveSegment(currentSegmentCopy).pipe(
          map(() => currentSegmentCopy),
          catchError((err) =>
            this.getSegmentOnce<T[]>(segmentName).pipe(
              tap((currentSegment) => {
                const lastData = handleFailure(
                  JSON.parse(JSON.stringify(currentSegment))
                );
                this.updateStreamWithSegment(lastData);
                throw err;
              }),
              switchMap(() => EMPTY)
            )
          )
        );
      })
    );
  }

  private updateStreamWithSegment<T>(segment: MappedSegment<T>) {
    const currentSegments = [...this.segmentStream.getValue()];
    const segmentIndex = this.getSegmentIndex(segment);
    currentSegments.splice(segmentIndex, 1, this.toDbSegment(segment));

    this.segmentStream.next(currentSegments);
  }
  private getSegmentIndex = <T>(segment: MappedSegment<T>): number => {
    const currentSegments = this.segmentStream.getValue();
    return currentSegments.findIndex((s) => s.SegmentID === segment.segmentId);
  };

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
      tap(() => {
        throw new Error('An error occured while saving the record');
      }),
      map(() => dbSegment)
    );
  }
}
