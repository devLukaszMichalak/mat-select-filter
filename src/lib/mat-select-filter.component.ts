import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'mat-select-filter',
  template: `
    <form [formGroup]="searchForm" class="search-select">
      <input #input class="input" matInput placeholder="{{placeholder}}" formControlName="value">
    </form>
  `,
  styleUrls: ['./mat-select-filter.component.scss']
})
export class MatSelectFilterComponent implements OnInit {

  @ViewChild('input') input;

  @Input('array') array: any;
  @Input('placeholder') placeholder: string;

  @Output() filterArrayReturn = new EventEmitter<any>();

  public filteredItems: any = [];
  public searchForm: FormGroup;

  constructor(fb: FormBuilder
  ) {
    this.searchForm = fb.group({
      value: ""
    })
  }
  ngOnInit() {
    this.searchForm.valueChanges.subscribe(value => {
      if (value['value']) {
        this.filteredItems = this.array.filter(name => name.toLowerCase().includes(value['value'].toLowerCase()));
      } else {
        this.filteredItems = this.array.slice();
      }
      this.filterArrayReturn.emit(this.filteredItems);
    })
    setTimeout(() => {
      this.input.nativeElement.focus();
      if (!this.placeholder) {
        this.placeholder = 'Search...';
      }
    }, 500)
  }
}