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
});
