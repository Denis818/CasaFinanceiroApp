import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelControlePage } from './painel-controle.page';

describe('PainelControleComponent', () => {
  let component: PainelControlePage;
  let fixture: ComponentFixture<PainelControlePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PainelControlePage],
    });
    fixture = TestBed.createComponent(PainelControlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
