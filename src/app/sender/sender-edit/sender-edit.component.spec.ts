import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderEditComponent } from './sender-edit.component';

describe('SenderEditComponent', () => {
  let component: SenderEditComponent;
  let fixture: ComponentFixture<SenderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenderEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
