import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import Typed from 'typed.js';
import { PortfolioComponent } from "../portfolio/portfolio.component";
import { ContactComponent } from "../contact/contact.component";
import { SkillsComponent } from "../skills/skills.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PortfolioComponent, ContactComponent, SkillsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('typedElement', { static: false }) typedElement!: ElementRef;
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const options = {
        strings: ['Software Engineer.', 'Web Developer.', 'Angular Enthusiast.'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
      };

      new Typed(this.typedElement.nativeElement, options);
    }
  }

  scrollToPortfolio() {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: 'smooth' });
  }
}
