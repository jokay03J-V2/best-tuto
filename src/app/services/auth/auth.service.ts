import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  client = { id: this.randomId() }

  constructor() { }

  randomId() {
    return Math.floor(Math.random() * 100);
  }
}
