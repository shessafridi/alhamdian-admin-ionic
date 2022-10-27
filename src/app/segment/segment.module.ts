import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../common/shared.module';
import { SegmentPageRoutingModule } from './segment-routing.module';
import { SegmentPage } from './segment.page';

import { DashboardModule } from './segments/dashboard/dashboard.module';
import { HeaderModule } from './segments/header/header.module';
import { MediaCenterModule } from './segments/media-center/media-center.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    SharedModule,
    SegmentPageRoutingModule,

    DashboardModule,
    HeaderModule,
    MediaCenterModule,
  ],
  declarations: [SegmentPage],
})
export class SegmentPageModule {}
