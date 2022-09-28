import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DbService } from '../services/db/db.service';
import { Tags } from '../types';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  tutos = this.db.getTutos();
  formGroup!: FormGroup;
  constructor(private db: DbService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      url: new FormControl('', [Validators.required, Validators.pattern("^(http|https)://*.*/*")]),
      tags: new FormControl([], [Validators.required]),
    });
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
