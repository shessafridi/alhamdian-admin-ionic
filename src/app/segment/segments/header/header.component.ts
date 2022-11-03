import { Segments } from 'src/app/models/data/segment';
import { Component, OnInit } from '@angular/core';
import { MediaCenterSaveComponent } from '../media-center/media-center-save/media-center-save.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  segmentName = Segments.Header;
  availableColumns: {
    name: string;
    hideOn?: string[];
  }[] = [
    {
      name: 'id',
      hideOn: ['sxm'],
    },
    {
      name: 'title',
    },
    {
      name: 'nav',
    },
    {
      name: 'actions',
    },
  ];

  SaveComponent = MediaCenterSaveComponent;

  constructor() {}

  ngOnInit() {}
}
