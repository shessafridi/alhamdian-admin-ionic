import { Gallery } from './../../../../models/data/segment-media-center';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MediaCenterSegment } from 'src/app/models/data/segment-media-center';
import { CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';

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

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.data) {
      this.mediaCenter = JSON.parse(JSON.stringify(this.data));
    }
  }

  next() {
    this.page = 'content';
  }
  back() {
    this.page = 'details';
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  save() {
    console.log(
      'Saving',
      this.mediaCenter,
      this.selectedImage,
      this.galleryImages
    );
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
