import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../models/project.model';
import { TiltDirective } from '../../../shared/directives/tilt.directive';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Output() select = new EventEmitter<void>();

  get webpImage(): string {
    return this.project.image.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  }

  get webpSrcset(): string {
    const base = this.project.image.replace(/\.(png|jpg|jpeg)$/i, '');
    return `${base}-640w.webp 640w, ${base}.webp 1280w`;
  }
}
