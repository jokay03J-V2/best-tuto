import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbTagComponent, NbTagInputAddEvent, NbToastrService } from '@nebular/theme';
import { User } from '@supabase/supabase-js';
import { AuthService } from '../services/auth/auth.service';
import { DbService } from '../services/db/db.service';
import { Tags, Tuto } from '../types';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.scss']
})
export class NewPageComponent implements OnInit {
  formGroup!: FormGroup;
  errorUrl = false;
  errorTag = false;
  tags: Tags[] = [Tags.debutant, Tags.intermediaire, Tags.avance, Tags.html, Tags.css, Tags.js, Tags.ts];

  constructor(private toastrService: NbToastrService, private dbService: DbService, private authService: AuthService, private router: Router) { }

  get user() {
    return this.authService.user
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      url: new FormControl("",[ Validators.required, Validators.pattern("https://*.*/*") ]),
      tags: new FormControl([]),
    });
    if(!this.user) this.router.navigateByUrl("/account")
  }

  hasControlError(controlName: string, errorName: string): string {
    if(this.formGroup.controls[controlName].hasError(errorName)) {
      return "danger"
    }

    return "basic"
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags = this.tags.filter(t => t !== tagToRemove.text);
  }

  Submit() {
    try {
    if(this.formGroup.valid) {
      let tuto: Tuto = { url: this.formGroup.controls["url"].value, tags: this.tags, author_uuid: this.user!.id }
      this.dbService.addTuto(tuto);
      this.toastrService.show("succes !", "le tuto à bien été crée", { status: "success", preventDuplicates: true })
      this.router.navigateByUrl("/")
    } else {
      console.log(this.tags);
      
      this.errorUrl = true;
      this.errorTag = true;
      this.toastrService.show(
        'Erreur',
        `Veuillez remplir correctement le formulaire`,
        { preventDuplicates: true, status: 'danger' });
      console.log("invalid");
    }
  } catch(error) {
    console.log(error);
    
  }
}

}
