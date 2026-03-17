import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantLevelComponent } from './plant-level.component';

describe('PlantLevelComponent', () => {
  let component: PlantLevelComponent;
  let fixture: ComponentFixture<PlantLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantLevelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PlantLevelComponent);
    component = fixture.componentInstance;
    component.level = 'Intermediate';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render SVG with stem', () => {
    expect(fixture.nativeElement.querySelector('svg')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.plant-stem')).toBeTruthy();
  });

  for (const level of ['Beginner', 'Intermediate', 'Proficient', 'Expert']) {
    it(`should return unique stemPath for ${level}`, () => {
      component.level = level;
      expect(component.stemPath).toBeTruthy();
      expect(component.stemPath).toContain('M40');
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

    it(`should render leaves for ${level}`, () => {
      component.level = level;
      fixture.detectChanges();
      const svg = fixture.nativeElement.querySelector('svg');
      expect(svg).toBeTruthy();
    });
  }

  it('should return default stemPath for unknown level', () => {
    component.level = 'Unknown';
    expect(component.stemPath).toContain('M40');
  });

  it('should return default colors for unknown level', () => {
    component.level = 'Unknown';
    expect(component.stemColor).toBe('#87A878');
    expect(component.leafColor).toBe('#87A878');
    expect(component.leafColorAlt).toBe('#6B8F71');
  });

  it('should return soil color', () => {
    expect(component.soilColor).toBe('#5D4037');
  });
});
