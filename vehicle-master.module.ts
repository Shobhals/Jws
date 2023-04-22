import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleMasterRoutingModule } from './vehicle-master-routing.module';
import { VehicleMasterComponent } from './vehicle-master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [VehicleMasterComponent],
  imports: [
    CommonModule,
    VehicleMasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
    
  ]
})
export class VehicleMasterModule { 
 
}
