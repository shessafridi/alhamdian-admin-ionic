import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { finalize, lastValueFrom, Observable, of } from 'rxjs';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss'],
})
export class FilePreviewComponent implements OnInit, OnDestroy {
  @Input() file!: File;
  @Output() delete = new EventEmitter<void>();

  type: 'image' | 'video' | 'audio' | 'other' = 'other';

  reading = false;
  dataUrl: string | null | SafeUrl = null;

  constructor(private _sanitizer: DomSanitizer) {}

  async ngOnInit() {
    if (this.file.type.includes('image')) this.type = 'image';
    if (this.file.type.includes('video')) this.type = 'video';
    if (this.file.type.includes('audio')) this.type = 'audio';

    if (this.type === 'other') return;

    const readable = ['image', 'audio'];
    const convertableToBlobUrl = ['video'];

    const isReadable = readable.some((t) => this.type === t);
    const canConvertToBlobUrl = convertableToBlobUrl.some(
      (t) => this.type === t
    );

    if (isReadable) {
      this.reading = true;
      const dataUrl = await lastValueFrom(
        this.readFile$(this.file).pipe(finalize(() => (this.reading = false)))
      );

      this.dataUrl = dataUrl;
    } else if (canConvertToBlobUrl) {
      const url = URL.createObjectURL(this.file);
      this.dataUrl = this._sanitizer.bypassSecurityTrustResourceUrl(url);
    }
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

  ngOnDestroy(): void {
    URL.createObjectURL(this.file);
  }
}
