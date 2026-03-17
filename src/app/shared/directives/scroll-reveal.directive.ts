import { Directive, ElementRef, Input, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealClass = 'revealed';
  @Input() revealThreshold = 0.15;
  @Input() revealDelay = '';

  private observer: IntersectionObserver | null = null;
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.el.nativeElement.classList.add('scroll-reveal-hidden');

    if (this.revealDelay) {
      this.el.nativeElement.style.transitionDelay = this.revealDelay;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('scroll-reveal-hidden');
            entry.target.classList.add(this.revealClass);
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: this.revealThreshold }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
