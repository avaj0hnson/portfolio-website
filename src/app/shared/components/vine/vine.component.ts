import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vine',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [attr.width]="width"
      [attr.height]="height"
      [attr.viewBox]="'0 0 ' + width + ' ' + height"
      class="vine-svg"
      [class.vine-animate]="animate"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        [attr.d]="path"
        fill="none"
        [attr.stroke]="strokeColor"
        [attr.stroke-width]="strokeWidth"
        stroke-linecap="round"
        class="vine-stem"
      />
      <circle
        *ngFor="let leaf of leafPositions"
        [attr.cx]="leaf.x"
        [attr.cy]="leaf.y"
        [attr.r]="leafSize"
        [attr.fill]="leafColor"
        class="vine-leaf"
        [style.transition-delay]="leaf.delay + 's'"
      />
    </svg>
  `,
  styles: [`
    :host { display: block; pointer-events: none; }
    .vine-svg { overflow: visible; }
    .vine-stem {
      stroke-dasharray: 2000;
      stroke-dashoffset: 2000;
      transition: stroke-dashoffset var(--vine-duration, 1.2s) ease;
    }
    .vine-animate .vine-stem {
      stroke-dashoffset: 0;
    }
    .vine-leaf {
      opacity: 0;
      transform: scale(0);
      transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .vine-animate .vine-leaf {
      opacity: 0.7;
      transform: scale(1);
    }
    @media (prefers-reduced-motion: reduce) {
      .vine-stem { stroke-dashoffset: 0 !important; transition: none; }
      .vine-leaf { opacity: 0.7; transform: scale(1); transition: none; }
    }
  `]
})
export class VineComponent {
  @Input() width = 200;
  @Input() height = 60;
  @Input() path = 'M0,30 Q50,5 100,30 T200,30';
  @Input() strokeColor = '#4A7C59';
  @Input() strokeWidth = 2;
  @Input() leafColor = '#87A878';
  @Input() leafSize = 4;
  @Input() animate = false;
  @Input() leafPositions: { x: number; y: number; delay: number }[] = [];
}
