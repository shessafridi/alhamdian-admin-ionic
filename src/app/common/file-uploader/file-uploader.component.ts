import { Component, Input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  @Input() allowedTypes: string[] = [];
  @Input() buttonLabel = 'Choose Files';
  @Input() multiple = true;
  private _files: File[] = [];

  get files() {
    return this._files;
  }

  constructor() {}

  ngOnInit() {}

  addFilesFromInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;

    const files = Array.from(target.files);
    this.addFiles(files);
  }

  addFiles(files: File[]) {
    const filteredFiles = files.filter((f) => {
      if (this.allowedTypes.length) {
        return this.allowedTypes.some((t) => f.type === t);
      }
      return true;
    });

    this._files = [...this._files, ...filteredFiles];
  }

  removeImage(index: number) {
    this._files.splice(index, 1);
  }

  orderChanged(event: CdkDragDrop<File[]>) {
    moveItemInArray(this._files, event.previousIndex, event.currentIndex);
  }

  entered(event: CdkDragEnter) {
    moveItemInArray(this._files, event.item.data, event.container.data);
  }
}
