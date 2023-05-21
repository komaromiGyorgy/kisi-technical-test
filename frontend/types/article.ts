export interface Meta {
  width: number;
  height: number;
  type: string;
}

export interface Article {
  url: string;
  meta: Meta;
  title: string;
  description: string;
  uploading?: boolean;
  progress?: number;
}
