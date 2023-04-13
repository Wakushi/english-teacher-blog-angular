import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProjectsListComponent } from './student-projects-list.component';

describe('StudentProjectsListComponent', () => {
  let component: StudentProjectsListComponent;
  let fixture: ComponentFixture<StudentProjectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentProjectsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
