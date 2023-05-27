import { Component, OnInit } from '@angular/core';

import{Chart,registerables}from 'node_modules/chart.js';
Chart.register(...registerables);
import { LoginRepository } from 'src/app/Services/DataRepository';
import { RestDataSource } from 'src/app/Services/RestDataLogin';
import { HttpClient } from "@angular/common/http";
import { Branch } from 'src/app/model/Branch';


@Component({
    selector: 'reports',
    templateUrl: 'Reports.component.html'
})

export class ReportsComponent implements OnInit{
  isSideNavOpened: boolean = false;
    dayReport!:any;
    monthlyReport!:any;
    yearlyReport!:any
    mapData!: any;
    dailyReportShow:boolean=false
    monthlyRepostShow:boolean=false;
    yearlyReportShow:boolean=false;
    branch:Branch=new Branch()
    constructor(
      private repo:LoginRepository,private datasource:RestDataSource,private http:HttpClient) {
        const branchh=this.repo.getBranch
        this.branch=JSON.parse(branchh!)
    }
    ngOnInit() {
        this.datasource.getReportsDaily(this.branch.branchid!).subscribe(data=>{
          this.dayReport=data
          console.log(data)
          this.RenderDailyChart()
        })
        this.datasource.getReportsMonthly(this.branch.branchid!).subscribe(data=>{
            this.monthlyReport=data
            this.RenderMonthlyChart()
        })
        this.datasource.getReportsYearly(this.branch.branchid!).subscribe(data=>{
          this.yearlyReport=data
          this.RenderYearlyChart()
        })
      }

    toggleSideNav() {
      this.isSideNavOpened = !this.isSideNavOpened;
  }

  showDailyReport(event: MouseEvent) {

    this.dailyReportShow=true
    this.monthlyRepostShow=false;
    this.yearlyReportShow=false;
    this.RenderDailyChart()
  }
  showMonthlyReport(event: MouseEvent) {

    this.dailyReportShow=false
    this.monthlyRepostShow=true;
    this.yearlyReportShow=false;
    this.RenderMonthlyChart()
  }

  showYearlyReport(event: MouseEvent) {
    // const buttonValue = (event.target as HTMLButtonElement).value;
    this.dailyReportShow=false
    this.monthlyRepostShow=false;
    this.yearlyReportShow=true;
    this.RenderYearlyChart()
  }

    RenderDailyChart()
    {
          new Chart("dailychart", {
            type: 'bar',
            data: {
              labels: Object.keys(this.dayReport),
              datasets: [{
                label: 'Day Report',
                data: Object.values(this.dayReport),
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
    }
    RenderMonthlyChart()
    {
          new Chart("monthlychart", {
            type: 'pie',
            data: {
              labels: Object.keys(this.monthlyReport),
              datasets: [{
                label: 'Monthly Report',
                data: Object.values(this.monthlyReport),

                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
    }
    printttt()
    {
      console.log("========================")
    }
    RenderYearlyChart()
    {
      // console.log(this.DailyReport)
          new Chart("yearlychart", {
            type: 'pie',
            data: {
              labels: Object.keys(this.yearlyReport),
              datasets: [{
                label: 'Monthly Report',
                data: Object.values(this.yearlyReport),
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
    }
}
