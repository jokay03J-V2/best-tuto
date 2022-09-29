import { Injectable } from '@angular/core';
import { Tuto } from 'src/app/types';
import { baseClient } from '../baseClient';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private clientSup: baseClient) { }

  client = this.clientSup.client;

  async addTuto(tuto: Tuto) {
    const response = await this.client
    .from<Tuto>('tutos')
    .insert(tuto)
  
    return response.data
  }

  async getTutos() {
    let data: Tuto[];
    await this.client.from<Tuto>("tutos").then((tutos) => {
      if(tutos.data === null) return data = []
      return data = tutos.data
    });
  }

  async getTuto(id: string) {
    const response = await this.client.from("tutos").select("id").eq("id", id);

    return response.data;
  }
}
