import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxCsvParser } from 'ngx-csv-parser';
import { ApiService } from '../api.service';
import { Field } from '../field/field';
import { StateService } from '../state.service';
import { Analysis } from './analysis';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {


  @Input() analysis!: Analysis;
  @Input() data!: string;

  fields: Field[] = [];

  projectdata!: any;

  modalid!:string;
  id!:string;

  constructor(private apiService: ApiService, private router: Router, private aroute: ActivatedRoute, private csv: NgxCsvParser, private stateService: StateService) { }



  ngOnInit(): void {
    this.modalid = "#"+this.analysis.name.toLowerCase();
    this.id = this.analysis.name.toLowerCase();

    let data;
    this.aroute.queryParams.subscribe((params: Params) => {
      data = params['data']; // same as :username in route
      this.apiService.downloadData(data).subscribe(data=>{
        
        data.text().then(text => {
          
          
          this.csv.parse( new File([new Blob([text], {type: 'text/plain'})], 'tmp.csv'), {header: true, delimiter: ','}).subscribe(data=>{
            this.projectdata = data;
            Object.getOwnPropertyNames(this.projectdata[0]).forEach(f => {
              this.fields.push({name: f, checked: this.analysis.fields.includes(f) ? true: false});
            });


          });
          
          
        });
      });
      
    });
  }

  onDelete() {
    this.apiService.deleteAnalysis(this.analysis._id).subscribe(data=>{
      console.log(data);
      this.ngOnInit();
    });
  }

  onModify() {
    this.apiService.modifyAnalysis(this.analysis._id, this.analysis.name, this.analysis.project, this.fields.filter(f=>f.checked).map(f => f.name) ).subscribe(data=>{
      console.log(data);
    });
  }

  onView() {
    
    this.stateService.fields = this.fields.filter(f=>f.checked).map(f => f.name);
    this.router.navigateByUrl("view/"+this.analysis._id+"?data="+this.data);
  }

}
