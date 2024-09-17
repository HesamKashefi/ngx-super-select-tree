import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSuperSelectTreeComponent } from '../../../ngx-super-select-tree/src/public-api';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface DataItem { id: number, name: string, parentId?: number };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,

    RouterOutlet,
    NgxSuperSelectTreeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  form = new FormGroup({
    selectedValues: new FormControl([2])
  });


  dataSource: DataItem[] = [
    { id: 1, name: 'one' },

    { id: 2, name: 'two' },

    { id: 3, name: 'one - first', parentId: 1 },
    { id: 4, name: 'one - second', parentId: 1 },
    { id: 5, name: 'one - second - first', parentId: 4 },

    { id: 6, name: 'Three' },
  ];

  onSelectedValuesChanged(selectedValues: any[]) {
    console.log(selectedValues);
    console.log(this.form.value);

  }
}
