export interface MediaCenterSegment {
  id: number | string;
  title: string;
  date: string;
  gallery?: Gallery[];
  imageUrl?: string;
}

export interface Gallery {
  id: number;
  imageUrl?: string;
  ytLink?: string;
}
