import { Component, Input, inject, PLATFORM_ID, OnInit, OnChanges } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

interface BloomInstance {
  id: number;
  x: number;
  y: number;
  size: number;
  petalCount: number;
  color: string;
  rotation: number;
}

@Component({
  selector: 'app-ambient-blooms',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isBrowser) {
    <div class="bloom-canvas" aria-hidden="true">
      @for (bloom of activeBlooms; track bloom.id) {
      <svg
        [style.left.px]="bloom.x"
        [style.top.px]="bloom.y"
        [style.width.px]="bloom.size"
        [style.height.px]="bloom.size"
        [attr.viewBox]="'0 0 40 40'"
        class="hover-bloom"
      >
        <g [attr.transform]="'rotate(' + bloom.rotation + ' 20 20)'">
          @for (angle of getPetalAngles(bloom.petalCount); track $index) {
          <ellipse
            cx="20" cy="10" rx="4" ry="9"
            [attr.fill]="bloom.color"
            [attr.transform]="'rotate(' + angle + ' 20 20)'"
          />
          }
          <circle cx="20" cy="20" r="2.5" fill="#C8A951" opacity="0.6"/>
        </g>
      </svg>
      }
    </div>
    }
  `,
  styles: [`
    .bloom-canvas {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      z-index: 2;
    }
    .hover-bloom {
      position: absolute;
      transform: translate(-50%, -50%);
      will-change: transform, opacity;
      animation: hoverBloom 2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes hoverBloom {
      0% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0) rotate(0deg);
      }
      15% {
        opacity: 0.25;
        transform: translate(-50%, -50%) scale(1) rotate(8deg);
      }
      50% {
        opacity: 0.12;
        transform: translate(-50%, -50%) scale(1.15) rotate(12deg);
      }
      100% {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.3) rotate(18deg);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .hover-bloom { animation: none; display: none; }
    }
  `]
})
export class AmbientBloomsComponent implements OnInit, OnChanges {
  @Input() mouseX = 0;
  @Input() mouseY = 0;

  activeBlooms: BloomInstance[] = [];
  isBrowser = false;

  private platformId = inject(PLATFORM_ID);
  private nextId = 0;
  private lastSpawn = 0;
  private spawnInterval = 200;
  private colors = ['#E8B4B8', '#F0D0D4', '#D4956B', '#E8C4C8', '#C8A951'];

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnChanges(): void {
    if (!this.isBrowser) return;

    const now = Date.now();
    if (now - this.lastSpawn < this.spawnInterval) return;
    if (this.mouseX === 0 && this.mouseY === 0) return;
    this.lastSpawn = now;

    const bloom: BloomInstance = {
      id: this.nextId++,
      x: this.mouseX,
      y: this.mouseY,
      size: 40 + Math.random() * 40,
      petalCount: 5 + Math.floor(Math.random() * 3),
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      rotation: Math.random() * 360,
    };

    this.activeBlooms.push(bloom);

    setTimeout(() => {
      this.activeBlooms = this.activeBlooms.filter(b => b.id !== bloom.id);
    }, 2000);

    if (this.activeBlooms.length > 12) {
      this.activeBlooms = this.activeBlooms.slice(-12);
    }
  }

  trackBloom(_: number, bloom: BloomInstance): number {
    return bloom.id;
  }

  getPetalAngles(count: number): number[] {
    return Array.from({ length: count }, (_, i) => (360 / count) * i);
  }
}
