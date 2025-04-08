export interface Pagination<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
