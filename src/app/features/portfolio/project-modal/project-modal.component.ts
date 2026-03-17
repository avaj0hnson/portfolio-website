import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
import { HostListener } from '@angular/core';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, A11yModule],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class ProjectModalComponent {
  @Input({ required: true }) project!: Project;
  @Output() close = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent) {
    this.close.emit();
  }

  get webpImage(): string {
    return this.project.image.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  }

  get webpSrcset(): string {
    const base = this.project.image.replace(/\.(png|jpg|jpeg)$/i, '');
    return `${base}-640w.webp 640w, ${base}.webp 1280w`;
  }
}
