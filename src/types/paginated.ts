export interface PaginatedResponse<T> {
  data: T;
  pagination: {
    currentPage: number;
    nextPage: number;
    prevPage: number;
    totalPages: number;
    totalRecords: number;
    limit: number;
  };
}
