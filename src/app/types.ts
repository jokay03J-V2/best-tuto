export type Tuto = {
  id?: number;
  url: string;
  tags: Tags[];
  author_uuid: string;
  summary: string;
  title: string;
  upvote: Upvote[] | null;
}

export type Tags = {
  id: string;
  label: string;
}

type Upvote = {
  uuid: number;
}