import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Session, User } from '@supabase/supabase-js';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'best-tuto';
  selectedTheme = 'default';

  constructor(
    private themeService: NbThemeService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  change(selecte: string) {
    this.themeService.changeTheme(selecte);
  }

  get user() {
    return this.authService.user;
  }

}
