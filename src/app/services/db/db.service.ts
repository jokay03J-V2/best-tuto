import { Injectable } from '@angular/core';
import { Tags, Tuto } from 'src/app/types';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  items: Tuto[] = [];

  constructor() { }

  addTutorial(url: string, tags: Tags[], author_id: number) {
    this.items.push({
      id: this.randomId(),
      url,
      tags: tags,
      author: author_id
    });
  }

  removeTutorial(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  };

  getTutos(): Tuto[] {
    return this.items;
  }

  getTuto(id: number) {
    let i = this.items.findIndex(item => item.id === id);
    return this.items[i];
  }

  randomId(): number {
    return Math.floor(Math.random() * 100);
  }
}
