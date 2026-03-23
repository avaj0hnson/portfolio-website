import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCardComponent } from './project-card.component';

describe('ProjectCardComponent', () => {
  let component: ProjectCardComponent;
  let fixture: ComponentFixture<ProjectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCardComponent);
    component = fixture.componentInstance;

    component.project = {
      title: 'Test Project',
      category: ['me'],
      description: 'This is a test project.',
      image: 'img/test-image.png',
      links: [
        { label: 'GitHub', url: 'https://github.com/test' },
        { label: 'Live Site', url: 'https://example.com' }
      ]
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute webpImage from png source', () => {
    expect(component.webpImage).toBe('img/test-image.webp');
  });

  it('should compute webpImage from jpg source', () => {
    component.project = { ...component.project, image: 'img/photo.jpg' };
    expect(component.webpImage).toBe('img/photo.webp');
  });

  it('should compute webpSrcset with 640w and full size', () => {
    expect(component.webpSrcset).toBe('img/test-image-640w.webp 640w, img/test-image.webp 1280w');
  });

  it('should emit select event on card click', () => {
    spyOn(component.selectProject, 'emit');
    const card = fixture.nativeElement.querySelector('div');
    card.click();
    expect(component.selectProject.emit).toHaveBeenCalled();
  });

  it('should display project title', () => {
    const title = fixture.nativeElement.querySelector('h3');
    expect(title.textContent).toContain('Test Project');
  });

  it('should show In Progress badge when project is in progress', () => {
    component.project = { ...component.project, inProgress: true };
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.bg-accent');
    expect(badge).toBeTruthy();
    expect(badge.textContent).toContain('In Progress');
  });

  it('should not show In Progress badge by default', () => {
    const badge = fixture.nativeElement.querySelector('.bg-accent');
    expect(badge).toBeNull();
  });

  it('should render project links', () => {
    const links = fixture.nativeElement.querySelectorAll('a');
    expect(links.length).toBe(2);
    expect(links[0].textContent).toContain('GitHub');
    expect(links[1].textContent).toContain('Live Site');
  });

  it('should use lazy loading on image', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('loading')).toBe('lazy');
  });
});
