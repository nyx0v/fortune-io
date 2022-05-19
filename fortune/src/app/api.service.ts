import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const apiUrl = 'http://localhost:1337/api'



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  signup(username: string, password: string) {
    return this.http.post(apiUrl+'/users', {username: username, password: password});
  }

  login(username: string, password: string) {
    return this.http.post(apiUrl+'/auth/login', {username: username, password: password});
  }

  fetchUserId(username: string, token: string) {
    return this.http.get(apiUrl+'/users/'+username+'?token='+token);
  }

  fetchProjects(userid: string) {
    return this.http.get(apiUrl+'/projects/'+userid +'?token=' + localStorage.getItem('user_token'));
  }

  deleteProject(project_id: string) {
    return this.http.delete(apiUrl+'/projects/'+project_id+'?token='+ localStorage.getItem('user_token'));
  }

  createProject(name: string, data: string) {
    return this.http.post(apiUrl+'/projects?token='+localStorage.getItem("user_token"), {name: name, data: data, user: localStorage.getItem('userid')});
  }

  modifyProject(projectid:string, name: string, data:string) {
    return this.http.put(apiUrl+'/projects/'+projectid+'?token='+localStorage.getItem('user_token'), {name: name, data: data});
  }

  upload(file: File):Observable<any> {
    const formData = new FormData();

    formData.append("file", file, file.name);

    return this.http.post(apiUrl+'/upload?token='+localStorage.getItem('user_token'), formData);
  }
  fetchAnalyses(projectid: string) {
    return this.http.get(apiUrl+'/analyses/'+projectid +'?token=' + localStorage.getItem('user_token'));
  }

  deleteAnalysis(analysis_id: string) {
    return this.http.delete(apiUrl+'/analyses/'+analysis_id +'?token=' + localStorage.getItem('user_token'));
  }
  createAnalysis(name: string, project_id: string) {
    return this.http.post(apiUrl+'/analyses?token='+localStorage.getItem('user_token'), {name: name, project:project_id});
  }

  modifyAnalysis(analysisid: string, name: string, project:string, fields: string[]) {
    return this.http.put(apiUrl+'/analyses/'+analysisid +'?token=' + localStorage.getItem('user_token'), {name: name, project: project, fields: fields});
  }

  downloadData(data:string) {
    return this.http.get(apiUrl+'/download/'+data+'?token='+ localStorage.getItem('user_token'), {headers: new HttpHeaders({'Accept': 'text/plain'}), 'responseType': 'blob'});
  }

  getStats(data: any, type: string) {
    return this.http.post(apiUrl+'/statistics/'+type, {data: data});
  }

}
