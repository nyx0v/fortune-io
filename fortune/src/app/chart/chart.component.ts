import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { StateService } from '../state.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {


  @Input() data!:any;
  @Input() yAxis!:string;
  @Input() xAxis!:string;
  @Input() chartType!:any;

  dataCopy!:any;

  constructor() { }

  chartOption!: EChartsOption;
  

  ngOnInit(): void {

  }

  ngOnChanges() {


      if(this.xAxis && this.yAxis && this.data && this.chartType === 'pie') {
        this.dataCopy = this.data.map((o:any) => {
          return {name: o[this.xAxis], value: o[this.yAxis]}
        });
      }

      this.chartOption = {
        xAxis: {
          show: this.chartType === 'pie' ? false : true,
          type: 'category',
          data: this.data.map((e:any)=>e[this.xAxis]),
          axisTick: {
            alignWithLabel: true,
            interval: 0,
            inside: true,

          },
          axisLabel: {
            showMaxLabel: true,
            hideOverlap: false,
            rotate: 90,

          },

           
        },
        
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.chartType === 'pie' ? this.dataCopy : this.data.map((e:any)=>e[this.yAxis]),
            type: this.chartType,
          },
        ],
      };
  }


}
