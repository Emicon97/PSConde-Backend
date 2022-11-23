export interface Pagination {
  limit: number;
  skip: number;
  filters: {
    filters: {
      category: string[];
      filter: string[];
      brand: string[];
    };
    search: string;
  };
}
