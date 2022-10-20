import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DbService } from '../services/db/db.service';
import { Tuto } from '../types';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  formGroup!: FormGroup;
  loading = true;

  constructor(private db: DbService, private cdr: ChangeDetectorRef) { }

  get tutos() {
    return this.db.tutos
  }

  hasControlError(controleName: string, errorName: string): boolean {
    return this.formGroup.controls[controleName].hasError(errorName);
  }

  Submit() {
    if (this.formGroup.valid) {
      // this.db.addTutorial(this.formGroup.value);
    }
  }

}
