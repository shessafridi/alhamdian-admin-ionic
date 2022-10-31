import {
  HttpEvent,
  HttpEventType,
  HttpProgressEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { distinctUntilChanged, scan } from 'rxjs/operators';

function isHttpProgressEvent(
  event: HttpEvent<unknown>
): event is HttpProgressEvent {
  return (
    event.type === HttpEventType.DownloadProgress ||
    event.type === HttpEventType.UploadProgress
  );
}

function isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
  return event.type === HttpEventType.Response;
}

export interface Upload<T> {
  progress: number;
  payload: T | null;
  state: 'PENDING' | 'IN_PROGRESS' | 'DONE';
}

export function upload<T>(): (
  source: Observable<HttpEvent<unknown>>
) => Observable<Upload<T>> {
  const initialState: Upload<T> = {
    state: 'PENDING',
    progress: 0,
    payload: null,
  };
  const reduceState = (
    state: Upload<T>,
    event: HttpEvent<unknown>
  ): Upload<T> => {
    if (isHttpProgressEvent(event)) {
      return {
        progress: event.total
          ? Math.round((100 * event.loaded) / event.total)
          : state.progress,
        state: 'IN_PROGRESS',
        payload: null,
      };
    }
    if (isHttpResponse(event)) {
      return {
        payload: event.body as T,
        progress: 100,
        state: 'DONE',
      };
    }
    return state;
  };
  return (source) =>
    source.pipe(
      scan(reduceState, initialState),
      distinctUntilChanged(
        (a, b) =>
          a.state === b.state &&
          a.progress === b.progress &&
          a.payload === b.payload
      )
    );
}
