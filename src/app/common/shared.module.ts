import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ConfirmDialogService } from '../services/confirm-dialog.service';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';

@NgModule({
  declarations: [ConfirmDialogComponent, YoutubePlayerComponent],
  imports: [CommonModule, MaterialModule],
  exports: [FileUploaderModule, YoutubePlayerComponent],
  providers: [ConfirmDialogService],
})
export class SharedModule {}
