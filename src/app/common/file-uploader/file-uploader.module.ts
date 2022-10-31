import { CdkModule } from './../../cdk.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilePreviewComponent } from './file-preview/file-preview.component';
import { FilesDropDirective } from '../directives/files-drop.directive';
import { FileUploaderComponent } from './file-uploader.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FileUploaderComponent,
    FilePreviewComponent,
    FilesDropDirective,
  ],
  imports: [CommonModule, MaterialModule, CdkModule, FormsModule],
  exports: [FileUploaderComponent],
})
export class FileUploaderModule {}
