import { Component, Input } from '@angular/core';
import { NgxTreeItemComponent } from './ngx-tree-item/ngx-tree-item.component';

@Component({
  selector: 'NgxSuperSelectTree',
  standalone: true,
  imports: [
    NgxTreeItemComponent
  ],
  templateUrl: './ngx-super-select-tree.component.html',
  styleUrls: [`./ngx-super-select-tree.component.scss`]
})
export class NgxSuperSelectTreeComponent {

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

  currentOpenParentItem?: any;

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
    const value = item[this.valuePropertyName];

    const index = this.selectedValues.findIndex(x => x === value);
    if (index >= 0) {
      this.selectedValues.splice(index, 1);
    }
    else {
      this.selectedValues.push(value);
    }
  }

  isChecked(item: any) {
    const value = item[this.valuePropertyName];

    const index = this.selectedValues.findIndex(x => x === value);

    return index >= 0;
  }

}
