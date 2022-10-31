import { ViewportService } from './../../../services/viewport.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingController, ModalController } from '@ionic/angular';
import { finalize, lastValueFrom, Subject, takeUntil } from 'rxjs';
import { MappedSegment } from 'src/app/models/data/mapped-segment';
import { Segments } from 'src/app/models/data/segment';
import { MediaCenterSegment } from 'src/app/models/data/segment-media-center';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { SegmentService } from 'src/app/services/segment.service';
import { v4 } from 'uuid';
import { MediaCenterSaveComponent } from './media-center-save/media-center-save.component';
@Component({
  selector: 'app-media-center',
  templateUrl: './media-center.component.html',
  styleUrls: ['./media-center.component.scss'],
})
export class MediaCenterComponent implements OnInit, OnDestroy {
  private availableColumns = [
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

  displayedColumns: string[] = [];
  loading = false;
  segment: MappedSegment<MediaCenterSegment[]> | null = null;

  private dispose$ = new Subject<void>();

  constructor(
    private segmentService: SegmentService,
    private loadingCtrl: LoadingController,
    private confirmDialogService: ConfirmDialogService,
    private dialog: MatDialog,
    public readonly viewportService: ViewportService,
    private modalController: ModalController
  ) {
    this.viewportService.observe$
      .pipe(takeUntil(this.dispose$))
      .subscribe((breakpoints) => {
        this.calculateVisableColumns(breakpoints);
      });
  }

  private calculateVisableColumns(breakpoints: {
    xsm: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xlg: boolean;
  }) {
    let temp = [...this.availableColumns];
    if (breakpoints.xsm)
      temp = temp.filter((d) => !d.hideOn || !d.hideOn.includes('xsm'));
    if (breakpoints.sm)
      temp = temp.filter((d) => !d.hideOn || !d.hideOn.includes('sm'));
    if (breakpoints.md)
      temp = temp.filter((d) => !d.hideOn || !d.hideOn.includes('md'));
    if (breakpoints.lg)
      temp = temp.filter((d) => !d.hideOn || !d.hideOn.includes('lg'));
    if (breakpoints.xlg)
      temp = temp.filter((d) => !d.hideOn || !d.hideOn.includes('xlg'));
    this.displayedColumns = temp.map((t) => t.name);
  }

  async ngOnInit() {
    this.loading = true;
    const ctrler = await this.loadingCtrl.create({
      message: 'Fetching data please wait.',
    });
    ctrler.present();
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

  async getSaveData(
    modalData: MediaCenterSegment | null
  ): Promise<MediaCenterSegment | null> {
    const modal = await this.modalController.create({
      component: MediaCenterSaveComponent,
      componentProps: {
        data: modalData ? JSON.parse(JSON.stringify(modalData)) : null,
      },
      cssClass: 'save-modal',
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    return data || null;
  }

  async addNew() {
    if (!this.segment) return;
    const newRecord2 = await this.getSaveData(null);

    const newRecord: MediaCenterSegment = {
      id: v4(),
      date: new Date().toJSON(),
      title: 'Test',
      gallery: [],
      imageUrl: '',
    };
    const segmentData = this.segment.data;
    this.segment.data = [...segmentData, newRecord];

    this.segmentService
      .addRecord<MediaCenterSegment>(Segments.MediaCenter, newRecord)
      .subscribe({
        next: (res) => {
          console.log({ res }, 'ADD RESPONSE');
        },
        error: (err) => {
          console.log({ err });
          if (!this.segment) return;
          this.segment.data = [...this.segment.data].filter(
            (d) => d.id !== newRecord.id
          );
        },
      });
  }

  async onEdit(mediaCenter: MediaCenterSegment) {
    const updated = await this.getSaveData(mediaCenter);
    console.log(updated);
  }

  async onDelete(id: number) {
    if (!this.segment) return;
    const allowed = await this.confirmDialogService.ask();
    if (!allowed) return;

    const data = [...this.segment.data];
    const found = data.find((d) => d.id === id);
    if (!found) return;
    const index = data.indexOf(found);

    this.segment.data = data.filter((d) => d.id !== id);

    this.segmentService.deleteRecord(Segments.MediaCenter, id).subscribe({
      next: (res) => {
        console.log({ res }, 'DELETE RESPONSE');
      },
      error: (err) => {
        console.log({ err });

        if (!this.segment) return;
        const existingData = [...this.segment.data];
        existingData.splice(index, 0, found);
        this.segment.data = existingData;
      },
    });
  }

  ngOnDestroy(): void {
    this.dispose$.next();
    this.dispose$.complete();
  }
}
