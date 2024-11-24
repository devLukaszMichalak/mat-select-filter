import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  
  variables: string[] = ['volvo', 'saab', 'mercedes', 'audi'];
  filteredVariables: string[] = this.variables;
  
  picked: any;
}
