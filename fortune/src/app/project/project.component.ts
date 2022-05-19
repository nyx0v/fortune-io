import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Project} from './project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @Input() project!: Project;

  html_id!: string;
  id!: string;
  linktoanalyses: string="";

  file!: File;

  constructor(private apiService: ApiService) { }
  
  onChange(event: any) {
    this.file = event.target.files[0];
  }

  ngOnInit(): void {
    this.html_id = "#" + this.project.name.toLowerCase();
    this.id = this.project.name.toLowerCase();
    this.linktoanalyses = "/analyses/"+this.project._id+"?project="+this.project.name+"&data="+this.project.data;
  }

  handleModifier() {

    if(this.file) {
      this.apiService.upload(this.file).subscribe(data=>{

        this.project.data = data.data.name; 
        this.apiService.modifyProject(this.project._id, this.project.name, this.project.data).subscribe(data=>{
          console.log(data);
          this.ngOnInit();
        });

        
        
      });
    }
    else
      this.apiService.modifyProject(this.project._id, this.project.name, this.project.data).subscribe(data=>{
        console.log(data);
        this.ngOnInit();
      });

      

  }

  handleSupprimer() {
    this.apiService.deleteProject(this.project._id).subscribe(data=>{
      console.log(data);
      this.ngOnInit();
    });
  }

}
