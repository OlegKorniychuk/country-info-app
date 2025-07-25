export type FetchResponse<T> = {
  error: number | null;
  data: T | null;
};
