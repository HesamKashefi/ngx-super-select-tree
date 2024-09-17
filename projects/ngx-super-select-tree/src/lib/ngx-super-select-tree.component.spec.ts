import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSuperSelectTreeComponent } from './ngx-super-select-tree.component';

describe('NgxSuperSelectTreeComponent', () => {
  let component: NgxSuperSelectTreeComponent;
  let fixture: ComponentFixture<NgxSuperSelectTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSuperSelectTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxSuperSelectTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
