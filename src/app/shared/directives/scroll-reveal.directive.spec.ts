import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollRevealDirective } from './scroll-reveal.directive';

@Component({
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `<div appScrollReveal revealClass="revealed" revealDelay="0.2s">Content</div>`
})
class TestHostComponent {}

describe('ScrollRevealDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    el = fixture.nativeElement.querySelector('[appScrollReveal]');
  });

  it('should add scroll-reveal-hidden class on init', () => {
    expect(el.classList.contains('scroll-reveal-hidden')).toBeTrue();
  });

  it('should set transition-delay from input', () => {
    expect(el.style.transitionDelay).toBe('0.2s');
  });

  it('should not have revealed class initially', () => {
    expect(el.classList.contains('revealed')).toBeFalse();
  });
});
