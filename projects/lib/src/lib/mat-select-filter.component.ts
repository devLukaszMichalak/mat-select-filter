import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { A, NINE, SPACE, Z, ZERO } from '@angular/cdk/keycodes';
import { debounceTime, Subscription, take, timer } from 'rxjs';

@Component({
  selector: 'mat-select-filter',
  template: `
      <form [formGroup]="searchForm" class="mat-filter" [ngStyle]="{'background-color': color ? color : 'white'}">
          <div>
              <input #input class="mat-filter-input" matInput placeholder="{{placeholder}}" formControlName="value"
                     (keydown)="handleKeydown($event)">
              <mat-spinner *ngIf="localSpinner && showSpinner" class="spinner" diameter="16"></mat-spinner>
          </div>
          <div *ngIf="noResults"
               class="noResultsMessage">
              {{ noResultsMessage }}
          </div>
      </form>
  `,
  styleUrls: ['./mat-select-filter.component.scss']
})
export class MatSelectFilterComponent implements OnInit, OnDestroy {
  private searchFormValueChangesSubscription?: Subscription;
  @ViewChild('input', {static: true}) input: any;
  
  @Input('array') array: any[] = [];
  @Input('placeholder') placeholder: string = 'Search...';
  @Input('color') color?: string;
  @Input('displayMember') displayMember?: string;
  @Input('showSpinner') showSpinner = true;
  @Input('noResultsMessage') noResultsMessage = 'No results';
  @Input('hasGroup') hasGroup?: boolean;
  @Input('groupArrayName') groupArrayName?: string;
  @Input('filterDebounceTime') filterDebounceTime: number = 0;
  
  @Output() filteredReturn = new EventEmitter<any>();
  
  noResults = false;
  localSpinner = false;
  
  public filteredItems: any[] = [];
  
  public searchForm: FormGroup = this.fb.group({
    value: ''
  });
  
  constructor(private fb: FormBuilder) {
  }
  
  ngOnInit(): void {
    this.searchFormValueChangesSubscription = this.searchForm.valueChanges
      .pipe(debounceTime(this.filterDebounceTime))
      .subscribe(value => {
        this.localSpinner = true;
        
        const userInputLowerCase = value['value'].toLowerCase();
        
        if (userInputLowerCase) {
          this.filterArray(userInputLowerCase);
          
          // NO RESULTS VALIDATION
          this.noResults = this.filteredItems == null || this.filteredItems.length === 0;
          
        } else {
          this.filteredItems = this.array.slice();
          this.noResults = false;
        }
        
        this.filteredReturn.emit(this.filteredItems);
        timer(2000)
          .pipe(take(1))
          .subscribe(() => this.localSpinner = false);
      });
    
    timer(500)
      .pipe(take(1))
      .subscribe(() => this.input.nativeElement.focus());
  }
  
  private filterArray(userInputLowerCase: string): void {
    // IF THE DISPLAY MEMBER INPUT IS SET WE CHECK THE SPECIFIC PROPERTY
    if (this.displayMember == null) {
      this.filteredItems = this.array.filter((name: any) => name.toLowerCase().includes(userInputLowerCase));
      
    } else if (this.hasGroup && this.groupArrayName && this.displayMember) {
      this.filteredItems = this.array
        .map((a: any) => {
          const objCopy = {...a};
          objCopy[this.groupArrayName!] = objCopy[this.groupArrayName!].filter((g: any) => g[this.displayMember!].toLowerCase().includes(userInputLowerCase));
          return objCopy;
        })
        .filter((x: any) => x[this.groupArrayName!].length > 0);
      
      // OTHERWISE, WE CHECK THE ENTIRE STRING
    } else {
      this.filteredItems = this.array.filter((item: any) => item[this.displayMember!].toLowerCase().includes(userInputLowerCase));
    }
  }
  
  handleKeydown(event: KeyboardEvent): void {
    const isAlphanumeric = (event.key && event.key.length === 1) ||
      (event.keyCode >= A && event.keyCode <= Z) ||
      (event.keyCode >= ZERO && event.keyCode <= NINE) ||
      (event.keyCode === SPACE);
    
    // PREVENT PROPAGATION FOR ALL ALPHANUMERIC CHARACTERS IN ORDER TO AVOID SELECTION ISSUES
    if (isAlphanumeric) {
      event.stopPropagation();
    }
  }
  
  ngOnDestroy(): void {
    this.filteredReturn.emit(this.array);
    this.searchFormValueChangesSubscription!.unsubscribe();
  }
  
}
