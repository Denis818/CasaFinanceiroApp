import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarPage } from './gerenciar.page';

describe('GerenciarComponent', () => {
  let component: GerenciarPage;
  let fixture: ComponentFixture<GerenciarPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciarPage],
    });
    fixture = TestBed.createComponent(GerenciarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
