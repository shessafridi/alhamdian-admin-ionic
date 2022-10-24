import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegmentPage } from './segment.page';
import { DashboardComponent } from './segments/dashboard/dashboard.component';
import { MediaCenterComponent } from './segments/media-center/media-center.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SegmentPage,
    children: [
      {
        path: 'main',
        component: DashboardComponent,
      },
      {
        path: 'media-center',
        component: MediaCenterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegmentPageRoutingModule {}
