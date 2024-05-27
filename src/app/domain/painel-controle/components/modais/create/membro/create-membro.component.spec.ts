import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMembroComponent } from './create-membro.component';

describe('ModalMembroComponent', () => {
  let component: CreateMembroComponent;
  let fixture: ComponentFixture<CreateMembroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMembroComponent],
    });
    fixture = TestBed.createComponent(CreateMembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
