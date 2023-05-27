import { Component, OnInit, ViewChild,ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions, ICellRendererParams } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { MatDialog } from '@angular/material/dialog';
import { AddBranchComponent } from '../Add Branch/add-branch.component';
import { RestDataSource } from 'src/app/Services/RestDataLogin';

@Component({
    selector: 'settings',
    templateUrl: 'Settings.component.html',
    styleUrls:['Settings.component.css']
})

export class SettingsComponent implements OnInit, ICellRendererAngularComp {
    @ViewChild('agGrid', { static: false }) agGrid!: AgGridAngular;
  gridApi:any;
  columnApi:any;
    columnDefs: any[];
    gridOptions: GridOptions;
    rowData: any[];

    constructor(private http: HttpClient,private dialog:MatDialog,private dataSource:RestDataSource) {
      this.columnDefs = [

        { headerName: 'Branch Name', field: 'branchname', sortable: true, filter: true,  editable: true },
        { headerName: 'Branch Location', field: 'branchLocation', sortable: true, filter: true,  editable: true },
        { headerName: 'Hotel Name', field: 'hotel.hotelName', sortable: true, filter: true,  editable: true },
        { headerName: 'City', field: 'hotel.city' },

      ];

      this.gridOptions = {
        animateRows: true,
        pagination: true,
        paginationPageSize: 3,
        cacheBlockSize: 5,
        rowSelection: 'multiple',
        frameworkComponents: {

        },
        onCellValueChanged: this.onCellValueChanged.bind(this)
      };

      this.rowData = [];
    }
  agInit(params: ICellRendererParams<any, any, any>): void {
    throw new Error('Method not implemented.');
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    throw new Error('Method not implemented.');
  }

    ngOnInit(): void {
      this.http.get<any>(this.dataSource.getUrl()+'9012/hotel/branch/getall').subscribe(
        data => {
          this.rowData = data;
          console.log(data)
          this.gridOptions.api?.setRowData(this.rowData);
        },
        error => {
          console.error('Error fetching data from API:', error);
        }
      );
    }
    onGridReady(params: { api: any; columnApi: any; })
    {
      this.gridApi=params.api
      this.columnApi=params.columnApi;
    }
    addRow()
    {
      const dialogRef = this.dialog.open(AddBranchComponent,{ panelClass: 'custom-dialog-container'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

    // addAll()
    // {
    //   this.http.get<any>('http://localhost:8087/hotel/branch/getall').subscribe(
    //     data => {
    //       })
    // }
    onCellValueChanged(event: any) {
      const updatedObject = event.data;
      const rowId = event.data.hotel.hotelId; // Assuming you have an 'id' property in your rowData
    console.warn(updatedObject)
    console.log(rowId)
      // Make an HTTP request to update the object
      this.http.post<any>(this.dataSource.getUrl()+`9012/hotel/branch/save/${rowId}`, updatedObject)
        .subscribe(
          data => {
            console.log('Object updated successfully:', data);
          },
          error => {
            console.error('Error updating object:', error);
          }
        );
    }

    getSelectedRow() {
      const selectedRows = this.gridOptions.api?.getSelectedRows();
      console.log('Selected rows:', selectedRows);
    }
}
