import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, finalize, map, take, tap } from 'rxjs';
import { Segment, Segments } from '../models/data/segment';
import { MappedSegment } from '../models/data/mapped-segment';

@Injectable({
  providedIn: 'root',
})
export class SegmentService {
  private subject = new BehaviorSubject<Segment[]>([]);
  private dataLoaded = false;
  private busy = false;

  private startLoading = () => {
    if (this.busy || this.dataLoaded) return;
    this.loadAll();
  };

  constructor(private httpClient: HttpClient) {}

  getAllSegments() {
    return this.subject.asObservable().pipe(
      tap(this.startLoading),
      filter(() => this.dataLoaded),
      map((data) => [...data]),
      take(1)
    );
  }

  getSegment<T>(segment: Segments) {
    return this.getAllSegments().pipe(
      map((d) => d.find((d) => d.Title === segment)!),
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
}
