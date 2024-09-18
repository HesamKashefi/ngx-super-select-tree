# NgxSuperSelectTree

This is a single/multiple choice drop down tree for Angular!

---
### [Live Demo on Stackblitz](https://stackblitz.com/edit/ngxsuperselecttree-demo)

---
## Features

* Multiple Selection Mode
* Angular Forms Support
* Dark Theme And Light Theme Support


## Build Status

|  Build |  NPM Publish  |
|:---:|:---:|
| [![Build](https://github.com/HesamKashefi/ngx-super-select-tree/actions/workflows/build.yml/badge.svg)](https://github.com/HesamKashefi/ngx-super-select-tree/actions/workflows/build.yml) | [![publish-npm-package](https://github.com/HesamKashefi/ngx-super-select-tree/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/HesamKashefi/ngx-super-select-tree/actions/workflows/npm-publish.yml) |


## Install

```
> npm i ngx-super-select-tree
```

## Add Imports

Import `NgxSuperSelectTreeComponent` like this:

```

  imports: [
    NgxSuperSelectTreeComponent
  ]

```

## Usage

You can use it as simple as this:
```
<form [formGroup]="form">
    <NgxSuperSelectTree formControlName="selectedValues"
                        [dataSource]="dataSource"
                        [displayPropertyName]="'name'"
                        [valuePropertyName]="'id'"
                        [parentIdPropertyName]="'parentId'"
                        (selectedValuesChanged)="onSelectedValuesChanged($event)">

    </NgxSuperSelectTree>
</form>
```

in the .ts file:

```

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

```