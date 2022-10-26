export interface Segment {
  SegmentID: number;
  SegmentDetailID: number;
  Title: Segments;
  Details: string;
}

export enum Segments {
  Header = 'Header',
  MediaCenter = 'Media Center',
}
