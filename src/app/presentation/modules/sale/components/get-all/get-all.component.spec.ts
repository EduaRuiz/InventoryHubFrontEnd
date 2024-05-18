import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllSalesComponent } from './get-all.component';

describe('GetAllComponent', () => {
  let component: GetAllSalesComponent;
  let fixture: ComponentFixture<GetAllSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAllSalesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GetAllSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
