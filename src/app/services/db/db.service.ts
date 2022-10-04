import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of, pipe } from 'rxjs';
import { Tuto } from 'src/app/types';
import { environment } from 'src/environments/environment';
import { baseClient } from '../baseClient';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private clientSup: baseClient, private http: HttpClient) { }

  client = this.clientSup.client;
  tutos: Tuto[] | null = null

  async addTuto(tuto: Tuto) {
    const response = await this.client
      .from<Tuto>('tutos')
      .insert(tuto)

    if (response.error) throw response.error;

    return response.data
  }

  getTutos() {
    // let { error, data } = await this.client.from<Tuto>("tutos")
    // if(error) throw error
    // this.tutos = data;
    return this.http.get(`${environment.supabaseUrl}/rest/v1/tutos`,
    { headers: { Authorization: `Bearer ${environment.supabaseKey}`, apikey: environment.supabaseKey }
  })
  }

  async getTuto(id: string) {
    const response = await this.client.from("tutos").select("id").eq("id", id);

    return response.data;
  }
}
