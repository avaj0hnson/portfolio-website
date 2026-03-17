import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmbientBloomsComponent } from './ambient-blooms.component';
import { PLATFORM_ID } from '@angular/core';

describe('AmbientBloomsComponent', () => {
  let component: AmbientBloomsComponent;
  let fixture: ComponentFixture<AmbientBloomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmbientBloomsComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }]
    }).compileComponents();

    fixture = TestBed.createComponent(AmbientBloomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isBrowser to true', () => {
    expect(component.isBrowser).toBeTrue();
  });

  it('should start with no active blooms', () => {
    expect(component.activeBlooms.length).toBe(0);
  });

  it('should generate petal angles', () => {
    const angles = component.getPetalAngles(5);
    expect(angles.length).toBe(5);
    expect(angles[0]).toBe(0);
    expect(angles[1]).toBe(72);
  });

  it('should spawn a bloom when mouse coordinates change', (done) => {
    component.mouseX = 100;
    component.mouseY = 200;
    component.ngOnChanges();
    expect(component.activeBlooms.length).toBe(1);
    expect(component.activeBlooms[0].x).toBe(100);
    expect(component.activeBlooms[0].y).toBe(200);
    done();
  });

  it('should throttle bloom spawning', () => {
    component.mouseX = 100;
    component.mouseY = 200;
    component.ngOnChanges();
    component.mouseX = 150;
    component.mouseY = 250;
    component.ngOnChanges();
    // Second call should be throttled
    expect(component.activeBlooms.length).toBe(1);
  });

  it('should track blooms by id', () => {
    const bloom = { id: 42, x: 0, y: 0, size: 30, petalCount: 5, color: '#fff', rotation: 0 };
    expect(component.trackBloom(0, bloom)).toBe(42);
  });
});
