import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Analysis } from '../analysis/analysis';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-analyses',
  templateUrl: './analyses.component.html',
  styleUrls: ['./analyses.component.css']
})
export class AnalysesComponent implements OnInit {

  A!: Analysis[];
  projectname!:string;
  projectid!:string;
  projectdata!:string;

  notFoundError : boolean = false;

  newname!:string;


  constructor(private apiService: ApiService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.projectid = params['projectid']; // same as :username in route
      
  });

    this.route.queryParams.subscribe((params: Params) => {
      this.projectdata = params['data'];
    })

    this.route.queryParams.subscribe(res => this.projectname = res['project']);
    this.apiService.fetchAnalyses(this.projectid).subscribe(data => this.A = JSON.parse(JSON.stringify(data)), error=>this.notFoundError = error.status==404);

  }

  onAdd() {
    this.apiService.createAnalysis(this.newname, this.projectid).subscribe(data =>{
       console.log(data);
       this.ngOnInit();
    });

  }

  }


