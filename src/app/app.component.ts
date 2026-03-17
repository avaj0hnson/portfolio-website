import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    this.themeService.init();
  }
}
