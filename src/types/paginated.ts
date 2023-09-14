export interface PaginatedResponse<T> {
  posts: T; // TODO: Change to data once API returns data
  pagination: {
    currentPage: number;
    nextPage: number;
    prevPage: number;
    totalPages: number;
    totalRecords: number;
    limit: number;
  };
}
