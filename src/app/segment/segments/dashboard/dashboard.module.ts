import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegmentCommonModule } from '../../common/segment-common.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, SegmentCommonModule],
})
export class DashboardModule {}
