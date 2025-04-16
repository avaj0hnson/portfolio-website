import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  skills = [
    { name: 'Angular', iconClass: 'devicon-angularjs-plain colored', level: 'Proficient' },
    { name: 'NgRx', iconClass: 'devicon-ngrx-plain colored', level: 'Proficient' },
    { name: 'TypeScript', iconClass: 'devicon-typescript-plain colored', level: 'Proficient' },
    { name: 'JavaScript', iconClass: 'devicon-javascript-plain colored', level: 'Proficient' },
    { name: 'Tailwind CSS', iconClass: 'devicon-tailwindcss-plain colored', level: 'Intermediate' },
    { name: 'HTML5', iconClass: 'devicon-html5-plain colored', level: 'Proficient' },
    { name: 'CSS3', iconClass: 'devicon-css3-plain colored', level: 'Proficient' },
    { name: 'C#', iconClass: 'devicon-csharp-line colored', level: 'Intermediate' },
    { name: 'SQL', iconClass: 'devicon-mysql-plain colored', level: 'Intermediate' },
    { name: '.NET', iconClass: 'devicon-dotnetcore-plain colored', level: 'Intermediate' },
    { name: 'Azure', iconClass: 'devicon-azure-plain colored', level: 'Intermediate' },
    { name: 'Git', iconClass: 'devicon-git-plain colored', level: 'Intermediate' },
  ];

  getLevelColor(level: string): string {
    switch (level.toLowerCase()) {
      case 'expert':
        return 'bg-green-600';
      case 'proficient':
        return 'bg-blue-600';
      case 'intermediate':
        return 'bg-yellow-600';
      case 'beginner':
        return 'bg-red-600';
      default:
        return 'bg-gray-700';
    }
  }  
}
