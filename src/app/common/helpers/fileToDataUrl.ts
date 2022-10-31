import { Observable } from 'rxjs';

export function readFileAsDataUrl$(
  file: File,
  throwOnFail = true
): Observable<string | null> {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Observable<string | null>((observer) => {
    reader.onload = (): void => {
      if (typeof reader.result === 'string') {
        observer.next(reader.result);
      } else {
        observer.next(null);
      }
      observer.complete();
    };
    reader.onerror = (error: any): void => {
      if (throwOnFail) {
        observer.error(error);
      } else {
        observer.next(null);
      }
    };
  });
}
