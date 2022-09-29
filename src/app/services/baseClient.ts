import { Inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root"
})
export class baseClient {
    client!: SupabaseClient;
    constructor() {
        this.client = createClient(environment.supabaseUrl,
            environment.supabaseKey,
            { persistSession: true }
        )
    }
}