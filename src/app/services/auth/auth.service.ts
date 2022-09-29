import { Injectable } from '@angular/core';
import { baseClient } from '../baseClient';
import { createClient, Session, User } from "@supabase/supabase-js"
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private clientBase: baseClient) { }

  user: User | null = null
  client = this.clientBase.client

  async login(email: any,password: any) {
    let { user, error } = await this.client.auth.signIn({email,password})
    if(error) throw error
    this.user = user
  }

  async register(email: any, password: any) {
    let { user, error } = await this.client.auth.signUp({ email, password })
    if(error) 
      throw error
    this.user = user
  }

  async signOut() {
    let user = await this.client.auth.signOut();
    this.user = null
    if(user.error) return user.error;

    return true;
  }

}
