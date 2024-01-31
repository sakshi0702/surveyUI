import { Component } from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})

export class PiechartComponent {
  single = [
    {
      name: 'Category A',
      value: 30,
    },
    {
      name: 'Category B',
      value: 50,
    },
    {
      name: 'Category C',
      value: 20,
    },
  ];

  onSelect(event: any): void {
    console.log(event);
  }

  view: [number, number] = [700, 400];
  showLegend = true;
  explodeSlices = false;
}
