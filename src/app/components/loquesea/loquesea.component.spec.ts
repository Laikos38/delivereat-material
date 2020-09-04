import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoqueseaComponent } from './loquesea.component';

describe('LoqueseaComponent', () => {
  let component: LoqueseaComponent;
  let fixture: ComponentFixture<LoqueseaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoqueseaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoqueseaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
