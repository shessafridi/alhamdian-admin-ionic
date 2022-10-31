import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  uploadFile(file: File) {}
  uploadFileObserve(file: File) {}
}
