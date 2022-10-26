import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegmentPageRoutingModule } from './segment-routing.module';

import { SegmentPage } from './segment.page';
import { DashboardComponent } from './segments/dashboard/dashboard.component';
import { MediaCenterComponent } from './segments/media-center/media-center.component';
import { MaterialModule } from '../material.module';
import { ListViewComponent } from './segments/list-view/list-view.component';
import { SharedModule } from '../common/shared.module';
import { HeaderComponent } from './segments/header/header.component';
import { NavbarWrapperComponent } from './segments/navbar-wrapper/navbar-wrapper.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    SharedModule,
    SegmentPageRoutingModule,
  ],
  declarations: [
    SegmentPage,
    DashboardComponent,
    MediaCenterComponent,
    HeaderComponent,
    ListViewComponent,
    NavbarWrapperComponent,
  ],
})
export class SegmentPageModule {}
