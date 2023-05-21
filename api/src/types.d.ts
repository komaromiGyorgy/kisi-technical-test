export interface Article {
  title: string;
  description: string;
}

export interface Meta {
  width: number;
  height: number;
  type: string;
}

export interface IResponse {
  url: string;
  meta: Meta;
  title: string;
  description: string;
}
