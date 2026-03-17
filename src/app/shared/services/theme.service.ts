import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private _isDark = false;

  get isDark(): boolean {
    return this._isDark;
  }

  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const stored = localStorage.getItem('theme');
    if (stored) {
      this._isDark = stored === 'dark';
    } else {
      this._isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    this.apply();
  }

  toggle(): void {
    this._isDark = !this._isDark;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this._isDark ? 'dark' : 'light');
    }
    this.apply();
  }

  private apply(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.documentElement.classList.toggle('dark', this._isDark);
  }
}
