import { NgClass } from '@angular/common';
import { Component, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

function copyArray(value: any[]): any[] {
  return [...value];
};

@Component({
  selector: 'NgxSuperSelectTree',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './ngx-super-select-tree.component.html',
  styleUrls: [`./ngx-super-select-tree.component.scss`],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgxSuperSelectTreeComponent), multi: true }],
})
export class NgxSuperSelectTreeComponent implements ControlValueAccessor {
  private readonly id = new Date().getTime() * (Math.random() * 10);

  _onChange: any;
  _onTouched: any;
  isDisabled = false;

  writeValue(obj: any): void {
    this.selectedValues = obj
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  searchText = '';

  @Input({ required: true })
  dataSource: any[] = [];

  @Input({ required: true })
  valuePropertyName!: string;

  @Input({ required: true })
  displayPropertyName!: string;

  /**
   * the name of the foreign key
   */
  @Input({ required: true })
  parentIdPropertyName!: string;

  /**
   * the name of the principal key
   * if it is different than the value
   */
  @Input()
  parentIdReferenceKeyPropertyName?: string;

  @Input({ transform: copyArray })
  selectedValues: any[] = [];


  @Input()
  placeholder: string = 'select';

  @Input()
  enableDarkMode: boolean = false;

  @Output()
  selectedValuesChanged = new EventEmitter<any[]>();

  @HostListener('window:click', ['$event'])
  windowClicked(e: any) {
    this.isDropDownOpen = false;
    this.currentOpenParentItem = undefined;
    this.navigationStack = [];
  }


  isDropDownOpen = false;
  currentOpenParentItem?: any;

  toggleDropDown() {
    if (this.isDisabled) {
      this.isDropDownOpen = false;
      return;
    }
    this.isDropDownOpen = !this.isDropDownOpen;
  }

  getItems() {
    if (this.searchText.trim() === '') return this.getCurrentParentChildren();

    return this.dataSource.filter(x => {
      const v: string = x[this.displayPropertyName];
      return v.trim().toLowerCase().indexOf(this.searchText.trim().toLowerCase()) >= 0;
    });
  }

  getCurrentParentChildren() {
    const currentParentId = this.currentOpenParentItem ? this.currentOpenParentItem[this.parentIdReferenceKeyPropertyName || this.valuePropertyName] : undefined;

    const data = this.dataSource.filter(x => {
      return x[this.parentIdPropertyName] === currentParentId
    });

    return data;
  }

  hasChildren(item: any) {
    const hasChildren = this.dataSource.findIndex(x => {
      return x[this.parentIdPropertyName] === item[this.parentIdReferenceKeyPropertyName || this.valuePropertyName]
    }) >= 0;

    return hasChildren;
  }

  onCheckChanged(item: any) {
    this.checkChanged(item);

    if (this._onTouched) {
      this._onTouched();
    }

    this.raiseSelectedValuesChanged();
  }

  private raiseSelectedValuesChanged() {
    if (this._onChange) {
      this._onChange(this.selectedValues);
    }

    this.selectedValuesChanged.emit(this.selectedValues);
  }

  isChecked(item: any) {
    const value = item[this.valuePropertyName];

    const index = this.selectedValues.findIndex(x => x === value);

    return index >= 0;
  }

  getSelectedItems() {
    return this.dataSource.filter(x => this.isChecked(x));
  }

  getSelectedItemsDisplayPropertyValues() {
    return this.dataSource.filter(x => this.isChecked(x)).map(x => x[this.displayPropertyName]);
  }

  navigationStack: any[] = [];

  openItem(item: any) {
    this.searchText = '';

    if (this.currentOpenParentItem) {
      this.navigationStack.push(this.currentOpenParentItem)
    }
    this.currentOpenParentItem = item;
  }

  goBack() {
    if (this.currentOpenParentItem !== undefined) [
      this.currentOpenParentItem = this.navigationStack.pop()
    ]
  }

  selectVisibleItems() {
    const items = this.getItems();
    for (const element of items) {

      const value = element[this.valuePropertyName];
      const index = this.selectedValues.findIndex(x => x === value);
      if (index < 0) {
        this.selectedValues.push(value);
      }
    }

    this.raiseSelectedValuesChanged();

    if (this._onTouched) {
      this._onTouched();
    }
  }

  clearSelection() {
    while (this.selectedValues.length !== 0)
      this.selectedValues.pop();

    this.raiseSelectedValuesChanged();
  }

  private selectAllDescendents(item: any) {
    const currentParentId = item ? item[this.parentIdReferenceKeyPropertyName || this.valuePropertyName] : undefined;

    const data = this.dataSource.filter(x => {
      return x[this.parentIdPropertyName] === currentParentId
    });

    data.forEach(child => {
      this.checkChanged(child, false);
    });
  }

  private checkChanged(item: any, removeIfAlreadyAdded: boolean = true) {
    const value = item[this.valuePropertyName];

    const selectedValues = this.selectedValues;

    const index = selectedValues.findIndex(x => x === value);
    if (index >= 0) {
      if (removeIfAlreadyAdded) {
        selectedValues.splice(index, 1);
      }
    }
    else {
      selectedValues.push(value);
      this.selectAllDescendents(item);
    }
  }


  onSearchTextUpdated($event: Event) {
    console.log($event);

  }
}
