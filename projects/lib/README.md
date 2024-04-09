## IMPORTANT
### This is a fork that will bring the library up to the latest angular version.
The versioning of this fork follows the angular versions,
so for example, for any angular 13.x.x project use library version 13.x.x


https://github.com/devLukaszMichalak/mat-select-filter

# mat-select-filter

## Original Github

https://github.com/mdlivingston/mat-select-filter

## Description

The mat-select-filter is a filterer for the material select drop-downs.
They currently do not support this, so I decided to make my own.

## Demo

https://stackblitz.com/edit/mat-select-filter

## Install

#### npm

```shell
$ npm install mat-select-filter
```

## How to use

Be sure to import into desired module:

```ts
import { MatSelectFilterModule } from 'mat-select-filter';
```

Next, add it to the desired material select:

```angular17html
<mat-form-field>
    <mat-select>
        <mat-select-filter [array]="variables" (filteredReturn)="filteredVariables = $event"></mat-select-filter>
        <mat-option *ngFor="let variable of filteredVariables">
            {{variable}}
        </mat-option>
    </mat-select>
</mat-form-field>
```

Send your desired filtered array using the [array]="variables" or [array]="['one', 'two', 'three']".
It now accepts an array objects thanks to Sen Alexandru.
To use an array of objects, specify the objects key value you want to filter using the [displayMember] input.
For example:

```ts
var variables = [
  {
    id: 0,
    name: 'test1'
  },
  {
    id: 0,
    name: 'test1'
  }
]
```

```angular17html
<mat-form-field>
    <mat-select>
        <mat-select-filter [array]="variables" [displayMember]="'name'" (filteredReturn)="filteredVariables = $event"></mat-select-filter>
        <mat-option *ngFor="let variable of filteredVariables">
            {{variable}}
        </mat-option>
    </mat-select>
</mat-form-field>
```
mat-select-filter now supports option group support thanks to jenniferarce! Just input the [hasGroup] boolean to true and add you [groupArrayName] string!

The (filteredReturn) method returns the filtered results after every keyboard action while searching...

The [noResultsMessage] is the string you would like to display when you filter no results.

The [showSpinner] allows you to turn off whether you would like to show a loading spinner while filtering.

The [filterDebounceTime] allows you to set the debounceTime value on a filter input. Default is 0.

The placeholder text for the search box is accessed by [placeholder]. Default is 'Search...';

```
<mat-select-filter [placeholder]="'Search..'" [array]="variables" (filteredReturn)="filteredVariables = $event"></mat-select-filter>
```

To focus the search input on every click, you can do something like this:

```angular17html
<mat-form-field>
    <mat-select #select [value]="selectedVariableName" placeholder="{{ placeholder }}">
        <mat-select-filter *ngIf="select.focused" [array]="variables" (filteredReturn)="filteredVariables = $event"></mat-select-filter>
        <mat-option *ngFor="let variable of filteredVariables">
            {{variable}}
        </mat-option>
    </mat-select>
</mat-form-field>
```

otherwise, it will only focus once.

To add a colored background, do something like this:

```angular17html
 <mat-select-filter [color]="'purple'" [array]="variables" (filteredReturn)="filteredVariables = $event"></mat-select-filter>
```

You can also change the classes from a global css/scss file in your project by adding:

```scss
.mat-filter {
  background-color: purple !important;
}

.mat-filter-input {
  border: 1px solid black !important
}
```
## Options

* [array]
* [color]
* [placeholder]
* [displayMember]
* [noResultsMessage]
* [showSpinner]
* [hasGroup]
* [groupArrayName]
* [showSpinner]
* [filterDebounceTime]
* (filteredReturn)

Hope you enjoy!
