import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of, pipe } from 'rxjs';
import { Tags, Tuto } from 'src/app/types';
import { environment } from 'src/environments/environment';
import { baseClient } from '../baseClient';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  
  client = this.clientSup.client;
  tutos: Tuto[] | null = null;
  tags: Tags[] | null = null;

  constructor(private clientSup: baseClient, private http: HttpClient) {
    this.http.get(`${environment.supabaseUrl}/rest/v1/tutos`,
      {
        headers: { Authorization: `Bearer ${environment.supabaseKey}`, apikey: environment.supabaseKey }
      }).subscribe((tutos: any) => {
        this.tutos = tutos;
      });
      this.http.get(`${environment.supabaseUrl}/rest/v1/tags`,
      {
        headers: { Authorization: `Bearer ${environment.supabaseKey}`, apikey: environment.supabaseKey }
      })
      .subscribe((tags: any) => {
        this.tags = tags
      })
  }

  getTagsFromTuto(id: string) {
    this.client.from("tuto-tags").select("*").eq("id_tuto", id)
  }


  async addTuto(tuto: Tuto) {
    const response = await this.client
      .from<Tuto>('tutos')
      .insert(tuto);

    if (response.error) throw response.error;

    return response.data
  }

  getTutos() {
    return this.http.get(`${environment.supabaseUrl}/rest/v1/tutos`,
      {
        headers: { Authorization: `Bearer ${environment.supabaseKey}`, apikey: environment.supabaseKey }
      })
  }

  updateUpvote(id: any) {
    this.client.from("tutos").select().eq("id", id)
  }

  async getTuto(id: string) {
    const response = await this.client.from("tutos").select("id").eq("id", id);

    return response.data;
  }

  getTags() {
    return from(this.client.from("tags").select("*"))
  }
}
