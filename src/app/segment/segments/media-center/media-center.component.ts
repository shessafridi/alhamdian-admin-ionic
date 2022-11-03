import { Component, OnInit } from '@angular/core';

import { Segments } from 'src/app/models/data/segment';
import { MediaCenterSaveComponent } from './media-center-save/media-center-save.component';
@Component({
  selector: 'app-media-center',
  templateUrl: './media-center.component.html',
  styleUrls: ['./media-center.component.scss'],
})
export class MediaCenterComponent implements OnInit {
  SaveComponent = MediaCenterSaveComponent;
  segmentName = Segments.MediaCenter;
  availableColumns = [
    {
      name: 'id',
      hideOn: ['xsm'],
    },

    {
      name: 'title',
    },
    {
      name: 'date',
    },
    {
      name: 'actions',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
