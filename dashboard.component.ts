import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import * as Chart from "chart.js";
// import { Chart, } from 'chart.js';
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label, MultiDataSet, Color } from "ng2-charts";
import { CommodityTotalNetWtDto } from "../dto/commodity-total-net-wt-dto";
import { DashboardWeeklyCountOfTruckDto } from "../dto/dashboard-weekly-count-of-truck-dto";
import { DashboardYearlyTransactionsDto } from "../dto/dashboard-yearly-transactions-dto";
import { HourlyTransactionDto } from "../dto/hourly-transaction-dto";
import { TotalMaterialWeightDto } from "../dto/total-material-weight-dto";
import { DashboardService } from "./dashboard.service";
// import ChartDataLabels from "chartjs-plugin-datalabels";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx: any;
  public datasets: any;
  public data = [];
  public myChartData: any = [];
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  checkPassed: any;
  previousVal: string;
  currentDate: Date = new Date();
  totalMaterialWeightDto: TotalMaterialWeightDto;
  commodityTotalNetWtDto: CommodityTotalNetWtDto[] = [];
  result: any;
  result1: any;
  result2: any;
  result4: any;
  //------end dashboard --------------------
  //------doughnut chat----------
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [[]];
  colors: Color[] = [
    {
      backgroundColor: ["#FFBB1C","#045C94","#A8320A","#86112E","#159947","#C62BF8","#0CA7B7"],
      pointBackgroundColor: "#ec250d",
      pointBorderColor: "rgba(255,255,255,0)",
      pointHoverBackgroundColor: "#ec250d",
      pointBorderWidth: 20,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 15,
      pointRadius: 4,
    },
  ];
  private _doughnutChartType: Chart.ChartType = "doughnut";
  public get doughnutChartType(): Chart.ChartType {
    return this._doughnutChartType;
  }
  public set doughnutChartType(value: Chart.ChartType) {
    this._doughnutChartType = value;
  }
  //---lineChart---
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Total Transaction Of Month' },
  ];
  lineChartLabels: Label[] = [];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: Chart.ChartType = 'line';
  lineChartColors = [];

  //---barchart ---
  public barChartLabels: Label[] = [];
  public barChartType: Chart.ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [];
  public barcolors = [];
  public barcolors2 = [];

  public barChartData: Chart.ChartDataSets[] = [
    {
      data: [], label: "Number Of Trucks"
    },
  ];
  //----barchart 2-------------
  public barChartLabels2: Label[] = [];
  public barChartType2: Chart.ChartType = "bar";
  public barChartLegend2 = true;
  public barChartPlugins2 = [];

  public barChartData2: Chart.ChartDataSets[] = [
    {
      data: [], label: "Number of Trucks "
    },
  ];
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontColor: "#fff", // legend color (can be hexadecimal too)
      },
    },
    maintainAspectRatio: true,
    plugins: {
      labels: {
        render: "value",
        fontColor: "aliceblue",
        fontSize: 20,
      },
    },
  };

  public lineChartOptions: ChartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: true,
      labels: {
        fontColor: "#fff",
      },
    },

    tooltips: {
      backgroundColor: "black",
      titleFontColor: "#fff",
      bodyFontColor: "#fff",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      // intersect: 0,
      position: "nearest",
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          display: true,
          // barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 140,
            stepSize: 20,
            padding: 20,
            fontColor: "#fff",
          },
        },
      ],

      xAxes: [
        {
          display: true,
          // barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(233,32,16,0.1)",
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#ffff",
          },
        },
      ],
    },
  };
  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontColor: "#fff", // legend color (can be hexadecimal too)
      },
    },
    maintainAspectRatio: true,
    plugins: {
      labels: {
        render: "value",
        fontColor: "#ffff !important",
      },
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMin: 0,
            suggestedMax: 10,
            fontColor: "#ffff !important",
          },
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent",
          },
          scaleLabel: {
            display: true,
            labelString: "Number Of Trucks",
            fontColor: "#ffff !important",
          },
        },
      ],
      xAxes: [
        {
          display: true,
          ticks: {
            fontColor: "#ffff",
          },
          // gridLines: {
          //         display: false

          //       }
        },
      ],
    },
  };
  public barChartOptions2: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontColor: "#fff", // legend color (can be hexadecimal too)
      },
    },
    maintainAspectRatio: true,
    plugins: {
      labels: {
        // render: () => {},
        render: "value",
        fontColor: "#ffff",
      },
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMin: 0,
            suggestedMax: 10,
            fontColor: "#ffff",
          },
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent",
          },
          scaleLabel: {
            display: true,
            labelString: "Number Of Trucks",
            fontColor: "#ffff !important",
          },
        },
      ],
      xAxes: [
        {
          display: true,
          ticks: {
            fontColor: "#ffff",
          },
        },
      ],
    },
    // scales: {
    //   xAxes: [{
    //     gridLines: {
    //       display: false
    //     }
    //   }],
    //   yAxes: [{
    //     gridLines: {
    //       display: false
    //     }
    //   }]

    // }
  };

  constructor(
    public datepipe: DatePipe,
    private dashBoardService: DashboardService
  ) {
  }

  ngOnInit() {
    this.getYearlyTransaction();
    this.getHourlyTransactions();
    // this.secondDashboard();
    var todayDate = this.datepipe.transform(this.currentDate, "yyyy-MM-dd");
    this.getweeklyTotalTruckCount(todayDate, todayDate);
    this.getTotalCommodityWeight(todayDate, todayDate);
    this.getTotalCommodityWeightBasedOnDate(todayDate, todayDate)
    // this.getTotalMaterialWeight(todayDate, todayDate);
    this.canvas = document.getElementById("chartLineGreen");
    // this.canvas = document.getElementById("chartBig1");
    this.canvas = document.getElementById("chartLineBlue");
    this.ctx = this.canvas.getContext("2d");

    const canvas2: any = document.getElementById("barchartGreen");
    let ctx2 = canvas2.getContext("2d");
    let ctx3 = canvas2.getContext("2d");


    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
    var gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);
    var gradientStroke3 = ctx3.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(233,32,16,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(233,32,16,0.0)");
    gradientStroke.addColorStop(0, "rgba(233,32,16,0)");

    gradientStroke2.addColorStop(1, "rgba(66,134,121,0.15)");
    gradientStroke2.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
    gradientStroke2.addColorStop(0, "rgba(66,134,121,0)"); //green colors

    gradientStroke3.addColorStop(1, "rgba(233,32,16,0.2)");
    gradientStroke3.addColorStop(0.4, "rgba(233,32,16,0.0)");
    gradientStroke3.addColorStop(0, "rgba(233,32,16,0)"); //red colors

    this.lineChartColors = [
      {
        backgroundColor: gradientStroke,
        borderColor: "#ec250d",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#ec250d",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#ec250d",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
      },
    ];

    this.barcolors = [
      {
        backgroundColor: gradientStroke,
        borderColor: "#00d6b4",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#00d6b4",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#00d6b4",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
      },
    ];
    this.barcolors2 = [
      {
        backgroundColor: [gradientStroke2],
        borderColor: "#00d6b4",
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: "#00d6b4",
        pointBorderColor: "rgba(255,255,255,0)",
        pointHoverBackgroundColor: "#00d6b4",
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
      },
    ];
  }

  totalWeeklyTruckCount(dropDownValue: number) {
    if (dropDownValue == 1) {
      var datewise = this.currentDate.setDate(this.currentDate.getDate() - 7);
      console.log(this.datepipe.transform(datewise, "yyyy-MM-dd"));
      var lastweekDate = this.datepipe.transform(datewise, "yyyy-MM-dd");
      this.currentDate = new Date();
      var todayDate = this.datepipe.transform(this.currentDate, "yyyy-MM-dd");
      this.getweeklyTotalTruckCount(lastweekDate, todayDate);
    } else if (dropDownValue == 2) {
      var firstDay = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        1
      );
      var thisMonthFirstDate = this.datepipe.transform(firstDay, "yyyy-MM-dd");
      todayDate = this.datepipe.transform(this.currentDate, "yyyy-MM-dd");
      this.getweeklyTotalTruckCount(thisMonthFirstDate, todayDate);
    } else if (dropDownValue == 3) {
      var yearFirstDay = new Date(this.currentDate.getFullYear(), 0, 1);
      var firstDateOfThisYear = this.datepipe.transform(
        yearFirstDay,
        "yyyy-MM-dd"
      );
      todayDate = this.datepipe.transform(this.currentDate, "yyyy-MM-dd");
      this.getweeklyTotalTruckCount(firstDateOfThisYear, todayDate);
    } else if (dropDownValue == 4) {
      var todayDate = this.datepipe.transform(this.currentDate, "yyyy-MM-dd");
      this.getweeklyTotalTruckCount(todayDate, todayDate);
    }
  }

  totalCommodityWeightBasedOnDate(dropDownValue: number) {
    if (dropDownValue == 1) {
      var datewise = this.currentDate.setDate(this.currentDate.getDate() - 7);
      console.log(this.datepipe.transform(datewise, "yyyy-MM-dd"));
      var lastweekDate = this.datepipe.transform(datewise, "yyyy-MM-dd");
      this.currentDate = new Date();
      var todayDate = this.datepipe.transform(this.currentDate, "yyyy-MM-dd");
      this.getTotalCommodityWeightBasedOnDate(lastweekDate, todayDate);
    } else if (dropDownValue == 2) {
      var firstDay = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        1
      );
      var thisMonthFirstDate = this.datepipe.transform(firstDay, "yyyy-MM-dd");
      todayDate = this.datepipe.transform(this.currentDate, "yyyy-MM-dd");
      this.getTotalCommodityWeightBasedOnDate(thisMonthFirstDate, todayDate);
    } else if (dropDownValue == 3) {
      var yearFirstDay = new Date(this.currentDate.getFullYear(), 0, 1);
      var firstDateOfThisYear = this.datepipe.transform(
        yearFirstDay,
        "yyyy-MM-dd"
      );
      todayDate = this.datepipe.transform(this.currentDate, "yyyy-MM-dd");
      this.getTotalCommodityWeightBasedOnDate(firstDateOfThisYear, todayDate);
    } else if (dropDownValue == 4) {
      var todayDate = this.datepipe.transform(this.currentDate, "yyyy-MM-dd");
      this.getTotalCommodityWeightBasedOnDate(todayDate, todayDate);
    }
  }

  totalCommodityWeight(dropDownValue: number) {
    if (dropDownValue == 1) {
      var datewise = this.currentDate.setDate(this.currentDate.getDate() - 7);
      console.log(this.datepipe.transform(datewise, "yyyy-MM-dd"));
      var lastweekDate = this.datepipe.transform(datewise, "yyyy-MM-dd");
      this.currentDate = new Date();
      var todayDate = this.datepipe.transform(this.currentDate, "yyyy-MM-dd");
      this.getTotalCommodityWeight(lastweekDate, todayDate);
    } else if (dropDownValue == 2) {
      var firstDay = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        1
      );
      var thisMonthFirstDate = this.datepipe.transform(firstDay, "yyyy-MM-dd");
      todayDate = this.datepipe.transform(this.currentDate, "yyyy-MM-dd");
      this.getTotalCommodityWeight(thisMonthFirstDate, todayDate);
    } else if (dropDownValue == 3) {
      var yearFirstDay = new Date(this.currentDate.getFullYear(), 0, 1);
      var firstDateOfThisYear = this.datepipe.transform(
        yearFirstDay,
        "yyyy-MM-dd"
      );
      todayDate = this.datepipe.transform(this.currentDate, "yyyy-MM-dd");
      this.getTotalCommodityWeight(firstDateOfThisYear, todayDate);
    } else if (dropDownValue == 4) {
      var todayDate = this.datepipe.transform(this.currentDate, "yyyy-MM-dd");
      this.getTotalCommodityWeight(todayDate, todayDate);
    }
  }



  getTotalCommodityWeightBasedOnDate(startDate?: any, endDate?: any) {
    this.dashBoardService.totalCommodityWeightBasedOnDate(startDate, endDate).subscribe((data) => {
      if (data.httpStatus == "FOUND") {
        this.result4 = data;
        console.log(this.result4);
        this.doughnutChartData = this.result4.commodityTotalCountDto.map((res4: any) => res4.totalCount);
        console.log(this.doughnutChartData);
        this.doughnutChartLabels = this.result4.commodityTotalCountDto.map((res4: any) => res4.name);
        console.log(this.doughnutChartLabels);
      } else {
        alert(data.message);
      }
    })
  }

  getTotalCommodityWeight(startDate?: any, endDate?: any) {
    this.dashBoardService.totalCommodityWeight(startDate, endDate).subscribe((data) => {
      if (data.status == "FOUND") {
        this.commodityTotalNetWtDto = data.commodityTotalNetWtDto;
        console.log(this.commodityTotalNetWtDto);
      } else {
        alert(data.message);
      }
    })
  }


  getweeklyTotalTruckCount(startDate?: any, endDate?: any) {
    this.dashBoardService.weeklyTotalTruckCount(startDate, endDate).subscribe(data => {
      if (data.httpStatus == "FOUND") {
        this.result = data;
        console.log(this.result);
        this.barChartData2 = this.result.dashboardWeeklyCountOfTruckDto.map((res: any) => res.numberoftruck);
        console.log(this.barChartData2);
        this.barChartLabels2 = this.result.dashboardWeeklyCountOfTruckDto.map((res: any) => res.weekName);
        console.log(this.barChartLabels2);
      } else {
        alert(data.message);
      }
    })
  }

  getHourlyTransactions() {
    this.dashBoardService.hourlyTransactions().subscribe((data) => {
      if (data.status == "FOUND") {
        this.result1 = data;
        console.log(this.result1);
        this.barChartData = this.result1.hourlyTransactionDto.map((res1: any) => res1.numberOfTrucks);
        console.log(this.barChartData);
        this.barChartLabels = this.result1.hourlyTransactionDto.map((res1: any) => res1.hours);
        console.log(this.barChartLabels);
      } else {
        alert(data.message);
      }
    })
  }

  getYearlyTransaction() {
    this.dashBoardService.yearlyTransaction().subscribe((data) => {
      if (data.httpStatus == "FOUND") {
        this.result2 = data;
        console.log(this.result2);
        this.lineChartLabels = this.result2.dashboardYearlyTransactionsDto.map((res2: any) => res2.monthName);
        console.log(this.lineChartLabels);
        this.lineChartData = this.result2.dashboardYearlyTransactionsDto.map((res2: any) => res2.totalTransactionOfMonth);
        console.log(this.lineChartData);
      } else {
        alert(data.message);
      }
    })
  }

  secondDashboard() {
    var gradientChartOptionsConfigurationWithTooltipBlue: any = {
      maintainAspectRatio: false,
      legend: {
        display: false,
        fontColor: "#fff",
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#2380f7",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#2380f7",
            },
          },
        ],
      },
    };

    var gradientChartOptionsConfigurationWithTooltipPurple: any = {
      maintainAspectRatio: false,
      legend: {
        display: false,
        fontColor: "#fff",
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9a9a9a",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(225,78,202,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9a9a9a",
            },
          },
        ],
      },
    };

    var gradientChartOptionsConfigurationWithTooltipRed: any = {
      maintainAspectRatio: false,
      legend: {
        display: true,
        labels: {
          fontColor: "#fff",
        },
      },

      tooltips: {
        backgroundColor: "black",
        titleFontColor: "#fff",
        bodyFontColor: "#fff",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            display: true,
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100,
              stepSize: 20,
              padding: 20,
              fontColor: "#fff",
            },
          },
        ],

        xAxes: [
          {
            display: true,
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(233,32,16,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#ffff",
            },
          },
        ],
      },
    };

    var gradientChartOptionsConfigurationWithTooltipOrange: any = {
      maintainAspectRatio: false,
      legend: {
        display: false,
        fontColor: "#fff",
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 110,
              padding: 20,
              fontColor: "#ff8a76",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(220,53,69,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#ff8a76",
            },
          },
        ],
      },
    };

    var gradientChartOptionsConfigurationWithTooltipGreen: any = {
      maintainAspectRatio: false,
      legend: {
        display: false,
        fontColor: "#fff",
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.0)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],

        xAxes: [
          {
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: "rgba(0,242,195,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
      },
    };

    var gradientBarChartConfiguration: any = {
      maintainAspectRatio: false,
      legend: {
        display: false,
        fontColor: "#fff",
      },

      tooltips: {
        backgroundColor: "#f5f5f5",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 60,
              suggestedMax: 120,
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],

        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              color: "rgba(29,140,248,0.1)",
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e",
            },
          },
        ],
      },
    };

    // this.canvas = document.getElementById("chartBig1");
    // this.ctx = this.canvas.getContext("2d");

    // var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    // gradientStroke.addColorStop(1, "rgba(233,32,16,0.2)");
    // gradientStroke.addColorStop(0.4, "rgba(233,32,16,0.0)");
    // gradientStroke.addColorStop(0, "rgba(233,32,16,0)"); //red colors

    // this.myChartData = new Chart('chartBig1', {
    //   type: "line",
    //   data: {
    //     labels: this.chart_labels,
    //     datasets: [
    //       {
    //         label: "Total Transaction Of Month",
    //         fill: true,
    //         backgroundColor: gradientStroke,
    //         borderColor: "#ec250d",
    //         borderWidth: 2,
    //         borderDash: [],
    //         borderDashOffset: 0.0,
    //         pointBackgroundColor: "#ec250d",
    //         pointBorderColor: "rgba(255,255,255,0)",
    //         pointHoverBackgroundColor: "#ec250d",
    //         pointBorderWidth: 20,
    //         pointHoverRadius: 4,
    //         pointHoverBorderWidth: 15,
    //         pointRadius: 4,
    //         data: this.data,
    //       },
    //     ],
    //   },
    //   options: gradientChartOptionsConfigurationWithTooltipRed,
    // });

  }
  // public updateOptions() {
  //   this.myChartData.data.datasets[0].data = this.data;
  //   this.myChartData.update();
  // }
}
