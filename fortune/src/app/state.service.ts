import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  fields!: string[];
  reloaded: boolean = false;

  constructor() { }
}
