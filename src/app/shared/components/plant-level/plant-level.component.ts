import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plant-level',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size * 1.4"
      [attr.viewBox]="'0 0 80 112'"
      class="plant-svg"
      aria-hidden="true"
    >
      <!-- Soil -->
      <ellipse cx="40" cy="106" rx="22" ry="5" [attr.fill]="soilColor" opacity="0.4"/>

      <!-- Stem -->
      <path
        [attr.d]="stemPath"
        fill="none"
        [attr.stroke]="stemColor"
        stroke-width="3"
        stroke-linecap="round"
        class="plant-stem"
      />

      <!-- Beginner: tiny sprout -->
      @if (level === 'Beginner') {
      <g>
        <path d="M40,85 Q35,78 28,80 Q32,72 40,76" [attr.fill]="leafColor" opacity="0.9"/>
      </g>
      }

      <!-- Intermediate: medium plant with leaves -->
      @if (level === 'Intermediate') {
      <g>
        <path d="M40,70 Q28,62 20,68 Q26,55 40,60" [attr.fill]="leafColor" opacity="0.9"/>
        <path d="M40,78 Q52,70 58,76 Q52,64 40,70" [attr.fill]="leafColorAlt" opacity="0.85"/>
        <path d="M40,56 Q32,48 24,54 Q30,42 40,48" [attr.fill]="leafColor" opacity="0.8"/>
      </g>
      }

      <!-- Proficient: full plant with many leaves -->
      @if (level === 'Proficient') {
      <g>
        <path d="M40,75 Q26,66 16,74 Q24,58 40,64" [attr.fill]="leafColor" opacity="0.9"/>
        <path d="M40,64 Q54,54 62,62 Q54,48 40,54" [attr.fill]="leafColorAlt" opacity="0.85"/>
        <path d="M40,50 Q28,40 18,48 Q26,32 40,40" [attr.fill]="leafColor" opacity="0.9"/>
        <path d="M40,40 Q52,30 60,38 Q52,24 40,30" [attr.fill]="leafColorAlt" opacity="0.85"/>
        <path d="M40,30 Q34,20 28,26 Q32,16 40,22" [attr.fill]="leafColor" opacity="0.8"/>
      </g>
      }

      <!-- Expert: full flowering plant -->
      @if (level === 'Expert') {
      <g>
        <path d="M40,75 Q24,64 14,74 Q22,56 40,62" [attr.fill]="leafColor" opacity="0.9"/>
        <path d="M40,62 Q56,50 66,60 Q56,44 40,50" [attr.fill]="leafColorAlt" opacity="0.85"/>
        <path d="M40,48 Q26,36 16,46 Q24,28 40,36" [attr.fill]="leafColor" opacity="0.9"/>
        <path d="M40,36 Q54,24 64,34 Q54,18 40,24" [attr.fill]="leafColorAlt" opacity="0.85"/>
        <!-- Flower petals -->
        <ellipse cx="40" cy="12" rx="7" ry="12" fill="#E8B4B8" transform="rotate(0 40 18)" opacity="0.9"/>
        <ellipse cx="40" cy="12" rx="7" ry="12" fill="#E8B4B8" transform="rotate(72 40 18)" opacity="0.8"/>
        <ellipse cx="40" cy="12" rx="7" ry="12" fill="#E8B4B8" transform="rotate(144 40 18)" opacity="0.9"/>
        <ellipse cx="40" cy="12" rx="7" ry="12" fill="#E8B4B8" transform="rotate(216 40 18)" opacity="0.8"/>
        <ellipse cx="40" cy="12" rx="7" ry="12" fill="#E8B4B8" transform="rotate(288 40 18)" opacity="0.9"/>
        <circle cx="40" cy="18" r="5" fill="#C8A951"/>
      </g>
      }
    </svg>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }
    .plant-svg {
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
    }
    .plant-stem {
      stroke-dasharray: 200;
      stroke-dashoffset: 0;
    }
  `]
})
export class PlantLevelComponent {
  @Input({ required: true }) level!: string;
  @Input() size = 60;

  get stemPath(): string {
    switch (this.level) {
      case 'Beginner': return 'M40,105 Q40,95 40,82';
      case 'Intermediate': return 'M40,105 Q38,85 40,52';
      case 'Proficient': return 'M40,105 Q38,75 40,26';
      case 'Expert': return 'M40,105 Q38,70 40,18';
      default: return 'M40,105 Q40,98 40,90';
    }
  }

  get stemColor(): string {
    switch (this.level) {
      case 'Beginner': return '#87A878';
      case 'Intermediate': return '#6B8F71';
      case 'Proficient': return '#4A7C59';
      case 'Expert': return '#2D5A27';
      default: return '#87A878';
    }
  }

  get leafColor(): string {
    switch (this.level) {
      case 'Beginner': return '#A8C89A';
      case 'Intermediate': return '#87A878';
      case 'Proficient': return '#4A7C59';
      case 'Expert': return '#2D5A27';
      default: return '#87A878';
    }
  }

  get leafColorAlt(): string {
    switch (this.level) {
      case 'Beginner': return '#B5D4A7';
      case 'Intermediate': return '#6B8F71';
      case 'Proficient': return '#3D6B47';
      case 'Expert': return '#1B3A19';
      default: return '#6B8F71';
    }
  }

  readonly soilColor = '#5D4037';
}
