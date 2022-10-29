import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[filesDrop]',
})
export class FilesDropDirective {
  constructor() {}
  @Output() fileDropped = new EventEmitter<File[]>();
  @HostBinding('class') private classList = 'dragzone';

  @HostListener('dragover', ['$event']) dragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.classList = 'dragzone dragzone-active';
  }

  @HostListener('dragleave', ['$event']) public dragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.classList = 'dragzone';
  }

  @HostListener('drop', ['$event']) public drop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.classList = 'dragzone';

    if (!event.dataTransfer) return;
    const files: FileList = event.dataTransfer.files;
    if (files.length) this.fileDropped.emit(Array.from(files));
  }
}
