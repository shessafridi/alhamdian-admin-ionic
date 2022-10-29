import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MediaCenterSegment } from 'src/app/models/data/segment-media-center';

@Component({
  selector: 'app-media-center-save',
  templateUrl: './media-center-save.component.html',
  styleUrls: ['./media-center-save.component.scss'],
})
export class MediaCenterSaveComponent implements OnInit {
  data: MediaCenterSegment | null = null;
  page: 'details' | 'content' = 'details';

  buttonConfig = [
    {
      label: 'Cancel',
      onClick: () => this.cancel(),
      color: 'medium',
      fill: 'clear',
    },
    {
      label: 'Back',
      onClick: () => this.back(),
      fill: 'clear',
      show: () => this.page === 'content',
    },
    {
      label: 'Next',
      onClick: () => this.next(),
      color: 'primary',
      fill: 'solid',
      disabled: () => false,
      show: () => this.page === 'details',
    },
    {
      label: 'Save',
      onClick: () => this.confirm(),
      color: 'primary',
      fill: 'solid',
      disabled: () => true,
      show: () => this.page === 'content',
    },
  ];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  next() {
    this.page = 'content';
  }
  back() {
    this.page = 'details';
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
