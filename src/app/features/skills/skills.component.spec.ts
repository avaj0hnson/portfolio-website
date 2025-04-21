import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsComponent } from './skills.component';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of skills', () => {
    expect(component.skills.length).toBeGreaterThan(0);
  });
  
  it('should return correct color for Expert', () => {
    expect(component.getLevelColor('Expert')).toBe('bg-green-600');
  });
  
  it('should return correct color for Proficient', () => {
    expect(component.getLevelColor('Proficient')).toBe('bg-blue-600');
  });
  
  it('should return correct color for Intermediate', () => {
    expect(component.getLevelColor('Intermediate')).toBe('bg-yellow-600');
  });
  
  it('should return correct color for Beginner', () => {
    expect(component.getLevelColor('Beginner')).toBe('bg-red-600');
  });
});
