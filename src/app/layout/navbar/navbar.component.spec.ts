import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isMenuOpen initially set to false', () => {
    expect(component.isMenuOpen).toBeFalse();
  });
  
  it('should scroll to the given section and close the menu', () => {
    const scrollIntoViewSpy = jasmine.createSpy('scrollIntoView');
  
    const fakeElement = {
      scrollIntoView: scrollIntoViewSpy
    } as unknown as HTMLElement;
  
    spyOn(document, 'getElementById').and.returnValue(fakeElement);
  
    component.isMenuOpen = true;
    component.scrollTo('contact');
  
    expect(document.getElementById).toHaveBeenCalledWith('contact');
    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
    expect(component.isMenuOpen).toBeFalse();
  });
});
