import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ElementRef } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to the portfolio section', () => {
    const scrollIntoViewSpy = jasmine.createSpy('scrollIntoView');
    const fakeElement = { scrollIntoView: scrollIntoViewSpy } as unknown as HTMLElement;
    spyOn(document, 'getElementById').and.returnValue(fakeElement);

    component.scrollToPortfolio();

    expect(document.getElementById).toHaveBeenCalledWith('portfolio');
    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('should initialize Typed.js after view init if platform is browser', () => {
    component.typedElement = {
      nativeElement: document.createElement('span')
    } as ElementRef;

    expect(() => component.ngAfterViewInit()).not.toThrow();
  });

  it('should return parallax transforms', () => {
    component.mouseX = 0.5;
    component.mouseY = -0.3;
    expect(component.parallaxText).toContain('translate');
    expect(component.parallaxVines).toContain('translate');
    expect(component.parallaxParticles).toContain('translate');
  });

  it('should update heroMouse coordinates on mousemove within viewport', () => {
    const event = new MouseEvent('mousemove', {
      clientX: 200,
      clientY: 300
    });
    component.onMouseMove(event);
    expect(component.heroMouseX).toBe(200);
    expect(component.heroMouseY).toBe(300);
  });

  it('should not update heroMouse when below viewport', () => {
    component.heroMouseX = 0;
    component.heroMouseY = 0;
    const event = new MouseEvent('mousemove', {
      clientX: 200,
      clientY: window.innerHeight + 100
    });
    component.onMouseMove(event);
    expect(component.heroMouseX).toBe(0);
    expect(component.heroMouseY).toBe(0);
  });

  it('should update heroMouse on touchmove', () => {
    const mockEvent = {
      touches: [{ clientX: 150, clientY: 250 }]
    } as unknown as TouchEvent;
    component.onTouchMove(mockEvent);
    expect(component.heroMouseX).toBe(150);
    expect(component.heroMouseY).toBe(250);
  });

  it('should set vineAnimated after init', (done) => {
    component.typedElement = { nativeElement: document.createElement('span') } as ElementRef;
    component.ngAfterViewInit();
    setTimeout(() => {
      expect(component.vineAnimated).toBeTrue();
      done();
    }, 400);
  });
});
