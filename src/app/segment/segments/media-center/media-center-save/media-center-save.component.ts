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

  buttonConfig = [
    {
      label: 'Cancel',
      onClick: () => this.cancel(),
      color: 'medium',
      fill: 'clear',
    },
    {
      label: 'Save',
      onClick: () => this.confirm(),
      color: 'primary',
      fill: 'solid',
    },
  ];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
