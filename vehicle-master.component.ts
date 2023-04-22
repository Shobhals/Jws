import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ConfigDto } from 'src/app/dto/config-dto';
import { VehicleTypeMasterDto } from 'src/app/dto/vehicle-type-master-dto';
import { VehicleServiceService } from './vehicle-service.service';
import { VehicleTypeMessage } from './vehicle-type-message';

@Component({
  selector: 'app-vehicle-master',
  templateUrl: './vehicle-master.component.html',
  styleUrls: ['./vehicle-master.component.scss']
})
export class VehicleMasterComponent implements OnInit {
  vehicleTypeMasterDto: VehicleTypeMasterDto;
  vehicleTypes: any[] = [];
  currentSelectedPage: number = 0;
  totalPages: number = 0;
  pageIndexes: Array<number> = [];
  vehicleRequestDto: any;
  page: number = 0;
  searchBrand: string;
  editIndexId: number;
  searchText: any;
  searchLogo: any;
  id: number;
  userDto: any[] = [];
  selectedValue: number = 5;
  totalRecords: number = 0;
  event: Event;
  pageSize: number = 4;
  updating: boolean = false;
  editMode: boolean = false;
  searchMode: boolean = false;
  private vehicleTypeMastersData: Array<any>;
  refresh: any;
  VehicleTypeRequestDto: VehicleTypeMasterDto = new VehicleTypeMasterDto();
  vehicleTypeFormGroup: FormGroup;
  config: ConfigDto = new ConfigDto();
  constructor(private vehicleServiceService: VehicleServiceService,
    private formBuilder: FormBuilder, private authService: AuthService,private datePipe:DatePipe) {
    let onlyChar = /^[a-zA-Z ]{0,50}$/
    this.vehicleTypeFormGroup = this.formBuilder.group({
      type: ["",  [Validators.required, Validators.pattern(/^[A-Za-z](?!.*?\s$)[A-Za-z\s]{0,20}$/)]],
      tareWeight: ["", [Validators.required, Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/)]],
      model: ["", [Validators.required]],
      brand: ["", [Validators.required, Validators.required, Validators.pattern(onlyChar)]],
    })
  }
  get f() {
    return this.vehicleTypeFormGroup.controls;
  }

  ngOnInit() {
    this.getPage(0, this.selectedValue);
  }

  getVehicleTypeTableData() {
    // this.vehicleServiceService.getVehicleTypeTableData().subscribe(data => {
    //   if (data.status === "OK") {
    //     this.vehicleTypeMasterDto = data.vehicleTypeDtos;
    //   }
    // }, (error) => {
    //   console.log(error.error.message);
    // })
  }

  getPaginationWithIndex(index: number) {
    // this.getPage(index, this.selectedValue);
  }

  getPage(page: number, size: number) {
    // this.vehicleServiceService.getPagableVehicleTypes(page, size).subscribe(message => {
    //   console.log(message);
    //   this.vehicleTypes = message.vehicleTypeMasterDto.content;
    //   this.totalPages = message.vehicleTypeMasterDto.totalPages;
    //   this.totalRecords = message.vehicleTypeMasterDto.totalElements;
    //   this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
    //   this.currentSelectedPage = message.vehicleTypeMasterDto.number;
    //   console.log(message.vehicleTypeMasterDto.number);
    //   this.config.id="vehicleTypePaginator";
    //   this.config.currentPage = this.currentSelectedPage + 1;
    //   this.config.itemsPerPage = this.selectedValue;
    //   this.config.totalItems = this.totalRecords;
    // },
    //   (error) => {
    //     console.log(error);
    //   }
   // );
  }


  onSubmit() {
    this.vehicleRequestDto = this.vehicleTypeFormGroup.value;
    // if (this.editMode) {
    //   this.vehicleRequestDto.id = this.id;
    //   this.vehicleRequestDto.modifiedBy = this.authService.userForm.userName;
    //   var date=new Date();
    //   this.vehicleRequestDto.modifiedTime=this.datePipe.transform(date,"yyyy-MM-ddTHH:mm");
    //   console.log(this.vehicleRequestDto)
    //   this.vehicleServiceService.editUserTableData(this.vehicleRequestDto).subscribe(data => {
    //     if (data.status == "OK") {
    //       this.editMode = false;
    //       alert(data.message);
    //       let frontendData = JSON.stringify(data)
    //       this.vehicleTypeFormGroup.reset();
    //       console.log(frontendData);
    //       if (!this.searchMode) {
    //         this.getPage(this.currentSelectedPage, this.selectedValue);
    //       } else {
    //         if (this.searchMode) {
    //           this.getSearch(this.searchBrand, this.currentSelectedPage, this.selectedValue);
    //         }
    //       }
    //     } else {
    //       this.editMode = false;
    //       this.vehicleTypeFormGroup.reset();
    //       alert(data.message);
    //     }
    //   }, (err) => {
    //     console.log(err)
    //     this.vehicleTypeFormGroup.reset();
    //     this.editMode = false;
    //   })
    // }
    // else {
    //   this.vehicleRequestDto.createdBy = this.authService.userForm.userName;
    //   this.vehicleRequestDto.isDeleted = false
    //   this.vehicleServiceService.vehicleTypeMaster(this.vehicleRequestDto).subscribe(data => {
    //     if (data.status == "CREATED") {
    //       alert(data.message);
    //       let frontendData = JSON.stringify(data)
    //       this.vehicleTypeFormGroup.reset();
    //       this.editMode = false;
    //       console.log(frontendData);
    //       //this.getVehicleTypeTableData();
    //       this.getPage(this.currentSelectedPage, this.selectedValue);
    //     } else {
    //       this.editMode = false;
    //       this.vehicleTypeFormGroup.reset();
    //       alert(data.message);
    //     }
    //     console.log(data),
    //       (err) => console.log(err)
    //     this.editMode = false;
    //     this.vehicleTypeFormGroup.reset();
    //   })
    // }
  }
  onCancel() {
    // this.vehicleTypeFormGroup.reset();
    // this.editMode = false;

  }
  dropDownBrand() {

  }
  
  
  onEditData(indexNumber: number, vehicleTypeId: number, dto: VehicleTypeMasterDto) {
    // this.editIndexId = indexNumber;
    // this.id = vehicleTypeId;
    // console.log(this.editIndexId);
    // console.log(this.id);
    // let outputdto = JSON.stringify(dto)
    // console.log(outputdto);
    // this.editMode = true;
    // this.vehicleTypeFormGroup.controls.brand.setValue(dto.brand);
    // this.vehicleTypeFormGroup.controls.model.setValue(dto.model);
    // this.vehicleTypeFormGroup.controls.tareWeight.setValue(dto.tareWeight)
    // this.vehicleTypeFormGroup.controls.type.setValue(dto.type);

  }

  onDeleteData(dto: VehicleTypeMasterDto) {
    // if (confirm("Do You Want To Delete This Data ?")) {
    //   this.vehicleServiceService.deleteVehicleType(dto.id).subscribe(response => {
    //     if (response.status === "OK") {
    //       alert(response.message);
    //       if (!this.searchMode) {
    //         this.getPage(this.currentSelectedPage, this.selectedValue);
    //       } else {
    //         if (this.searchMode) {
    //           this.getSearch(this.searchBrand, this.currentSelectedPage, this.selectedValue);
    //         }
    //       }
    //     } else {
    //       alert(response.message);
    //     }
    //   })
    // }
  }

  getSearch(brand: string, page: number, size: number) {
    // this.vehicleServiceService.searchUserTableData(brand, page, size).subscribe(message => {
    //   if (message.status === "FOUND") {
    //     console.log(message);
    //     this.vehicleTypes = message.vehicleTypeMasterDto.content;
    //     this.totalPages = message.vehicleTypeMasterDto.totalPages;
    //     this.totalRecords = message.vehicleTypeMasterDto.totalElements;
    //     console.log(message.vehicleTypeMasterDto.totalElements);
    //     this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
    //     this.currentSelectedPage = message.vehicleTypeMasterDto.number;
    //     console.log(message.vehicleTypeMasterDto.number);
    //     this.config.id="vehicleTypePaginator";
    //     this.config.currentPage = this.currentSelectedPage + 1;
    //     this.config.itemsPerPage = this.selectedValue;
    //     this.config.totalItems = this.totalRecords;
    //   }
    //   else if(message.status === "NOT_FOUND") {
    //     this.vehicleTypes = [];
    //     this.totalPages = 0;
    //     this.totalRecords = 0;
    //     this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
    //     this.currentSelectedPage = 0;
    //     this.config.currentPage = this.currentSelectedPage;
    //     this.config.itemsPerPage = this.selectedValue;
    //     this.config.totalItems = this.totalRecords;
    //   }
    // })
  }

  onSearch(item) {
    // this.searchMode = true;
    // this.searchBrand = item.value;
    // console.log(this.searchBrand);
    // console.log(this.selectedValue);
    // this.getSearch(this.searchBrand, 0, this.selectedValue);
  }

  onInputClearText(item: any) {
    // console.log("input" + item.value.length);
    // if (item.value.length == 0) {
    //   this.searchMode = false;
    //   this.getPage(0, this.selectedValue);
    // }
  }
  dropDownRecords(selectedOptionValue: number) {
  //   if (selectedOptionValue != 5) {
  //     this.selectedValue = selectedOptionValue;
  //   }
  //   else {
  //     this.selectedValue = 5;
  //   }
  //   if (this.searchMode) {
  //     this.getSearch(this.searchBrand, 0, this.selectedValue);
  //   }
  //   else {
  //     this.getPage(0, this.selectedValue);
  //   }
  // }
  // setActive(index) {
  //   console.log("index :" + index);
  //   this.pageIndexes = index + 1;
  }
  //*******for new pagination *******/ 
  pageChanged(event: number) {
    // this.config.currentPage = event;
    // let currentPageValue = this.config.currentPage;
    // if (this.searchMode) {
    //   this.getSearch(this.searchBrand, currentPageValue - 1, this.selectedValue);
    // }
    // else {
    //   this.getPage(currentPageValue - 1, this.selectedValue);
    // }
  }

}
