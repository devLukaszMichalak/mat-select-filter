import {Component, DestroyRef, ElementRef, inject, input, OnInit, output, signal, viewChild} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, finalize, fromEvent, map, merge, takeUntil, tap, throttleTime, timer} from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'mat-select-filter',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatInputModule
    ],
    templateUrl: './mat-select-filter.component.html',
    styleUrls: ['./mat-select-filter.component.scss']
})
export class MatSelectFilterComponent<T = any> implements OnInit {

    #fb = inject(FormBuilder);
    #destroyRef = inject(DestroyRef);

    readonly input = viewChild<ElementRef<HTMLInputElement>>('input');

    readonly array = input.required<T[]>();
    readonly placeholder = input<string>('Search...');
    readonly color = input<string>('white');
    readonly displayMember = input<string>();
    readonly showSpinner = input(true);
    readonly noResultsMessage = input('No results');
    readonly hasGroup = input<string>();
    readonly groupArrayName = input<string>();
    readonly filterDebounceTime = input(0);

    readonly filteredReturn = output<T[]>();

    readonly noResults = signal(false);
    readonly localSpinner = signal(false);

    #shouldFocus = signal(true);

    filteredItems: T[] = [];

    searchForm = this.#fb.group({
        filterValue: ''
    });

    ngOnInit(): void {
        // since the component is not destroyed, we want to reset the filter
        // when no options would show and mat-select-filter is not visible
        // this also sets item to be focused on the next time it will be opened
        merge(
            fromEvent(document, 'scroll'),
            fromEvent(document, 'keyup'),
            fromEvent(document, 'mousemove'),
            fromEvent(document, 'click')
        ).pipe(
            throttleTime(100),
            takeUntilDestroyed(this.#destroyRef),
        ).subscribe(() => {
            const filters = document.querySelectorAll('mat-select-filter');
            if (filters.length === 0) {
                this.#shouldFocus.set(true)

                if (this.filteredItems.length === 0) {
                    this.searchForm.controls.filterValue.setValue('')
                    this.filteredReturn.emit(this.array())
                }
            }

            if (filters.length > 0 && this.#shouldFocus()) {
                this.input()?.nativeElement.focus()
                this.#shouldFocus.set(false)
            }
        })

        this.searchForm.valueChanges
            .pipe(
                debounceTime(this.filterDebounceTime()),
                tap(() => this.localSpinner.set(true)),
                map(changes => changes.filterValue?.toLowerCase()),
                takeUntilDestroyed(this.#destroyRef),
                finalize(() => this.filteredReturn.emit(this.array())),
            )
            .subscribe(userInputLowerCase => {

                if (userInputLowerCase) {
                    this.#filterArray(userInputLowerCase);

                    // NO RESULTS VALIDATION
                    this.noResults.set(!this.filteredItems == null || this.filteredItems.length === 0);

                } else {
                    this.filteredItems = this.array().slice();
                    this.noResults.set(false);
                }

                this.filteredReturn.emit(this.filteredItems);
                timer(2000)
                    .pipe(takeUntil(this.searchForm.valueChanges))
                    .subscribe(() => this.localSpinner.set(false))
            });
    }

    #filterArray(userInputLowerCase: string): void {
        // IF THE DISPLAY MEMBER INPUT IS SET, WE CHECK THE SPECIFIC PROPERTY
        if (!this.displayMember()) {
            this.filteredItems = this.array().filter((name: any) => name.toLowerCase().includes(userInputLowerCase));
            return;
        }

        if (this.hasGroup() && this.groupArrayName() && this.displayMember()) {
            this.filteredItems = this.array()
                .map((element: any) => {
                    const objCopy = {...element};
                    objCopy[this.groupArrayName()!] = objCopy[this.groupArrayName()!]
                        .filter((groupItem: any) => groupItem[this.displayMember()!].toLowerCase().includes(userInputLowerCase));
                    return objCopy;
                })
                .filter((element: any) => element[this.groupArrayName()!].length > 0);
            return;
        }

        // OTHERWISE, WE CHECK THE ENTIRE STRING
        this.filteredItems = this.array().filter((item: any) => item[this.displayMember()!].toLowerCase().includes(userInputLowerCase));
    }

    handleKeydown(event: KeyboardEvent): void {
        // PREVENT PROPAGATION FOR ALL ALPHANUMERIC CHARACTERS TO AVOID SELECTION ISSUES
        if (this.#isAlphanumeric(event)) {
            event.stopPropagation();
        }
    }

    #isAlphanumeric(event: KeyboardEvent): boolean {
        const key = event.key;
        return !!key && key.length === 1 && /^[a-zA-Z0-9 ]$/.test(key);
    };
}
