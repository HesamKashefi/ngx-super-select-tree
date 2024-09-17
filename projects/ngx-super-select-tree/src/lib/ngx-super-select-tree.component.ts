import { Component, EventEmitter, forwardRef, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'NgxSuperSelectTree',
  standalone: true,
  imports: [],
  templateUrl: './ngx-super-select-tree.component.html',
  styleUrls: [`./ngx-super-select-tree.component.scss`],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgxSuperSelectTreeComponent), multi: true }],
})
export class NgxSuperSelectTreeComponent implements ControlValueAccessor {
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

  @Input()
  selectedValues: any[] = [];

  @Input()
  placeholder: string = 'select';

  @Output()
  selectedValuesChanged = new EventEmitter<any[]>();

  @HostListener('window:click', ['$event'])
  windowClicked(e: any) {
    this.isDropDownOpen = false;
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
    this._onTouched();

    this.selectedValuesChanged.emit(this.selectedValues);
    this._onChange(this.selectedValues);
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
}
