import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VineBarComponent } from './vine-bar.component';

describe('VineBarComponent', () => {
  let component: VineBarComponent;
  let fixture: ComponentFixture<VineBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VineBarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VineBarComponent);
    component = fixture.componentInstance;
    component.level = 'Intermediate';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render vine stem SVG', () => {
    expect(fixture.nativeElement.querySelector('.vine-stem')).toBeTruthy();
  });

  for (const [level, expectedPercent] of [['Expert', 100], ['Proficient', 75], ['Intermediate', 50], ['Beginner', 25]] as const) {
    it(`should return ${expectedPercent}% for ${level}`, () => {
      component.level = level;
      expect(component.percent).toBe(expectedPercent);
    });

    it(`should calculate stemEnd for ${level}`, () => {
      component.level = level;
      expect(component.stemEnd).toBe(4 + (192 * expectedPercent / 100));
    });

    it(`should return stemColor for ${level}`, () => {
      component.level = level;
      expect(component.stemColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });

    it(`should return leafColor for ${level}`, () => {
      component.level = level;
      expect(component.leafColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });

    it(`should return leafColorAlt for ${level}`, () => {
      component.level = level;
      expect(component.leafColorAlt).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  }

  it('should return default percent for unknown level', () => {
    component.level = 'Unknown';
    expect(component.percent).toBe(10);
  });

  it('should return default colors for unknown level', () => {
    component.level = 'Unknown';
    expect(component.stemColor).toBe('#87A878');
    expect(component.leafColor).toBe('#87A878');
    expect(component.leafColorAlt).toBe('#6B8F71');
  });

  it('should render leaves for Expert level', () => {
    component.level = 'Expert';
    fixture.detectChanges();
    const leafGroups = fixture.nativeElement.querySelectorAll('.vine-leaf-group');
    expect(leafGroups.length).toBe(4);
  });

  it('should render 1 leaf group for Beginner', () => {
    component.level = 'Beginner';
    fixture.detectChanges();
    const leafGroups = fixture.nativeElement.querySelectorAll('.vine-leaf-group');
    expect(leafGroups.length).toBe(1);
  });
});
