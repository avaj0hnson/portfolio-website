import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionDividerComponent } from './section-divider.component';

describe('SectionDividerComponent', () => {
  let component: SectionDividerComponent;
  let fixture: ComponentFixture<SectionDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionDividerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SectionDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return different wavePath for flip', () => {
    const normal = component.wavePath;
    component.flip = true;
    const flipped = component.wavePath;
    expect(normal).not.toBe(flipped);
  });

  it('should use bgFrom as default activeBgFrom in light mode', () => {
    component.bgFrom = '#aaa';
    expect(component.activeBgFrom).toBe('#aaa');
  });

  it('should use bgTo as default activeBgTo in light mode', () => {
    component.bgTo = '#bbb';
    expect(component.activeBgTo).toBe('#bbb');
  });

  it('should render SVG', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
  });
});
