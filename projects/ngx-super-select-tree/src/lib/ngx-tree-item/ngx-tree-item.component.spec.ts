import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTreeItemComponent } from './ngx-tree-item.component';

describe('NgxTreeItemComponent', () => {
  let component: NgxTreeItemComponent;
  let fixture: ComponentFixture<NgxTreeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxTreeItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxTreeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
