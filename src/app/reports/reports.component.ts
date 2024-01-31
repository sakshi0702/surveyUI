import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{
  user_id: any;
  data: any;
  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) { Object.assign(this, { this: this.single }) }
  ngOnInit(): void {
    this.getReportData();
    this.percentage = Math.floor((this.CurrentNumber/this.TotalNumber)*100);
    this.percentage = Math.floor((this.CurrentNumber/this.TotalNumber)*100); //calculating our percentage
    //pie charts sets all values on 1 chart unlike pie grid
    // so to be able to customize we will use this array to set our desired number 
    // and the rest will be the total unachieved
    this.single = [
      {
        "name": "Done",
        "value": this.CurrentNumber, 
      },
      {
        "name": "Undone",
        "value": this.TotalNumber - this.CurrentNumber,
      },
    ];

    // this.colorScheme = {
    //   name: 'myScheme',
    //   selectable: true,
    //   group: ScaleType.Ordinal,
    //   domain: [this.activeColor, '#F0F0F0']
    // };
  }

  getReportData() {
    const param = {
      'id': '65b7a8d12164dd67fd8cd242'
    }
    this.apiService.getReportData(param).subscribe((response) => {
      this.data = response;
    });
  }
  

  checkIfList(data: any): boolean {
    if(!Array.isArray(data)){
      this.clearHashMap();
      const newData: { [key: string]: any } = data;
      this.dataHashMap = { ...this.dataHashMap, ...newData };
    }
    return Array.isArray(data);
  }



  percentage: number = 0; //our text in the middle of the pie
  @Input() CurrentNumber: number = 10;
  @Input() TotalNumber: number = 100;
  @Input() PieTitle: string = 'Pie Chart';
  @Input() activeColor: string = '#000';

  single: any[] = [];
  // colorScheme!: Color;

  view: [number, number] = [180, 180]; //height & width

  updateChart(dataHashMap: Map<string, number>) {

    this.single = [];

    // Iterate over the entries in the HashMap
    for (const [name, value] of dataHashMap) {
      // Example: Push each entry as an object to the 'single' array
      this.single.push({
        name,
        value
      });
    }

    // You may need to adjust this method according to your data structure
    this.percentage = Math.floor((this.CurrentNumber / this.TotalNumber) * 100);
    console.log('single', this.single);
    console.log('op',this.CurrentNumber,this.TotalNumber);
    
    

    // Pie chart data
    this.single = [
      {
        name: "Done",
        value: this.CurrentNumber,
      },
      {
        name: "Undone",
        value: this.TotalNumber - this.CurrentNumber,
      },
    ];

    // Color scheme
    // this.colorScheme = {
    //   name: 'myScheme',
    //   selectable: true,
    //   group: ScaleType.Ordinal,
    //   domain: [this.activeColor, '#F0F0F0']
    // };
  }
  colorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal // or ScaleType.Linear depending on your requirements
  };

  // Your dynamic data here
  dataHashMap: { [key: string]: number } = {};

  get pieChartData() {
    return Object.keys(this.dataHashMap).map(key => ({
      name: key,
      value: this.dataHashMap[key]
    }));
  }
  inputHashMap(chartHashMap: Map<string, number>){
    chartHashMap: this.dataHashMap;
  }
  clearHashMap(){
    this.dataHashMap = {};
  }
}
