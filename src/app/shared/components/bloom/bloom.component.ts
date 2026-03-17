import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bloom',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      [attr.viewBox]="'0 0 ' + size + ' ' + size"
      class="bloom-flower"
      aria-hidden="true"
    >
      <g [attr.transform]="'translate(' + size/2 + ',' + size/2 + ')'">
        <ellipse
          *ngFor="let petal of petals; let i = index"
          [attr.rx]="size * 0.14"
          [attr.ry]="size * 0.3"
          [attr.transform]="'rotate(' + petal.angle + ') translate(0, ' + (-size * 0.18) + ')'"
          [attr.fill]="petalColor"
          class="petal"
          [style.transition-delay]="(i * 0.06) + 's'"
        />
        <circle
          [attr.r]="size * 0.1"
          [attr.fill]="centerColor"
          class="petal center"
          [style.transition-delay]="(petals.length * 0.06) + 's'"
        />
      </g>
    </svg>
  `,
  styles: [`
    :host {
      display: inline-block;
      pointer-events: none;
    }
    .petal {
      transform-origin: center center;
      opacity: 0;
      transform: scale(0);
      transition:
        transform var(--bloom-duration, 0.6s) cubic-bezier(0.34, 1.56, 0.64, 1),
        opacity calc(var(--bloom-duration, 0.6s) * 0.5) ease;
    }
    :host-context(.bloom-trigger:hover) .petal,
    :host-context(.bloom-active) .petal {
      opacity: 1;
      transform: scale(1);
    }
  `]
})
export class BloomComponent {
  @Input() size = 40;
  @Input() petalCount = 6;
  @Input() petalColor = '#E8B4B8';
  @Input() centerColor = '#D4956B';

  get petals(): { angle: number }[] {
    return Array.from({ length: this.petalCount }, (_, i) => ({
      angle: (360 / this.petalCount) * i
    }));
  }
}
