import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NbSidebarService, NbThemeService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'best-tuto';
  selectedTheme = 'default';

  constructor(private sidebarService: NbSidebarService, private themeService: NbThemeService) {}

  change(selecte: string) {
    this.themeService.changeTheme(selecte);
  }

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }
}
