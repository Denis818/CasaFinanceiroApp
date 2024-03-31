import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancyPage } from './financy.page';

describe('FinancyComponent', () => {
  let component: FinancyPage;
  let fixture: ComponentFixture<FinancyPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancyPage],
    });
    fixture = TestBed.createComponent(FinancyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
