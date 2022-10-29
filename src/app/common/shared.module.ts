import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ConfirmDialogService } from '../services/confirm-dialog.service';
import { FileUploaderModule } from './file-uploader/file-uploader.module';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, MaterialModule],
  exports: [FileUploaderModule],
  providers: [ConfirmDialogService],
})
export class SharedModule {}
