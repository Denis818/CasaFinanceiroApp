import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappModal } from './whatsapp.modal';

describe('WhatsappModal', () => {
  let component: WhatsappModal;
  let fixture: ComponentFixture<WhatsappModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WhatsappModal],
    });
    fixture = TestBed.createComponent(WhatsappModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
