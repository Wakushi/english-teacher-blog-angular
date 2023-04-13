import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPostsListComponent } from './preview-posts-list.component';

describe('PreviewPostsListComponent', () => {
  let component: PreviewPostsListComponent;
  let fixture: ComponentFixture<PreviewPostsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewPostsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
