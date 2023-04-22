import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EnvService } from '../env.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, public env: EnvService) { }
  baseUrl = this.env.apiUrl;

  // materialTransaction(today?: any, lastDate?: any): Observable<any> {
  //   if (lastDate == undefined || lastDate == "" || lastDate == null) {
  //     var url = this.baseUrl + "transactions/totalMaterialWeight/" + today;
  //   } else {
  //     var url = this.baseUrl + "transactions/totalMaterialWeight/" + lastDate + "/" + today;
  //   }
  //   return this.http.get<any>(url).pipe(catchError(this.handleError));
  // }

  // http://10.66.66.91:8080/tlm-wb-dataservices/dashboard/getTotalCommodity/2022-10-10/2022-10-31

  totalCommodityWeightBasedOnDate(startDate?: string, endDate?: string): Observable<any> {
    var url = this.baseUrl + "tlm-wb-dataservices/dashboard/getTotalCommodity/"  + startDate + "/" + endDate;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }  

  totalCommodityWeight(startDate?: string, endDate?: string): Observable<any> {
    var url = this.baseUrl + "tlm-wb-dataservices/dashboard/getCommodityCount/"  + startDate + "/" + endDate;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  weeklyTotalTruckCount(startDate?: string, endDate?: string): Observable<any> {
    var url = this.baseUrl + "tlm-wb-dataservices/dashboard/getWeeklyTotalTruckCount/" + startDate + "/" + endDate;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  hourlyTransactions(): Observable<any> {
    var url = this.baseUrl + "tlm-wb-dataservices/dashboard/hourlyTransactions";
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  yearlyTransaction(): Observable<any> {
    var url = this.baseUrl + "tlm-wb-dataservices/dashboard/yearlyTransaction";
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  private handleError(error) {
    let errorMessage = "";
    errorMessage = `Error: ${error.error.message}`;
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
