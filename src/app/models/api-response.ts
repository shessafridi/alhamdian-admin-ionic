export interface ApiResponse<T> {
  Successful: boolean;
  ErrorMessage: null;
  Response: T;
}
