import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { MediaCenterSegment } from 'src/app/models/data/segment-media-center';

@Component({
  selector: 'app-media-center-save',
  templateUrl: './media-center-save.component.html',
  styleUrls: ['./media-center-save.component.scss'],
})
export class MediaCenterSaveComponent implements OnInit {
  data: MediaCenterSegment | null = null;

  formGroup = this._formBuilder.group({
    mainGroup: this._formBuilder.group({
      title: [''],
      date: [''],
      imageFile: [''],
      imageFileControl: [''],
    }),
    imageGroup: this._formBuilder.group({
      gallery: this._formBuilder.array<{
        imageFile: FormControl<string>;
        imageFileControl: FormControl<string>;
        ytLink: FormControl<string>;
      }>([]),
    }),
  });

  get mainGroup(): FormGroup<{
    title: FormControl<string>;
    date: FormControl<string>;
    imageFile: FormControl<string>;
    imageFileControl: FormControl<string>;
  }> {
    return this.formGroup.get('mainGroup') as FormGroup;
  }
  get imageGroup(): FormGroup<{
    gallery: FormArray<
      FormControl<{
        imageFile: FormControl<string>;
        imageFileControl: FormControl<string>;
        ytLink: FormControl<string>;
      }>
    >;
  }> {
    return this.formGroup.get('imageGroup') as FormGroup;
  }

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
      disabled: () => true,
    },
  ];

  constructor(
    private modalCtrl: ModalController,
    private _formBuilder: FormBuilder
  ) {
    const g = this.formGroup.get('mainGroup');
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
