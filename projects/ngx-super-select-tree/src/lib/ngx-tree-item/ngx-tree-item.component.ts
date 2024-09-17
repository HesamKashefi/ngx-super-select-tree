import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-ngx-tree-item',
  standalone: true,
  imports: [],
  templateUrl: './ngx-tree-item.component.html',
  styleUrl: './ngx-tree-item.component.scss'
})
export class NgxTreeItemComponent {

  @Input()
  valuePropertyName?: string;

  @Input()
  displayPropertyName?: string;
}
