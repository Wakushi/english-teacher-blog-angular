import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewProjectsListComponent } from './preview-projects-list.component';

describe('PreviewProjectsListComponent', () => {
  let component: PreviewProjectsListComponent;
  let fixture: ComponentFixture<PreviewProjectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewProjectsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
