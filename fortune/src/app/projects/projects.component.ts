import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from '../api.service';
import {Project} from "../project/project";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {


  new_name!: string;
  file!: File;
  filename: string = "";

  P !: Project[];

  notFoundError : boolean = false;

  username !: string;

  constructor(private apiService: ApiService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.username = params['username']; // same as :username in route
  });
    this.apiService.fetchProjects(this.username).subscribe(data => this.P = JSON.parse(JSON.stringify(data)), error=>this.notFoundError = error.status==404);
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }


  addProject() {
    if(this.file) {
      this.apiService.upload(this.file).subscribe(data=>{
        this.filename = data.data.name;
        this.apiService.createProject(this.new_name, this.filename).subscribe(data=>{
          console.log(data);
          this.ngOnInit(); 
        });

      })
    }
    else
      this.apiService.createProject(this.new_name, this.filename).subscribe(data=>{
        console.log(data);
        this.ngOnInit(); 
      });
  }
  

}
