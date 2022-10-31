import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Upload, upload } from '../common/helpers/upload.operator';
import { of, takeWhile } from 'rxjs';
import { FileUploadResponse } from '../models/data/file-upload-response';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private httpClient: HttpClient) {}

  private getFormData(file: File) {
    const form = new FormData();
    form.append('upload_preset', environment.cloudinaryUploadPreset);
    form.append('file', file);
    return form;
  }

  uploadFileObserve(file: File) {
    const form = this.getFormData(file);
    return this.httpClient
      .post(environment.fileUploadUrl, form, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        upload<FileUploadResponse>(),
        takeWhile((upload) => upload.state !== 'DONE', true)
      );
  }

  uploadFile(file: File) {
    const form = this.getFormData(file);
    return this.httpClient
      .post<FileUploadResponse>(environment.fileUploadUrl, form)
      .pipe();
  }

  readonly calculateUploadPercentage = <T extends Upload<any>>(
    res: T[]
  ): { totalPercentage: number; response: T[]; done: boolean } => {
    const total = res.length * 100;
    const part = res.reduce((prev, acc) => {
      return prev + acc.progress;
    }, 0);
    const response = res;
    return {
      totalPercentage: res.length ? (part / total) * 100 : 100,
      response,
      done: response.every((r) => r.state === 'DONE'),
    };
  };
}
