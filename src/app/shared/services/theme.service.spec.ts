import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { PLATFORM_ID } from '@angular/core';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }]
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to light mode', () => {
    expect(service.isDark).toBeFalse();
  });

  it('should toggle to dark mode', () => {
    service.init();
    service.toggle();
    expect(service.isDark).toBeTrue();
    expect(document.documentElement.classList.contains('dark')).toBeTrue();
  });

  it('should toggle back to light mode', () => {
    service.init();
    service.toggle();
    service.toggle();
    expect(service.isDark).toBeFalse();
    expect(document.documentElement.classList.contains('dark')).toBeFalse();
  });

  it('should persist theme to localStorage', () => {
    service.init();
    service.toggle();
    expect(localStorage.getItem('theme')).toBe('dark');
    service.toggle();
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should restore dark theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    service.init();
    expect(service.isDark).toBeTrue();
  });

  it('should restore light theme from localStorage', () => {
    localStorage.setItem('theme', 'light');
    service.init();
    expect(service.isDark).toBeFalse();
  });

  it('should apply dark class on init when stored as dark', () => {
    localStorage.setItem('theme', 'dark');
    service.init();
    expect(document.documentElement.classList.contains('dark')).toBeTrue();
  });
});
