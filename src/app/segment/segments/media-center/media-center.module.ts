import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/common/shared.module';
import { MediaCenterComponent } from './media-center.component';
import { MediaCenterSaveComponent } from './media-center-save/media-center-save.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SegmentCommonModule } from '../../common/segment-common.module';

@NgModule({
  declarations: [MediaCenterComponent, MediaCenterSaveComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    SegmentCommonModule,
    IonicModule,
    FormsModule,
  ],
})
export class MediaCenterModule {}
