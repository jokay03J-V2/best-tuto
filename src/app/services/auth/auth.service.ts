import { Injectable } from '@angular/core';
import { baseClient } from '../baseClient';
import { createClient, Session, User } from "@supabase/supabase-js"
import { environment } from 'src/environments/environment';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User | null = null
  client = this.clientBase.client

  constructor(private clientBase: baseClient) {
    this.client.auth.onAuthStateChange((event, session) => {
      this.user = session?.user ?? null
    })
  }

  async login(email: any,password: any) {
    let { user, error } = await this.client.auth.signIn({email,password})
    if(error) throw error
  }

  async loginWithGithub() {
    let { user, error } = await this.client.auth.signIn({ provider: "github"})
  }

  async register(email: any, password: any) {
    let { user, error } = await this.client.auth.signUp({ email, password })
    if(error) 
      throw error
  }

  async signOut() {
    let user = await this.client.auth.signOut();
    this.user = null
    if(user.error) return user.error;

    return true;
  }

  // onAuthChange(f: any) {
  //   return this.client.auth.onAuthStateChange(f)
  // }

}
