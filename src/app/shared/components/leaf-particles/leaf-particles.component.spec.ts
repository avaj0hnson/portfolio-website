import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeafParticlesComponent } from './leaf-particles.component';
import { PLATFORM_ID } from '@angular/core';

describe('LeafParticlesComponent', () => {
  let component: LeafParticlesComponent;
  let fixture: ComponentFixture<LeafParticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeafParticlesComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }]
    }).compileComponents();

    fixture = TestBed.createComponent(LeafParticlesComponent);
    component = fixture.componentInstance;
    component.count = 6;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isBrowser to true', () => {
    expect(component.isBrowser).toBeTrue();
  });

  it('should generate leaves on init', () => {
    expect(component.leaves.length).toBeGreaterThan(0);
  });

  it('should render SVG leaves', () => {
    const svgs = fixture.nativeElement.querySelectorAll('.animate-leaf-drift');
    expect(svgs.length).toBe(component.leaves.length);
  });

  it('each leaf should have valid properties', () => {
    component.leaves.forEach(leaf => {
      expect(leaf.x).toBeGreaterThanOrEqual(0);
      expect(leaf.x).toBeLessThanOrEqual(100);
      expect(leaf.size).toBeGreaterThan(0);
      expect(leaf.duration).toBeGreaterThan(0);
    });
  });
});
