import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { bindCallback, finalize, lastValueFrom, Observable, of } from 'rxjs';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss'],
})
export class FilePreviewComponent implements OnInit {
  @Input() file!: File;
  @Output() delete = new EventEmitter<void>();

  type: 'image' | 'video' | 'audio' | 'other' = 'other';

  reading = false;
  dataUrl: string | null = null;

  constructor() {}

  async ngOnInit() {
    if (this.file.type.includes('image')) this.type = 'image';
    if (this.file.type.includes('video')) this.type = 'video';
    if (this.file.type.includes('audio')) this.type = 'audio';
    this.reading = true;
    const dataUrl = await lastValueFrom(
      this.readFile$(this.file).pipe(finalize(() => (this.reading = false)))
    );

    this.dataUrl = dataUrl;
  }

  private readFile$(file: File): Observable<string | null> {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Observable<string | null>((observer) => {
      reader.onload = (): void => {
        if (typeof reader.result === 'string') {
          observer.next(reader.result);
        } else {
          observer.next(null);
        }
        observer.complete();
      };
      reader.onerror = (error: any): void => {
        observer.error(error);
      };
    });
  }
}
