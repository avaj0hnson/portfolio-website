import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectModalComponent } from './project-modal.component';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ProjectModalComponent', () => {
  let component: ProjectModalComponent;
  let fixture: ComponentFixture<ProjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectModalComponent],
      providers: [
        provideAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectModalComponent);
    component = fixture.componentInstance;

    component.project = {
      title: 'Test Project',
      category: ['me'],
      description: 'This is a test project.',
      image: 'test-image-url.jpg',
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

  it('should emit close event on escape key press', () => {
    spyOn(component.close, 'emit');

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    component.onEscapePress(escapeEvent);
  
    expect(component.close.emit).toHaveBeenCalled();
  });
});
