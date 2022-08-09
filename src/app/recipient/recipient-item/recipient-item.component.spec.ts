import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientItemComponent } from './recipient-item.component';

describe('RecipientItemComponent', () => {
  let component: RecipientItemComponent;
  let fixture: ComponentFixture<RecipientItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipientItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
