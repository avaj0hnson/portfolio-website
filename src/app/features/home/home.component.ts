import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import Typed from 'typed.js';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ContactComponent } from '../contact/contact.component';
import { SkillsComponent } from '../skills/skills.component';
import { LeafParticlesComponent } from '../../shared/components/leaf-particles/leaf-particles.component';
import { SectionDividerComponent } from '../../shared/components/section-divider/section-divider.component';
import { AmbientBloomsComponent } from '../../shared/components/ambient-blooms/ambient-blooms.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PortfolioComponent,
    ContactComponent,
    SkillsComponent,
    LeafParticlesComponent,
    SectionDividerComponent,
    AmbientBloomsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('typedElement', { static: false }) typedElement: ElementRef | undefined;
  @ViewChild('heroContent', { static: false }) heroContent: ElementRef | undefined;

  private platformId = inject(PLATFORM_ID);
  vineAnimated = false;
  mouseX = 0;
  mouseY = 0;
  heroMouseX = 0;
  heroMouseY = 0;
  private isDesktop = false;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.typedElement) {
        new Typed(this.typedElement.nativeElement, {
          strings: ['Software Engineer.', 'Web Developer.', 'Problem Solver.'],
          typeSpeed: 50,
          backSpeed: 30,
          loop: true
        });
      }
      this.isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      setTimeout(() => this.vineAnimated = true, 300);
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Parallax only on desktop (mouse devices)
    if (this.isDesktop) {
      this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    // Blooms fire on all devices
    if (e.clientY < window.innerHeight) {
      this.heroMouseX = e.clientX;
      this.heroMouseY = e.clientY;
    }
  }

  @HostListener('window:touchmove', ['$event'])
  onTouchMove(e: TouchEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const touch = e.touches[0];
    if (touch && touch.clientY < window.innerHeight) {
      this.heroMouseX = touch.clientX;
      this.heroMouseY = touch.clientY;
    }
  }

  get parallaxText(): string {
    return `translate(${this.mouseX * -8}px, ${this.mouseY * -6}px)`;
  }

  get parallaxVines(): string {
    return `translate(${this.mouseX * 4}px, ${this.mouseY * 3}px)`;
  }

  get parallaxParticles(): string {
    return `translate(${this.mouseX * 12}px, ${this.mouseY * 8}px)`;
  }

  scrollToPortfolio(): void {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  }
}
