import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientEditComponent } from './recipient-edit.component';

describe('RecipientEditComponent', () => {
  let component: RecipientEditComponent;
  let fixture: ComponentFixture<RecipientEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipientEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
