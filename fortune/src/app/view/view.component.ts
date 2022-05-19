import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxCsvParser } from 'ngx-csv-parser';
import { ApiService } from '../api.service';
import { StateService } from '../state.service';




@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  data !: any;

  fields!: string[];
  datatypes: string[] = ['Symbolic', 'Numeric'];

  selectedField!: string;
  selectedType!: string;

  stats!: any;
  statsHeader: string[] = [];

  xAxis!: string;
  yAxis! : string; 

  viewdata: boolean = false;

  chartTypes:string[] = ['line', 'scatter', 'pie', 'bar'];

  chartTypeChoice: string = 'line';

  constructor(private apiService: ApiService, private router:ActivatedRoute, private csv: NgxCsvParser, private stateService: StateService) { }

  ngOnInit(): void {

    this.fields = this.stateService.fields;

    let data;
    this.router.queryParams.subscribe((params: Params) => {
      data = params['data']; // same as :username in route
      this.apiService.downloadData(data).subscribe(data=>{
        data.text().then(text => {
          
          
          this.csv.parse( new File([new Blob([text], {type: 'text/plain'})], 'tmp.csv'), {header: true, delimiter: ','}).subscribe(data=>{
            this.data = data;
          });
          
          
        });
      });
      
    });

    this.xAxis = this.fields[0];
    this.yAxis = this.fields[0];
    
  }

  onChangeXAxis(event: any) {
    this.xAxis = event.target.attributes.id.nodeValue;
    
  }

  onChangeYAxis(event: any) {
    this.yAxis = event.target.attributes.id.nodeValue;
  }

  onChangeChartType(event: any) {
    this.chartTypeChoice = event.target.attributes.id.nodeValue;
  }

  onChangeRadio(event: any) {

    let choice = event.target.attributes.id.nodeValue;
    if(this.datatypes.includes(choice)) this.selectedType = choice;
    else this.selectedField = choice;

    console.log(this.selectedField + "    " + this.selectedType);

    if(this.selectedField && this.selectedType) this.showStats(this.selectedField, this.selectedType);
  }

  onViewDataToggle() {
    this.viewdata = !this.viewdata;
  }
  



  showStats(field: string, type: string) {


    this.statsHeader = [];

    console.log(this.statsHeader);


    let data = this.data.map((f:any) => f[field]);

    this.apiService.getStats(data, type).subscribe((res:any) => {

      this.stats = res;


      Object.getOwnPropertyNames(this.stats).forEach(f => {
        this.statsHeader.push(f);
      });

      this.stats.quantile = `q1: ${this.stats.quantile.q1} ; q3: ${this.stats.quantile.q3}`;

     
    });

  }

}
