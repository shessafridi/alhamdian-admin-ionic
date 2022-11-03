import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SegmentCommonModule } from '../../common/segment-common.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, SegmentCommonModule, MaterialModule],
})
export class HeaderModule {}
