export interface MediaCenterSegment {
  id: number | string;
  title: string;
  date: string;
  gallery?: Gallery[];
  imageUrl?: string;
}

export interface Gallery {
  id: number | string;
  imageUrl?: string;
  ytLink?: string;
}

export class MediaCenterSegment {
  id: number | string = '';
  title: string = '';
  date: string = new Date().toJSON();
  gallery?: Gallery[] = [];
  imageUrl?: string = '';
}
