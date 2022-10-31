import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ConfirmDialogService } from '../services/confirm-dialog.service';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import { YoutubeLinkValidatorDirective } from './directives/youtube-link-validator.directive';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    YoutubePlayerComponent,
    YoutubeLinkValidatorDirective,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    FileUploaderModule,
    YoutubePlayerComponent,
    YoutubeLinkValidatorDirective,
  ],
  providers: [ConfirmDialogService],
})
export class SharedModule {}
