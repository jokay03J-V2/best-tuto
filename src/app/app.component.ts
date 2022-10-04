import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NbSidebarService, NbThemeService } from '@nebular/theme';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'best-tuto';
  selectedTheme = 'default';

  constructor(private sidebarService: NbSidebarService, private themeService: NbThemeService,private authService: AuthService) {}

  change(selecte: string) {
    this.themeService.changeTheme(selecte);
  }

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }

  get user() {
    return this.authService.user;
  }
  
}
