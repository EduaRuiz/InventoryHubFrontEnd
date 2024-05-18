import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BranchRoutingModule } from './branch-routing.module';
import { GetAllBranchesComponent } from './components/get-all/get-all.component';
import { RegisterComponent } from './components/register/register.component';
import { BranchComponent } from './pages/branch/branch.component';

@NgModule({
  declarations: [RegisterComponent, GetAllBranchesComponent, BranchComponent],
  imports: [
    CommonModule,
    BranchRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BranchModule {}
