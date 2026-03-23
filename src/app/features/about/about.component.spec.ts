import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the About heading', () => {
    const heading = fixture.nativeElement.querySelector('h2');
    expect(heading.textContent).toContain('About');
  });

  it('should render the headshot image', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('alt')).toBe('Ava Johnson');
  });

  it('should render bio text', () => {
    const paragraphs = fixture.nativeElement.querySelectorAll('p');
    const bioText = Array.from(paragraphs).map((p: unknown) => (p as HTMLElement).textContent).join(' ');
    expect(bioText).toContain('craft');
  });

  it('should have LinkedIn, GitHub, and Resume links', () => {
    const links = fixture.nativeElement.querySelectorAll('a[target="_blank"]');
    expect(links.length).toBe(3);
  });
});
