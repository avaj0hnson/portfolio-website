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

  it('should return correct percent for each level', () => {
    component.level = 'Expert';
    expect(component.percent).toBe(100);
    component.level = 'Proficient';
    expect(component.percent).toBe(75);
    component.level = 'Intermediate';
    expect(component.percent).toBe(50);
    component.level = 'Beginner';
    expect(component.percent).toBe(25);
  });

  it('should calculate stemEnd based on percent', () => {
    component.level = 'Beginner';
    expect(component.stemEnd).toBe(4 + (192 * 25 / 100));
    component.level = 'Expert';
    expect(component.stemEnd).toBe(4 + 192);
  });

  it('should return different stem colors per level', () => {
    component.level = 'Expert';
    const expertColor = component.stemColor;
    component.level = 'Beginner';
    const beginnerColor = component.stemColor;
    expect(expertColor).not.toBe(beginnerColor);
  });

  it('should render vine stem SVG element', () => {
    const stem = fixture.nativeElement.querySelector('.vine-stem');
    expect(stem).toBeTruthy();
  });

  it('should render leaves for intermediate level', () => {
    component.level = 'Intermediate';
    fixture.detectChanges();
    const leaves = fixture.nativeElement.querySelectorAll('.leaf');
    expect(leaves.length).toBeGreaterThan(0);
  });

  it('should render no leaves for beginner with low percent', () => {
    component.level = 'Beginner';
    fixture.detectChanges();
    // Beginner is 25%, only first leaf group shows at >= 20%
    const leafGroups = fixture.nativeElement.querySelectorAll('.vine-leaf-group');
    expect(leafGroups.length).toBe(1);
  });
});
