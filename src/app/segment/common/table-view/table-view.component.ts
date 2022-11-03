import { Component, Input, OnInit, Type } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import {
  map,
  Observable,
  from,
  switchMap,
  delay,
  tap,
  catchError,
  of,
  startWith,
  combineLatest,
} from 'rxjs';
import { calculateVisableColumns } from 'src/app/common/helpers/calculateColumns';
import { MappedSegment } from 'src/app/models/data/mapped-segment';
import { Segments } from 'src/app/models/data/segment';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { SegmentService } from 'src/app/services/segment.service';
import { ViewportService } from 'src/app/services/viewport.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent<T extends { id: string }> implements OnInit {
  @Input() title = '';
  @Input() segmentName!: Segments;
  @Input() SaveComponent!: Type<any>;
  @Input() availableColumns: {
    name: string;
    hideOn?: string[];
  }[] = [];

  displayedColumns: string[] = [];
  visableColumns$ = this.viewportService.observe$.pipe(
    map((b) => calculateVisableColumns(b, this.availableColumns))
  );
  currentBreakpoint$ = this.viewportService.getCurrentBreakpoint();
  segment$: Observable<{
    loading: boolean;
    data: MappedSegment<T[]> | null;
    err?: any;
  }> = of({
    loading: true,
    data: null,
  });

  view$ = combineLatest({
    currentBreakpoint: this.currentBreakpoint$,
    visableColumns: this.visableColumns$,
    segment: this.segment$,
  });

  constructor(
    private segmentService: SegmentService,
    private loadingCtrl: LoadingController,
    private confirmDialogService: ConfirmDialogService,
    private viewportService: ViewportService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.segment$ = from(
      this.loadingCtrl.create({
        message: 'Fetching data please wait.',
      })
    ).pipe(
      switchMap((ctrl) => {
        ctrl.present();
        return this.segmentService.getSegment<T[]>(this.segmentName).pipe(
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

    this.view$ = combineLatest({
      currentBreakpoint: this.currentBreakpoint$,
      visableColumns: this.visableColumns$,
      segment: this.segment$,
    });
  }

  async getSaveData(modalData: T | null): Promise<T | null> {
    const modal = await this.modalController.create({
      component: this.SaveComponent,
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
      .addRecord<T>(Segments.MediaCenter, newRecord)
      .subscribe();
  }

  async onEdit(mediaCenter: T) {
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
}
