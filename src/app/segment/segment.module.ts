import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegmentPageRoutingModule } from './segment-routing.module';

import { SegmentPage } from './segment.page';
import { DashboardComponent } from './segments/dashboard/dashboard.component';
import { MediaCenterComponent } from './segments/media-center/media-center.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SegmentPageRoutingModule],
  declarations: [SegmentPage, DashboardComponent, MediaCenterComponent],
})
export class SegmentPageModule {}
