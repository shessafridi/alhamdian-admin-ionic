import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
})
export class ListViewComponent implements OnInit {
  @Input() title = 'List View';
  @Input() showActions = false;
  @Output() add = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  addData() {
    this.add.emit();
  }
}
