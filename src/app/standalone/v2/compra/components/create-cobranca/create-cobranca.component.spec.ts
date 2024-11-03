/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCobrancaComponent } from './create-cobranca.component';

describe('CreateCompraComponent', () => {
  let component: CreateCobrancaComponent;
  let fixture: ComponentFixture<CreateCobrancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCobrancaComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCobrancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
