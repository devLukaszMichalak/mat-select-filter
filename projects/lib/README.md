# mat-select-filter

> **Note:** This is a fork of the original library that maintains compatibility with the latest Angular versions.
> The versioning follows Angular's versioning scheme (e.g., use library version 13.x.x for Angular 13.x.x projects).
> - Repository: [https://github.com/devLukaszMichalak/mat-select-filter](https://github.com/devLukaszMichalak/mat-select-filter)
> - Original repository: [https://github.com/mdlivingston/mat-select-filter](https://github.com/mdlivingston/mat-select-filter)

A filter component for Angular Material `<mat-select>` drop-downs.
Supports filtering arrays of strings or objects, option groups, and is compatible with both NgModule and standalone
component usage.

---

## Demo

[StackBlitz Demo](https://stackblitz.com/edit/mat-select-filter)

---

## Installation

```sh
npm install @devlukaszmichalak/mat-select-filter
```

---

## Usage

### NgModule

In module-based app import the MatSelectFilterModule

```ts
import {MatSelectFilterModule} from '@devlukaszmichalak/mat-select-filter';

@NgModule({
    ...
        imports:
[
    ...
        MatSelectFilterModule
],
...
})

export class AppModule {
}
```

### Standalone Component (since library version 17.1.0)

In standalone components import the MatSelectFilterComponent in the component's 'imports' array

```ts
import {MatSelectFilterComponent} from '@devlukaszmichalak/mat-select-filter';

@Component({
    ...
        standalone:
true,
    imports
:
[
    ...
        MatSelectFilterComponent,
    ...
],
...
})

export class Component {
```

---

## Basic Example

```angular2html

<mat-form-field>
    <mat-select>
        <mat-select-filter [array]="variables" (filteredReturn)="filteredVariables = $event"></mat-select-filter>
        <mat-option *ngFor="let variable of filteredVariables">
            {{ variable }}
        </mat-option>
    </mat-select>
</mat-form-field>
```

or using new control flow syntax

```angular181html

<mat-form-field>
    <mat-select>
        <mat-select-filter [array]="variables" (filteredReturn)="filteredVariables = $event"></mat-select-filter>
        @for (variable of filteredVariables; track variable) {
            <mat-option>
                {{ variable }}
            </mat-option>
        }
    </mat-select>
</mat-form-field>
```

---

## Filtering Objects

Bind a filtered array with `[array]` .
It now accepts an array objects thanks to Sen Alexandru.
If your array contains objects, specify the property to filter with `[displayMember]`:

```ts
variables = [
    {id: 1, name: 'Alpha'},
    {id: 2, name: 'Beta'}
];
```

```angular181html
<mat-form-field>
    <mat-select>
        <mat-select-filter [array]="variables"
                           [displayMember]="'name'"
                           (filteredReturn)="filteredVariables = $event"></mat-select-filter>
        @for (variable of filteredVariables; track variable) {
            <mat-option>
                {{ variable }}
            </mat-option>
        }
    </mat-select>
</mat-form-field>
```

## Option Groups

mat-select-filter now supports option group support thanks to jenniferarce! Just input the [hasGroup] boolean to true and add you [groupArrayName] string!

To filter grouped options, use additionally `[hasGroup]` and `[groupArrayName]`:

```angular181html
<mat-select-filter
        [array]="groups"
        [hasGroup]="true"
        [groupArrayName]="'options'"
        [displayMember]="'name'"
        (filteredReturn)="filteredGroups = $event">
</mat-select-filter>
```

---

## Inputs

| Input                | Type    | Default      | Description                                               |
|----------------------|---------|--------------|-----------------------------------------------------------|
| `array`              | any[]   | —            | Array to filter (required).                               |
| `placeholder`        | string  | 'Search...'  | Placeholder text for the search input.                    |
| `color`              | string  | 'white'      | Background color for the filter bar.                      |
| `displayMember`      | string  | —            | Property name to filter/display (for array of objects).   |
| `showSpinner`        | boolean | true         | Show a spinner while filtering.                           |
| `noResultsMessage`   | string  | 'No results' | Message to display when no results are found.             |
| `hasGroup`           | any     | —            | Enable option group filtering (set to truthy value).      |
| `groupArrayName`     | string  | —            | Property name for the group array (used with `hasGroup`). |
| `filterDebounceTime` | number  | 0            | Debounce time (ms) for the filter input.                  |

---

## Output

| Output           | Description                                        |
|------------------|----------------------------------------------------|
| `filteredReturn` | Emits the filtered array after each filter action. |

---

## Features

- Works with arrays of strings or objects
- Option group support
- Customizable placeholder, color, spinner, and no-results message
- Debounced filtering
- Focuses the input on open
- Prevents propagation of alphanumeric key events to avoid selection issues

---

## Custom Styling

You can override styles using the following CSS classes in a global css/scss file:

```scss
.mat-filter {
  // Styles the filter bar
}

.mat-filter-input {
  // Styles the input field
}

.spinner {
  // Styles the spinner
}

.no-results-message {
  // Styles the no-results message
}
```

Example:

```scss
.mat-filter {
  background-color: purple !important;
}

.mat-filter-input {
  border: 1px solid black !important;
}
```

## License

MIT
