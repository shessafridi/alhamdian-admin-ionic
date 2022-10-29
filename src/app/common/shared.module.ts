import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ConfirmDialogService } from '../services/confirm-dialog.service';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { FilesDropDirective } from './directives/files-drop.directive';

@NgModule({
  declarations: [ConfirmDialogComponent, FileUploaderComponent, FilesDropDirective],
  imports: [CommonModule, MaterialModule],
  exports: [FileUploaderComponent],
  providers: [ConfirmDialogService],
})
export class SharedModule {}
