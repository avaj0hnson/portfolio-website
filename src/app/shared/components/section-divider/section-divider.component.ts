import { Component, Input, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-section-divider',
  standalone: true,
  template: `
    <div class="section-divider" [style.background-color]="activeBgFrom" aria-hidden="true">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        class="w-full block"
        [style.height]="height + 'px'"
      >
        <path
          [attr.d]="wavePath"
          [attr.fill]="activeBgTo"
        />
        <circle cx="360" cy="40" r="3" fill="#87A878" opacity="0.5"/>
        <circle cx="720" cy="30" r="4" fill="#87A878" opacity="0.4"/>
        <circle cx="1080" cy="45" r="3" fill="#87A878" opacity="0.5"/>
      </svg>
    </div>
  `,
  styles: [`
    .section-divider {
      line-height: 0;
      margin: 0;
      padding: 0;
    }
    svg { display: block; }
  `]
})
export class SectionDividerComponent {
  @Input() bgFrom = '#F5F0E8';
  @Input() bgTo = '#ffffff';
  @Input() darkBgFrom = '';
  @Input() darkBgTo = '';
  @Input() height = 60;
  @Input() flip = false;

  themeService = inject(ThemeService);

  get activeBgFrom(): string {
    return this.themeService.isDark && this.darkBgFrom ? this.darkBgFrom : this.bgFrom;
  }

  get activeBgTo(): string {
    return this.themeService.isDark && this.darkBgTo ? this.darkBgTo : this.bgTo;
  }

  get wavePath(): string {
    if (this.flip) {
      return 'M0,80 L0,40 Q360,80 720,35 T1440,40 L1440,80 Z';
    }
    return 'M0,0 L0,40 Q360,0 720,45 T1440,40 L1440,0 Z';
  }
}
