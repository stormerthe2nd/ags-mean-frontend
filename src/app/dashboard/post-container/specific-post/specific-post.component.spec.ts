import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificPostComponent } from './specific-post.component';

describe('SpecificPostComponent', () => {
  let component: SpecificPostComponent;
  let fixture: ComponentFixture<SpecificPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
