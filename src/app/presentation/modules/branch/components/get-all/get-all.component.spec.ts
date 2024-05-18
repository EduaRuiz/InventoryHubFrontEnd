import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllBranchesComponent } from './get-all.component';

describe('GetAllComponent', () => {
  let component: GetAllBranchesComponent;
  let fixture: ComponentFixture<GetAllBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAllBranchesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GetAllBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
