import { Directive, ElementRef, HostListener, Input, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective implements OnInit {
  @Input() tiltIntensity = 8;
  @Input() tiltScale = 1.02;
  @Input() tiltGlare = true;

  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = false;
  private glareEl: HTMLElement | null = null;

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (!this.isBrowser) return;

    const el = this.el.nativeElement as HTMLElement;
    el.style.transformStyle = 'preserve-3d';
    el.style.transition = 'transform 0.15s ease-out';

    if (this.tiltGlare) {
      this.glareEl = document.createElement('div');
      this.glareEl.style.cssText = `
        position: absolute; inset: 0; border-radius: inherit;
        pointer-events: none; opacity: 0;
        transition: opacity 0.3s ease;
        background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 60%);
        z-index: 10;
      `;
      el.style.position = 'relative';
      el.style.overflow = 'hidden';
      el.appendChild(this.glareEl);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (!this.isBrowser) return;
    const el = this.el.nativeElement as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (0.5 - y) * this.tiltIntensity;
    const rotateY = (x - 0.5) * this.tiltIntensity;

    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${this.tiltScale})`;

    if (this.glareEl) {
      this.glareEl.style.opacity = '1';
      this.glareEl.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.2) 0%, transparent 60%)`;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!this.isBrowser) return;
    const el = this.el.nativeElement as HTMLElement;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    if (this.glareEl) {
      this.glareEl.style.opacity = '0';
    }
  }
}
