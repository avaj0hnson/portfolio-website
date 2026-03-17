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

  it('should return different stemPath values per level', () => {
    component.level = 'Beginner';
    const beginnerPath = component.stemPath;
    component.level = 'Expert';
    const expertPath = component.stemPath;
    expect(beginnerPath).not.toBe(expertPath);
  });

  it('should return different stem colors per level', () => {
    component.level = 'Expert';
    const expertColor = component.stemColor;
    component.level = 'Beginner';
    const beginnerColor = component.stemColor;
    expect(expertColor).not.toBe(beginnerColor);
  });

  it('should return different leaf colors per level', () => {
    component.level = 'Expert';
    const expertColor = component.leafColor;
    component.level = 'Beginner';
    const beginnerColor = component.leafColor;
    expect(expertColor).not.toBe(beginnerColor);
  });

  it('should render SVG element', () => {
    const svg = fixture.nativeElement.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should render stem path', () => {
    const stem = fixture.nativeElement.querySelector('.plant-stem');
    expect(stem).toBeTruthy();
  });

  it('should return soil color', () => {
    expect(component.soilColor).toBe('#5D4037');
  });
});
