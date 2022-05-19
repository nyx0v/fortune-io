import { Component, Input, OnInit } from '@angular/core';
import { Field } from './field';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  checked:boolean = false;

  @Input() field!: Field;

  constructor() { }

  ngOnInit(): void {
    this.checked = this.field.checked;
  }

  onChange() {
    this.field.checked = this.checked;
  }


}
