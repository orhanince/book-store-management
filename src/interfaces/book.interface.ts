export interface IBook {
  ID: bigint;
  name: string;
  slug: string;
  author: string;
  publisher: string;
  publishedDate: number;
  quantity: number;
  status: string;
}
