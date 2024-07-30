import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelPage } from './control-panel.page';

describe('PainelControleComponent', () => {
  let component: ControlPanelPage;
  let fixture: ComponentFixture<ControlPanelPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlPanelPage],
    });
    fixture = TestBed.createComponent(ControlPanelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
