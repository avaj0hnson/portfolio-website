import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isScrolled = false;
  themeService = inject(ThemeService);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScroll();
    }
  }

  @HostListener('window:scroll')
  checkScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 50;
    }
  }

  scrollTo(sectionId: string): void {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    this.isMenuOpen = false;
  }

  get isDark(): boolean {
    return this.themeService.isDark;
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
