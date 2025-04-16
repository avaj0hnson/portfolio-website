import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectCardComponent } from './project-card/project-card.component';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Project, ProjectCategory } from '../../shared/models/project.model';
import { ProjectModalComponent } from './project-modal/project-modal.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, ProjectModalComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        query('app-project-card', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(100, [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class PortfolioComponent {
  selectedCategory: ProjectCategory | 'all' = 'all';
  categories: Array<'all' | ProjectCategory> = ['all', 'apps', 'me', 'websites'];
  selectedProject: Project | null = null;

  projects: Project[] = [
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio built with Angular, Tailwind CSS, and Angular Material to showcase web development projects.',
      image: 'img/portfolio-thumbnail.png',
      category: ['websites', 'me'],
      tags: ['Angular', 'Tailwind', 'Material Design'],
      links: [
        { label: 'Live Site', url: 'https://yourportfolio.com' },
        { label: 'GitHub', url: 'https://github.com/yourusername/portfolio-site' }
      ]
    },    
    {
      title: 'Reality Flow',
      description: 'Reality Flow is an experimental XR content creation platform. Our team developed the mobile app, web portal, and in-VR user interface that allow users to manage accounts, browse shared projects, and collaborate across devices. These interfaces were built using React, React Native, GraphQL, Prisma, and MongoDB, and integrated directly into the Unity-based VR experience.',
      image: 'img/realityflow-thumbnail.png',
      links: [
        { label: 'GitHub', url: 'https://github.com/orgs/many-realities-studio/teams/realityflow-gold/repositories' },
        { label: 'Live Site', url: 'https://reality.gaim.ucf.edu/' },
        { label: 'About', url: 'https://realityflow.io/' }
      ],
      category: ['apps', 'websites'],
      tags: ['React', 'React Native', 'GraphQL', 'MongoDB', 'Prisma']
    },
    {
      title: 'Asobi',
      description: 'Interactive media database built with the MERN stack. Designed full REST API and UI.',
      image: 'img/asobi-thumbnail.png',
      links: [
        { label: 'GitHub', url: 'https://github.com/SoupyOfficial/Asobi' },
      ],
      category: ['websites'],
      tags: ['MongoDB', 'Express', 'React', 'Node.js']
    }
  ];
  

  get filteredProjects(): Project[] {
    if (this.selectedCategory === 'all') return this.projects;

    const category = this.selectedCategory as ProjectCategory;
    return this.projects.filter(p => p.category.includes(category));
  }
  

  setFilter(filter: ProjectCategory | 'all') {
    this.selectedCategory = filter;
  }

  openProject(project: Project) {
    this.selectedProject = project;
  }
  
  closeModal() {
    this.selectedProject = null;
  }
}
