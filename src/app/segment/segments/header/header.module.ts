import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SegmentCommonModule } from '../../common/segment-common.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, SegmentCommonModule],
})
export class HeaderModule {}
