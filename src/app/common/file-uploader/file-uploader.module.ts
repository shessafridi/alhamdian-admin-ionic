import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePreviewComponent } from './file-preview/file-preview.component';
import { FilesDropDirective } from '../directives/files-drop.directive';
import { FileUploaderComponent } from './file-uploader.component';
import { MaterialModule } from 'src/app/material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FileUploaderComponent,
    FilePreviewComponent,
    FilesDropDirective,
  ],
  imports: [CommonModule, MaterialModule, DragDropModule, FormsModule],
  exports: [FileUploaderComponent],
})
export class FileUploaderModule {}
