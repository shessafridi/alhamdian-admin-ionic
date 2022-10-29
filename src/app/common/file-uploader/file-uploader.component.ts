import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  @Input() allowedTypes: string[] = [];
  @Input() buttonLabel = 'Choose Files';
  @Input() multiple = true;

  constructor() {}

  ngOnInit() {}
}
