import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { Observable, map } from 'rxjs';
import { CardDataService } from 'src/app/services/card-data.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  constructor(
    private cardDataService: CardDataService,
    private viewportScroller: ViewportScroller
  ) {}

  // We use two instance of the courses data array. 
  // One immutable version (courses$) and one that can be a filtered version (displayedCourses$).
  courses$!: Observable<CardModel[]>
  displayedCourses$!:Observable<CardModel[]>

  ngOnInit(): void {
    this.courses$ = this.cardDataService.getCardData('/courses')
    this.displayedCourses$ = this.courses$
    window.scrollTo(0,0)
  }

  // We store the filtered version of the courses$ array to displayedCourses$ regarding 
  // which class filter button the user clicked.
  onFilterProjects(classFilter:string):void {
    this.displayedCourses$ = this.cardDataService.getCardData('/courses').pipe(
      map((data) => data.filter(e => e.class === classFilter || e.class === classFilter.slice(0,1)))
    )
  }

  // We retrieve the latest data available when the users unfilters.
  onUnfilterProjects():void {
    this.displayedCourses$ = this.cardDataService.getCardData('/courses')
  }

  scrollToAnchor(anchor: string): void {
    this.viewportScroller.scrollToAnchor(anchor);
  }

  // onCourseDeleted is triggered when one of CourseListComponent's children emits 'cardDeleted'
  // It then removes the deleted card from its displayedCourses$ to remove it from the DOM.
  onCourseDeleted(courseId: string): void {
    this.displayedCourses$ = this.displayedCourses$.pipe(
      map(courses => courses.filter(course => course.id !== courseId))
    );
  }

}

