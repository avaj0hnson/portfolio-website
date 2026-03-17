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

  it('should update transform on mousemove', () => {
    const event = new MouseEvent('mousemove', {
      clientX: 150,
      clientY: 100
    });
    el.dispatchEvent(event);
    expect(el.style.transform).toContain('perspective');
    expect(el.style.transform).toContain('rotateX');
    expect(el.style.transform).toContain('rotateY');
  });

  it('should reset transform on mouseleave', () => {
    el.dispatchEvent(new Event('mouseleave'));
    expect(el.style.transform).toContain('rotateX(0deg)');
    expect(el.style.transform).toContain('rotateY(0deg)');
    expect(el.style.transform).toContain('scale(1)');
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

  it('should show glare on mousemove', () => {
    const glare = el.querySelector('div') as HTMLElement;
    const event = new MouseEvent('mousemove', { clientX: 100, clientY: 50 });
    el.dispatchEvent(event);
    expect(glare.style.opacity).toBe('1');
  });

  it('should hide glare on mouseleave', () => {
    const glare = el.querySelector('div') as HTMLElement;
    el.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 50 }));
    el.dispatchEvent(new Event('mouseleave'));
    expect(glare.style.opacity).toBe('0');
  });
});
