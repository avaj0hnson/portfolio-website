import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VineComponent } from './vine.component';

describe('VineComponent', () => {
  let component: VineComponent;
  let fixture: ComponentFixture<VineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VineComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render SVG element', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should apply vine-animate class when animate is true', () => {
    component.animate = true;
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('.vine-animate');
    expect(svg).toBeTruthy();
  });

  it('should not have vine-animate class by default', () => {
    const svg = fixture.nativeElement.querySelector('.vine-animate');
    expect(svg).toBeNull();
  });
});
