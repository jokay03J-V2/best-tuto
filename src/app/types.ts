export type Tuto = {
  id?: number;
  url: string;
  tags: Tags[];
  author: string;
}

export enum Tags {
  debutant = 'débutant',
  intermediaire = 'intermédiaire',
  avance = 'avancé',
  js = 'javascript',
  ts = 'typescript',
  html = 'html',
  css = 'css',
}