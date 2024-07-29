import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortalPage } from './portal.page';

describe('HomePage', () => {
  let component: PortalPage;
  let fixture: ComponentFixture<PortalPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortalPage],
    });
    fixture = TestBed.createComponent(PortalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
