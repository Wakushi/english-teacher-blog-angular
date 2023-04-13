import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPostsListComponent } from './teacher-posts-list.component';

describe('TeacherPostsListComponent', () => {
  let component: TeacherPostsListComponent;
  let fixture: ComponentFixture<TeacherPostsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherPostsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
