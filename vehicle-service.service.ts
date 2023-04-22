import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { VehicleTypeMasterDto } from "src/app/dto/vehicle-type-master-dto";
import { EnvService } from "src/app/env.service";

@Injectable({
  providedIn: "root",
})
export class VehicleServiceService {
  constructor(private http: HttpClient, private env: EnvService) {}
  baseUrl = this.env.apiUrl;
  vehicleTypeMaster(vehicleDto: VehicleTypeMasterDto): Observable<any> {
    const url = this.baseUrl + "vehicleType";
    return this.http
      .post<any>(url, vehicleDto)
      .pipe(catchError(this.handleError));
  }
  getVehicleTypeTableData(): Observable<any> {
    //return this.http.post(url,tableData)UserMasterResponse
    return this.http
      .get<any>(this.baseUrl + "vehicleType")
      .pipe(catchError(this.handleError));
  }
  getPagableVehicleTypes(
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    const url =
      this.baseUrl +
      "vehicleType/getAllByPagination?page=" +
      pageNumber +
      "&size=" +
      pageSize;
    //return this.http.post(url,tableData)UserMasterResponse
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }
  deleteVehicleType(id: number): Observable<any> {
    return this.http
      .delete<any>(this.baseUrl + "vehicleType/" + id)
      .pipe(catchError(this.handleError));
  }
  editUserTableData(tableData: VehicleTypeMasterDto): Observable<any> {
    const url = this.baseUrl + "vehicleType";
    //return this.http.post(url,tableData)
    return this.http
      .put<any>(url, tableData)
      .pipe(catchError(this.handleError));
  }
  searchUserTableData(
    brand: string,
    pageNumber: number,
    pageSize: number
  ): Observable<any> {
    const url =
    this.baseUrl +
      "vehicleType/findPageByBrandName/" +
      brand +
      "?pageNum=" +
      pageNumber +
      "&pageSize=" +
      pageSize;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }
  private handleError(error) {
    let errorMessage = "";
    errorMessage = `Error: ${error.error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
