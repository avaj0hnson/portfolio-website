import { Component, Input, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

interface Leaf {
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  opacity: number;
  path: string;
}

@Component({
  selector: 'app-leaf-particles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="leaf-particles-container" aria-hidden="true" *ngIf="isBrowser">
      <svg
        *ngFor="let leaf of leaves"
        [style.left.%]="leaf.x"
        [style.--drift-duration]="leaf.duration + 's'"
        [style.animation-delay]="leaf.delay + 's'"
        [style.width.px]="leaf.size"
        [style.height.px]="leaf.size"
        class="leaf animate-leaf-drift"
        viewBox="0 0 24 24"
      >
        <path
          [attr.d]="leaf.path"
          [attr.fill]="leafColor"
          [attr.opacity]="leaf.opacity"
        />
      </svg>
    </div>
  `,
  styles: [`
    .leaf-particles-container {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      z-index: 1;
    }
    .leaf {
      position: absolute;
      top: -5%;
      will-change: transform;
    }
    .animate-leaf-drift {
      animation: leaf-drift var(--drift-duration, 8s) linear infinite;
    }
    @keyframes leaf-drift {
      0% { transform: translateY(-10%) rotate(0deg); opacity: 0; }
      10% { opacity: 0.6; }
      90% { opacity: 0.6; }
      100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .animate-leaf-drift { animation: none; }
      .leaf { display: none; }
    }
  `]
})
export class LeafParticlesComponent implements OnInit {
  @Input() count = 12;
  @Input() leafColor = '#4A7C59';

  leaves: Leaf[] = [];
  isBrowser = false;

  private platformId = inject(PLATFORM_ID);

  private leafPaths = [
    'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1-2 2-5 2-10S13 2 12 2z',
    'M17 8C8 10 5.9 16.09 3.82 21.15c.55.13 1.1.2 1.67.2 5.52 0 10-4.48 10-10 0-1.25-.5-3.35-1.5-5.35',
    'M12 1C9 4 7 8 7 12s2 8 5 11c3-3 5-7 5-11s-2-8-5-11z',
  ];

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (!this.isBrowser) return;

    const isMobile = window.innerWidth < 768;
    const leafCount = isMobile ? Math.max(4, Math.floor(this.count / 2)) : this.count;

    this.leaves = Array.from({ length: leafCount }, () => ({
      x: Math.random() * 100,
      size: 12 + Math.random() * 16,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
      opacity: 0.2 + Math.random() * 0.4,
      path: this.leafPaths[Math.floor(Math.random() * this.leafPaths.length)],
    }));
  }
}
