import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Session, User } from '@supabase/supabase-js';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit {
  showPassword = false;
  formGroup!: FormGroup;
  errorEmail = false;
  errorPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
        Validators.pattern('[a-z]+@edenschool.fr'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  async Submit() {
    try {
      if (this.formGroup.valid) {
        this.errorEmail = false;
        this.errorPassword = false;
        await this.authService.login(
          this.formGroup.controls['email'].value,
          this.formGroup.controls['password'].value
        );
      } else {
        if (this.hasError('email', 'pattern')) {
          this.errorEmail = true;
          this.errorPassword = false;
          this.toastrService.show(
            'adresse email eden school requis',
            `erreur`,
            { preventDuplicates: true, status: 'danger' }
          );
          console.log('invalid');
        } else if (this.hasError('email', 'required')) {
          this.errorEmail = true;
          this.errorPassword = false;
          this.toastrService.show('adresse email requise', `erreur`, {
            preventDuplicates: true,
            status: 'danger',
          });
        } else if (this.hasError('password', 'required')) {
          this.errorPassword = true;
          this.errorEmail = false;
          this.toastrService.show('mot de passe requis', `erreur`, {
            preventDuplicates: true,
            status: 'danger',
          });
        }
      }
    } catch (err) {
      this.toastrService.show(
        'veuillez vérifier vos identifiant',
        'identifiant incorrect !'
      );
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  async navigateToSignUp() {
    this.router.navigateByUrl('/register');
  }

  get user() {
    return this.authService.user;
  }

  logOut() {
    try {
      console.log(this.user);

      this.authService.signOut();
      this.router.navigateByUrl('');
    } catch (err) {
      this.toastrService.show(
        'une erreur est survenue',
        'veuillez réesayer plus tard'
      );
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };
}
