import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioComponent } from './portfolio.component';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedCategory when setFilter is called', () => {
    component.setFilter('apps');
    expect(component.selectedCategory).toBe('apps');
  });
  
  it('should return all projects when filter is "all"', () => {
    component.setFilter('all');
    expect(component.filteredProjects.length).toBe(component.projects.length);
  });
  
  it('should return only projects matching the selected category', () => {
    component.setFilter('apps');
    
    const appsProjects = component.projects.filter(p => p.category.includes('apps'));
    expect(component.filteredProjects.length).toBe(appsProjects.length);
    expect(component.filteredProjects.every(p => p.category.includes('apps'))).toBeTrue();
  });
  
  it('should set selectedProject when openProject is called', () => {
    const dummyProject = component.projects[0];
  
    component.openProject(dummyProject);
  
    expect(component.selectedProject).toBe(dummyProject);
  });
  
  it('should set selectedProject to null when closeModal is called', () => {
    const dummyProject = component.projects[0];
  
    component.openProject(dummyProject);
    expect(component.selectedProject).toBe(dummyProject);
  
    component.closeModal();
    expect(component.selectedProject).toBeNull();
  });  
});
