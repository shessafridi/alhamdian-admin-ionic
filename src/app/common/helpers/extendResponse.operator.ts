import { map, Observable } from 'rxjs';

export function extendResponse<T, K>(customData: K) {
  return (input: Observable<T>) =>
    input.pipe(
      map((data) => ({
        ...data,
        ...customData,
      }))
    );
}
