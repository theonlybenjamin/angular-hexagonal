import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOrderInputsComponent } from './register-order-inputs.component';

describe('RegisterOrderInputsComponent', () => {
  let component: RegisterOrderInputsComponent;
  let fixture: ComponentFixture<RegisterOrderInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterOrderInputsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterOrderInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
