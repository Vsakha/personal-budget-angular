import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  public dataSource =  {
    datasets: [
        {
            data: [],
            backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
            ]
        }
    ],
    labels: []
};



  constructor(private http: HttpClient) {
    const el = document.getElementById('myChart');
    console.log('Is myChart there?', el);
   }

  ngAfterViewInit(): void {
    const el = document.getElementById('myChart');
    console.log('Is myChart there?', el);
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.datasets[0].data = res.myBudget[i].budget;
        this.dataSource.labels = res.myBudget[i].title;
        this.createChart();
    }
    });
  }

  createChart() {
    var ctx:any = document.getElementById('myChart');
    var mPieChart = new Chart(ctx, {
        type: "pie",
        data: this.dataSource
    });
  }
}
