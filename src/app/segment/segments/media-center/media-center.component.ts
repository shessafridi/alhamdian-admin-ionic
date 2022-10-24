import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { finalize, map } from 'rxjs';
import { MappedSegment } from 'src/app/models/data/mapped-segment';
import { Segments } from 'src/app/models/data/segment';
import { MediaCenterSegment } from 'src/app/models/data/segment-media-center';
import { SegmentService } from 'src/app/services/segment.service';

@Component({
  selector: 'app-media-center',
  templateUrl: './media-center.component.html',
  styleUrls: ['./media-center.component.scss'],
})
export class MediaCenterComponent implements OnInit {
  loading = false;
  segment: MappedSegment<MediaCenterSegment[]> | null = null;

  constructor(
    private segmentService: SegmentService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const ctrler = await this.loadingCtrl.create({
      message: 'Fetching data please wait.',
    });
    ctrler.present();
    this.loading = true;
    this.segmentService
      .getSegment<MediaCenterSegment[]>(Segments.MediaCenter)
      .pipe(
        finalize(() => {
          ctrler.remove();
          this.loading = false;
        })
      )
      .subscribe((mediaCenter) => {
        this.segment = mediaCenter;
      });
  }
}
