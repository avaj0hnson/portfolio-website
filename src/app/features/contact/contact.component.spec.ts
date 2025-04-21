import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { provideHttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

function createMockForm(valid: boolean, email = '', message = ''): Partial<NgForm> {
  return {
    valid,
    value: { email, message },
    reset: jasmine.createSpy('reset')
  };
}

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactComponent,
        FormsModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form successfully', () => {
    const mockForm = createMockForm(true, 'test@example.com', 'Hello World') as NgForm;
  
    component.onSubmit(mockForm);
  
    const req = httpTestingController.expectOne('https://formspree.io/f/xkgjelga');
    expect(req.request.method).toEqual('POST');
    req.flush({ success: true });
  
    expect(component.submitted).toBeTrue();
    expect(component.isSending).toBeFalse();
    expect(mockForm.reset).toHaveBeenCalled();
  });

  it('should handle submission error', () => {
    spyOn(window, 'alert');
  
    const mockForm = createMockForm(true, 'test@example.com', 'Hello World') as NgForm;
  
    component.onSubmit(mockForm);
  
    const req = httpTestingController.expectOne('https://formspree.io/f/xkgjelga');
    expect(req.request.method).toEqual('POST');
    req.error(new ProgressEvent('Network error'));
  
    expect(component.isSending).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith('Something went wrong. Please try again later.');
  });
  
  it('should not submit if form is invalid', () => {
    const mockForm = createMockForm(false) as NgForm;
  
    component.onSubmit(mockForm);
  
    httpTestingController.expectNone('https://formspree.io/f/xkgjelga');
  });
});
