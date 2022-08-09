import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderItemComponent } from './sender-item.component';

describe('SenderItemComponent', () => {
  let component: SenderItemComponent;
  let fixture: ComponentFixture<SenderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SenderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
