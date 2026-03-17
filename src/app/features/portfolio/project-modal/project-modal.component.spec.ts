import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectModalComponent } from './project-modal.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ProjectModalComponent', () => {
  let component: ProjectModalComponent;
  let fixture: ComponentFixture<ProjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectModalComponent],
      providers: [provideAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectModalComponent);
    component = fixture.componentInstance;

    component.project = {
      title: 'Test Project',
      category: ['me'],
      description: 'This is a test project.',
      image: 'img/test-image.png',
      links: [
        { label: 'GitHub', url: 'https://github.com/test' },
        { label: 'Live Site', url: 'https://example.com' }
      ],
      tags: ['Angular', 'TypeScript']
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event on escape key press', () => {
    spyOn(component.close, 'emit');
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    component.onEscapePress(escapeEvent);
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should compute webpImage from source', () => {
    expect(component.webpImage).toBe('img/test-image.webp');
  });

  it('should compute webpSrcset', () => {
    expect(component.webpSrcset).toBe('img/test-image-640w.webp 640w, img/test-image.webp 1280w');
  });

  it('should have role="dialog" on the backdrop', () => {
    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.getAttribute('aria-labelledby')).toBe('modal-title');
  });

  it('should display project title with correct id for aria-labelledby', () => {
    const title = fixture.nativeElement.querySelector('#modal-title');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Test Project');
  });

  it('should have an accessible close button', () => {
    const closeBtn = fixture.nativeElement.querySelector('button[aria-label]');
    expect(closeBtn).toBeTruthy();
    expect(closeBtn.getAttribute('aria-label')).toBe('Close project details');
  });

  it('should emit close when backdrop is clicked', () => {
    spyOn(component.close, 'emit');
    const backdrop = fixture.nativeElement.querySelector('[role="dialog"]');
    backdrop.click();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should render tags', () => {
    const tags = fixture.nativeElement.querySelectorAll('.bg-botanical-cream');
    expect(tags.length).toBe(2);
    expect(tags[0].textContent).toContain('Angular');
    expect(tags[1].textContent).toContain('TypeScript');
  });

  it('should render links with noopener noreferrer', () => {
    const links = fixture.nativeElement.querySelectorAll('a[target="_blank"]');
    expect(links.length).toBe(2);
    links.forEach((link: HTMLAnchorElement) => {
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.getAttribute('rel')).toContain('noreferrer');
    });
  });
});
