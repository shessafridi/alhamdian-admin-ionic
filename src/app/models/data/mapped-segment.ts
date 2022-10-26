import { Segments } from 'src/app/models/data/segment';
export interface MappedSegment<T> {
  segmentId: number;
  title: Segments;
  data: T;
}
