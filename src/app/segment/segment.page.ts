import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonMenu } from '@ionic/angular';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit, AfterViewInit {
  @ViewChild(IonMenu) menu: IonMenu | null = null;

  constructor() {}

  ngAfterViewInit(): void {
    this.menu?.open(false);
  }

  ngOnInit() {}
}
