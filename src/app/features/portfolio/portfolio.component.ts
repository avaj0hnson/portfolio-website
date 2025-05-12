import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { Project, ProjectCategory } from './models/project.model';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent, ProjectModalComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  selectedCategory: ProjectCategory | 'all' = 'all';
  categories: Array<'all' | ProjectCategory> = ['all', 'apps', 'me', 'websites'];
  selectedProject: Project | null = null;

  projects: Project[] = [
    {
      title: 'Grain',
      description: 'A soft modern budgeting app to track expenses, visualize spending by category, and monitor income. Features include dynamic charts, tab-based views (table, pie chart, graph), and a clean Angular architecture. Built with Angular, Tailwind CSS, and Font Awesome.',
      image: 'img/grain-thumbnail.png',
      category: ['websites'],
      tags: ['Angular', 'Tailwind', 'Chart.js'],
      links: [
        { label: 'GitHub', url: 'https://github.com/avaj0hnson/grain' }
      ],
      inProgress: true
    },
    {
      title: 'Petal Timer',
      description: 'A cute, modern Pomodoro timer designed around a real 8–5 workday, complete with customizable hours, live session tracking, and collectible badges. Built with Angular, TailwindCSS, and a soft, motivating aesthetic.',
      image: 'img/petaltimer-thumbnail.png',
      category: ['websites'],
      tags: ['Angular', 'Tailwind'],
      links: [
        { label: 'GitHub', url: 'https://github.com/avaj0hnson/petal-timer' },
        { label: 'Live Site', url: 'https://petaltimer.netlify.app/' }
      ]
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio built with Angular and Tailwind CSS to showcase web development projects.',
      image: 'img/portfolio-thumbnail.png',
      category: ['websites', 'me'],
      tags: ['Angular', 'Tailwind'],
      links: [
        { label: 'GitHub', url: 'https://github.com/avaj0hnson/portfolio-website' },
        { label: 'Live Site', url: 'https://avajohnson.dev/' }
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
