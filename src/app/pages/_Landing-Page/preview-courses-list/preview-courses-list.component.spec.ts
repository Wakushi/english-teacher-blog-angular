import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCoursesListComponent } from './preview-courses-list.component';

describe('PreviewCoursesListComponent', () => {
  let component: PreviewCoursesListComponent;
  let fixture: ComponentFixture<PreviewCoursesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewCoursesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewCoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
