import { ViewportService } from './../../../services/viewport.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingController, ModalController } from '@ionic/angular';
import {
  map,
  Subject,
  takeUntil,
  combineLatest,
  catchError,
  from,
  switchMap,
  tap,
  startWith,
  delay,
  of,
  Observable,
} from 'rxjs';
import { MappedSegment } from 'src/app/models/data/mapped-segment';
import { Segments } from 'src/app/models/data/segment';
import { MediaCenterSegment } from 'src/app/models/data/segment-media-center';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { SegmentService } from 'src/app/services/segment.service';
import { v4 } from 'uuid';
import { MediaCenterSaveComponent } from './media-center-save/media-center-save.component';
import { calculateVisableColumns } from 'src/app/common/helpers/calculateColumns';
@Component({
  selector: 'app-media-center',
  templateUrl: './media-center.component.html',
  styleUrls: ['./media-center.component.scss'],
})
export class MediaCenterComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [];
  // loading = false;
  // segment: MappedSegment<MediaCenterSegment[]> | null = null;

  visableColumns$ = this.viewportService.observe$.pipe(
    map((b) => calculateVisableColumns(b, this.availableColumns))
  );
  currentBreakpoint$ = this.viewportService.getCurrentBreakpoint();
  segment$: Observable<{
    loading: boolean;
    data: MappedSegment<MediaCenterSegment[]> | null;
    err?: any;
  }> = from(
    this.loadingCtrl.create({
      message: 'Fetching data please wait.',
    })
  ).pipe(
    switchMap((ctrl) => {
      ctrl.present();
      return this.segmentService
        .getSegment<MediaCenterSegment[]>(Segments.MediaCenter)
        .pipe(
          delay(10000),
          map((data) => ({
            loading: false,
            data,
          })),
          tap((data) => {
            if (!data.loading) ctrl.remove();
          }),
          catchError((err) => {
            ctrl.remove();
            console.log(err, 'Error while loading');
            return of({ loading: false, data: null, err });
          }),
          startWith({ loading: true, data: null })
        );
    })
  );

  view$ = combineLatest({
    currentBreakpoint: this.currentBreakpoint$,
    visableColumns: this.visableColumns$,
    segment: this.segment$,
  });

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

  private dispose$ = new Subject<void>();

  constructor(
    private segmentService: SegmentService,
    private loadingCtrl: LoadingController,
    private confirmDialogService: ConfirmDialogService,
    private viewportService: ViewportService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    // this.loading = true;
    // const ctrler = await this.loadingCtrl.create({
    //   message: 'Fetching data please wait.',
    // });
    // ctrler.present();
    // this.segmentService
    //   .getSegment<MediaCenterSegment[]>(Segments.MediaCenter)
    //   .pipe(takeUntil(this.dispose$))
    //   .subscribe({
    //     next: (mediaCenter) => {
    //       this.loading = false;
    //       ctrler.remove();
    //       console.log({ mediaCenter });
    //       this.segment = mediaCenter;
    //     },
    //     error: (err) => {
    //       console.error(err);
    //       this.loading = false;
    //       ctrler.remove();
    //     },
    //   });
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
      backdropDismiss: false,
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    return data || null;
  }

  async addNew() {
    const newRecord = await this.getSaveData(null);
    if (!newRecord) return;

    this.segmentService
      .addRecord<MediaCenterSegment>(Segments.MediaCenter, newRecord)
      .subscribe();
  }

  async onEdit(mediaCenter: MediaCenterSegment) {
    const updated = await this.getSaveData(mediaCenter);
    if (!updated) return;

    this.segmentService
      .updateRecord(Segments.MediaCenter, mediaCenter.id, updated)
      .subscribe();
  }

  async onDelete(id: number) {
    const allowed = await this.confirmDialogService.ask();
    if (!allowed) return;

    this.segmentService.deleteRecord(Segments.MediaCenter, id).subscribe();
  }

  ngOnDestroy(): void {
    this.dispose$.next();
    this.dispose$.complete();
  }
}
