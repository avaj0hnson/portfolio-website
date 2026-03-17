import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BloomComponent } from './bloom.component';

describe('BloomComponent', () => {
  let component: BloomComponent;
  let fixture: ComponentFixture<BloomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloomComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BloomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate correct number of petals', () => {
    component.petalCount = 8;
    expect(component.petals.length).toBe(8);
  });

  it('should render SVG with petals', () => {
    const petals = fixture.nativeElement.querySelectorAll('.petal');
    expect(petals.length).toBe(component.petalCount + 1); // petals + center
  });
});
