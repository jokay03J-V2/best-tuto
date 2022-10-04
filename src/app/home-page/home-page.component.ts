import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DbService } from '../services/db/db.service';
import { Tags, Tuto } from '../types';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  formGroup!: FormGroup;
  loading = true;
  tutos: any;

  constructor(private db: DbService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.db.getTutos().subscribe((tutos) => {
      console.log(tutos);
      this.tutos = tutos
      this.loading = false;
        this.cdr.markForCheck();        
    })
  }

  downVote(div: HTMLDivElement) {
    let content = div.textContent;
    let num = parseInt(content!)
    num = num ++
    div.textContent = num.toString();
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
