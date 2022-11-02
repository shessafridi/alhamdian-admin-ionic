import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-save-dialog-scaffold',
  templateUrl: './save-dialog-scaffold.component.html',
  styleUrls: ['./save-dialog-scaffold.component.scss'],
})
export class SaveDialogScaffoldComponent implements OnInit {
  @Input() title = '';

  @Input() buttonConfig: {
    label: string;
    onClick: () => any;
    cssClass?: string;
    color?: string;
    fill?: string;
    size?: string;
    disabled?: () => boolean;
    show?: () => boolean;
  }[] = [];

  constructor() {}

  ngOnInit() {}
}
