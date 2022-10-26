import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { finalize, Subject, takeUntil } from 'rxjs';
import { MappedSegment } from 'src/app/models/data/mapped-segment';
import { Segments } from 'src/app/models/data/segment';
import { MediaCenterSegment } from 'src/app/models/data/segment-media-center';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { SegmentService } from 'src/app/services/segment.service';
import { v4 } from 'uuid';
@Component({
  selector: 'app-media-center',
  templateUrl: './media-center.component.html',
  styleUrls: ['./media-center.component.scss'],
})
export class MediaCenterComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'title', 'date', 'actions'];
  loading = false;
  segment: MappedSegment<MediaCenterSegment[]> | null = null;

  private dispose$ = new Subject<void>();

  constructor(
    private segmentService: SegmentService,
    private loadingCtrl: LoadingController,
    private confirmDialogService: ConfirmDialogService
  ) {}

  async ngOnInit() {
    const ctrler = await this.loadingCtrl.create({
      message: 'Fetching data please wait.',
    });
    ctrler.present();
    this.loading = true;
    this.segmentService
      .getSegment<MediaCenterSegment[]>(Segments.MediaCenter)
      .pipe(takeUntil(this.dispose$))
      .subscribe({
        next: (mediaCenter) => {
          this.loading = false;
          ctrler.remove();
          console.log({ mediaCenter });
          this.segment = mediaCenter;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
          ctrler.remove();
        },
      });
  }

  addNew() {
    const newRecord: MediaCenterSegment = {
      id: v4(),
      date: new Date().toJSON(),
      title: 'Test',
      gallery: [],
      imageUrl: '',
    };
    if (this.segment) {
      this.segment.data = [...this.segment.data, newRecord];
    }
    this.segmentService
      .addRecord<MediaCenterSegment>(Segments.MediaCenter, newRecord)
      .subscribe({
        next: (res) => {
          console.log({ res }, 'ADD RESPONSE');
        },
        error: (err) => {
          if (this.segment) {
            this.segment.data = this.segment.data.filter(
              (d) => d.id !== newRecord.id
            );
          }
          console.log({ err });
        },
      });
  }

  async onDelete(id: number) {
    const allowed = await this.confirmDialogService.ask();
    if (!allowed) return;
  }

  ngOnDestroy(): void {
    this.dispose$.next();
    this.dispose$.complete();
  }
}
