import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vine-bar',
  standalone: true,
  template: `
    <svg
      [attr.width]="'100%'"
      height="20"
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      class="vine-bar-svg"
      aria-hidden="true"
    >
      <!-- Track -->
      <line x1="4" y1="14" x2="196" y2="14" stroke="#E8E3DB" stroke-width="1.5" stroke-linecap="round"/>

      <!-- Growing vine stem -->
      <line
        x1="4" y1="14"
        [attr.x2]="stemEnd"
        y2="14"
        [attr.stroke]="stemColor"
        stroke-width="2"
        stroke-linecap="round"
        class="vine-stem"
      />

      <!-- Leaves along the vine -->
      @if (percent >= 20) {
      <g class="vine-leaf-group" style="--leaf-delay: 0.3s">
        <path [attr.d]="'M' + (stemEnd * 0.2) + ',14 Q' + (stemEnd * 0.2 - 4) + ',7 ' + (stemEnd * 0.2 - 8) + ',9'"
              fill="none" [attr.stroke]="leafColor" stroke-width="1.2" stroke-linecap="round" class="leaf"/>
        <ellipse [attr.cx]="stemEnd * 0.2 - 9" cy="8" rx="3" ry="2"
                 [attr.fill]="leafColor" transform="rotate(-30)" class="leaf-fill"
                 [attr.transform]="'rotate(-30 ' + (stemEnd * 0.2 - 9) + ' 8)'" />
      </g>
      }

      @if (percent >= 40) {
      <g class="vine-leaf-group" style="--leaf-delay: 0.45s">
        <path [attr.d]="'M' + (stemEnd * 0.45) + ',14 Q' + (stemEnd * 0.45 + 3) + ',8 ' + (stemEnd * 0.45 + 7) + ',6'"
              fill="none" [attr.stroke]="leafColor" stroke-width="1.2" stroke-linecap="round" class="leaf"/>
        <ellipse [attr.cx]="stemEnd * 0.45 + 8" cy="5" rx="3.5" ry="2"
                 [attr.fill]="leafColorAlt"
                 [attr.transform]="'rotate(20 ' + (stemEnd * 0.45 + 8) + ' 5)'" class="leaf-fill"/>
      </g>
      }

      @if (percent >= 60) {
      <g class="vine-leaf-group" style="--leaf-delay: 0.6s">
        <path [attr.d]="'M' + (stemEnd * 0.7) + ',14 Q' + (stemEnd * 0.7 - 3) + ',7 ' + (stemEnd * 0.7 - 6) + ',5'"
              fill="none" [attr.stroke]="leafColor" stroke-width="1.2" stroke-linecap="round" class="leaf"/>
        <ellipse [attr.cx]="stemEnd * 0.7 - 7" cy="4" rx="3.5" ry="2.2"
                 [attr.fill]="leafColor"
                 [attr.transform]="'rotate(-25 ' + (stemEnd * 0.7 - 7) + ' 4)'" class="leaf-fill"/>
      </g>
      }

      @if (percent >= 80) {
      <g class="vine-leaf-group" style="--leaf-delay: 0.75s">
        <path [attr.d]="'M' + (stemEnd * 0.9) + ',14 Q' + (stemEnd * 0.9 + 4) + ',6 ' + (stemEnd * 0.9 + 8) + ',4'"
              fill="none" [attr.stroke]="leafColor" stroke-width="1.2" stroke-linecap="round" class="leaf"/>
        <ellipse [attr.cx]="stemEnd * 0.9 + 9" cy="3" rx="4" ry="2.2"
                 [attr.fill]="leafColorAlt"
                 [attr.transform]="'rotate(15 ' + (stemEnd * 0.9 + 9) + ' 3)'" class="leaf-fill"/>
      </g>
      }

      <!-- Dot at the vine tip -->
      <circle [attr.cx]="stemEnd" cy="14" r="2.5" [attr.fill]="stemColor" class="vine-flower" opacity="0.7"/>
    </svg>
  `,
  styles: [`
    :host { display: block; }
    .vine-stem {
      stroke-dasharray: 200;
      stroke-dashoffset: 200;
      transition: stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    :host-context(.group:hover) .vine-stem {
      stroke-dashoffset: 0;
    }
    .leaf, .leaf-fill {
      opacity: 0;
      transform: scale(0);
      transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      transition-delay: var(--leaf-delay, 0.3s);
    }
    :host-context(.group:hover) .leaf,
    :host-context(.group:hover) .leaf-fill {
      opacity: 1;
      transform: scale(1);
    }
    .vine-flower {
      opacity: 0;
      transform: scale(0);
      transition: opacity 0.3s ease 0.7s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s;
    }
    :host-context(.group:hover) .vine-flower {
      opacity: 0.7;
      transform: scale(1);
    }
    @media (prefers-reduced-motion: reduce) {
      .vine-stem { stroke-dashoffset: 0; transition: none; }
      .leaf, .leaf-fill, .vine-flower, .vine-flower-center {
        opacity: 1; transform: scale(1); transition: none;
      }
    }
  `],
  imports: [CommonModule]
})
export class VineBarComponent {
  @Input({ required: true }) level!: string;

  get percent(): number {
    switch (this.level) {
      case 'Expert': return 100;
      case 'Proficient': return 75;
      case 'Intermediate': return 50;
      case 'Beginner': return 25;
      default: return 10;
    }
  }

  get stemEnd(): number {
    return 4 + (192 * this.percent / 100);
  }

  get stemColor(): string {
    switch (this.level) {
      case 'Expert': return '#2D5A27';
      case 'Proficient': return '#4A7C59';
      case 'Intermediate': return '#6B8F71';
      case 'Beginner': return '#87A878';
      default: return '#87A878';
    }
  }

  get leafColor(): string {
    switch (this.level) {
      case 'Expert': return '#2D5A27';
      case 'Proficient': return '#4A7C59';
      case 'Intermediate': return '#6B8F71';
      case 'Beginner': return '#A8C89A';
      default: return '#87A878';
    }
  }

  get leafColorAlt(): string {
    switch (this.level) {
      case 'Expert': return '#1B3A19';
      case 'Proficient': return '#3D6B47';
      case 'Intermediate': return '#87A878';
      case 'Beginner': return '#B5D4A7';
      default: return '#6B8F71';
    }
  }

}
