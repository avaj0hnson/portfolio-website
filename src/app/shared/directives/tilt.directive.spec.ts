import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TiltDirective } from './tilt.directive';

@Component({
  standalone: true,
  imports: [TiltDirective],
  template: `<div appTilt [tiltIntensity]="10" [tiltGlare]="false" style="width:200px;height:200px;">Card</div>`
})
class TestHostComponent {}

describe('TiltDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('[appTilt]');
  });

  it('should set preserve-3d transform style', () => {
    expect(el.style.transformStyle).toBe('preserve-3d');
  });

  it('should reset transform on mouseleave', () => {
    el.dispatchEvent(new Event('mouseleave'));
    expect(el.style.transform).toContain('rotateX(0deg)');
  });

  it('should not add glare element when tiltGlare is false', () => {
    const glare = el.querySelector('div');
    expect(glare).toBeNull();
  });
});

describe('TiltDirective with glare', () => {
  @Component({
    standalone: true,
    imports: [TiltDirective],
    template: `<div appTilt [tiltGlare]="true" style="width:200px;height:200px;">Card</div>`
  })
  class GlareHostComponent {}

  let fixture: ComponentFixture<GlareHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlareHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GlareHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('[appTilt]');
  });

  it('should add glare element when tiltGlare is true', () => {
    const glare = el.querySelector('div');
    expect(glare).toBeTruthy();
  });
});
