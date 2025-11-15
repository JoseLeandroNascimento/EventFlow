import { LocalRecord } from "./Local";

export interface LocalListResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: LocalRecord[];
}
