import { v4 } from 'uuid';
import { Gallery } from './../../../../models/data/segment-media-center';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MediaCenterSegment } from 'src/app/models/data/segment-media-center';
import { CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { FileUploadService } from 'src/app/services/file-upload.service';
import {
  combineLatest,
  defaultIfEmpty,
  EMPTY,
  finalize,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';
import { FileUploadResponse } from 'src/app/models/data/file-upload-response';
import { Upload } from 'src/app/common/helpers/upload.operator';
import { extendResponse } from 'src/app/common/helpers/extendResponse.operator';

@Component({
  selector: 'app-media-center-save',
  templateUrl: './media-center-save.component.html',
  styleUrls: ['./media-center-save.component.scss'],
})
export class MediaCenterSaveComponent implements OnInit {
  data: MediaCenterSegment | null = null;
  mediaCenter: MediaCenterSegment = new MediaCenterSegment();

  page: 'details' | 'content' = 'details';

  selectedImage: File | null = null;
  galleryImages: File[] = [];
  ytLinksToAdd: { link: string }[] = [];
  uploadingStatus = {
    percentage: 0,
    started: false,
  };

  constructor(
    private modalCtrl: ModalController,
    private uploadService: FileUploadService
  ) {}

  ngOnInit() {
    if (this.data) {
      this.mediaCenter = JSON.parse(JSON.stringify(this.data));
    }
  }

  removeLink(link: { link: string }) {
    this.ytLinksToAdd = this.ytLinksToAdd.filter((y) => y !== link);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  uploadImages$() {
    const coverImage$ = this.selectedImage
      ? this.uploadService
          .uploadFileObserve(this.selectedImage)
          .pipe(extendResponse({ type: 'cover' }))
      : EMPTY;
    const allImages$ = combineLatest([
      ...this.galleryImages.map((g) =>
        this.uploadService
          .uploadFileObserve(g)
          .pipe(extendResponse({ type: 'gallery' }))
      ),
      ...[coverImage$],
    ]).pipe(
      map(this.uploadService.calculateUploadPercentage),
      defaultIfEmpty(null)
    );

    return allImages$;
  }

  save() {
    const upload$ = this.uploadImages$();
    this.uploadingStatus.started = true;
    upload$
      .pipe(finalize(() => (this.uploadingStatus.started = false)))
      .subscribe({
        next: (observe) => {
          if (observe) {
            this.uploadingStatus.percentage = observe.totalPercentage;
          }
          if (observe && observe.done) {
            this.galleryImages = [];
            this.selectedImage = null;
            const cover = observe.response.find((r) => r.type === 'cover');
            const gallery = observe.response.filter((r) => r.type !== 'cover');
            if (cover) this.mediaCenter.imageUrl = cover.payload!.secure_url;
            const newGallery: Gallery[] = gallery.map((g) => ({
              id: v4(),
              imageUrl: g.payload!.secure_url,
            }));
            this.mediaCenter.gallery = [
              ...(this.mediaCenter.gallery || []),
              ...newGallery,
            ];

            console.log(observe);
          }
        },
        complete: () => {
          this.mediaCenter.gallery = [
            ...(this.mediaCenter.gallery || []),
            ...this.ytLinksToAdd.map((l) => ({ id: v4(), ytLink: l.link })),
          ];
          this.ytLinksToAdd = [];
          this.modalCtrl.dismiss(this.mediaCenter, 'save');
        },
      });
  }

  filesChange(obj: any) {
    console.log('Files Change Test', obj);
  }

  entered(event: CdkDragEnter) {
    if (!this.mediaCenter.gallery) return;
    moveItemInArray(
      this.mediaCenter.gallery,
      event.item.data,
      event.container.data
    );
  }

  removeGalleryItem(i: number) {
    if (!this.mediaCenter.gallery) return;
    this.mediaCenter.gallery.splice(i, 1);
  }
}
