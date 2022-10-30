import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FileUploaderComponent),
  multi: true,
};

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class FileUploaderComponent implements OnInit, ControlValueAccessor {
  @Input() allowedTypes: string[] = [];
  @Input() multiple = true;
  private _files: File[] = [];

  get files() {
    return this._files;
  }

  private onChangeCallback: (_: any) => void = (_: any) => {};
  private onTouchedCallback: () => void = () => {};

  touched = false;
  disabled = false;

  constructor() {}

  writeValue(obj: File[]): void {
    this.setFiles(obj);
  }
  registerOnChange(onChange: any) {
    this.onChangeCallback = onChange;
  }
  registerOnTouched(onTouched: any) {
    this.onTouchedCallback = onTouched;
  }
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
  markAsTouched() {
    if (!this.touched) {
      this.onTouchedCallback();
      this.touched = true;
    }
  }

  ngOnInit() {}

  setFiles(files: File[]) {
    this._files = [];
    this.addFiles(files);
  }

  addFilesFromInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;

    const files = Array.from(target.files);
    target.value = '';

    this.addFiles(files);
  }

  addFiles(files: File[] | null) {
    this.markAsTouched();
    if (!this.disabled && files) {
      if (!this.multiple && files.length) {
        this._files = [];
      }
      const filteredFiles = files.filter((f) => {
        if (this.allowedTypes.length) {
          return this.allowedTypes.some((t) => f.type === t);
        }
        return true;
      });

      this._files = [...this._files, ...filteredFiles];

      if (!this.multiple && this._files.length) {
        this._files = [this._files[this.files.length - 1]];
      }
      this.onChangeCallback(this._files);
    }
  }

  removeFile(index: number) {
    this.markAsTouched();
    if (!this.disabled) {
      this._files.splice(index, 1);
      this.onChangeCallback(this._files);
    }
  }

  orderChanged(event: CdkDragDrop<File[]>) {
    this.markAsTouched();
    if (!this.disabled) {
      moveItemInArray(this._files, event.previousIndex, event.currentIndex);
      this.onChangeCallback(this._files);
    }
  }

  entered(event: CdkDragEnter) {
    this.markAsTouched();
    if (!this.disabled) {
      moveItemInArray(this._files, event.item.data, event.container.data);
      this.onChangeCallback(this._files);
    }
  }
}
