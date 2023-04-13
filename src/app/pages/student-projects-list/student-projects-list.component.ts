import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CardModel } from 'src/app/models/card.model';
import { CardDataService } from 'src/app/services/card-data.service';

@Component({
  selector: 'app-student-projects-list',
  templateUrl: './student-projects-list.component.html',
  styleUrls: ['./student-projects-list.component.scss']
})

export class StudentProjectsListComponent implements OnInit {

  constructor(
    private cardDataService: CardDataService,
    private viewportScroller: ViewportScroller
  ) {}

  // We use two instance of the projects data array. 
  // One immutable version (studentsProjects$) and one that can be a filtered version (displayedProjects$).
  studentsProjects$!: Observable<CardModel[]>
  displayedProjects$!: Observable<CardModel[]>

  ngOnInit(): void {
    this.studentsProjects$ = this.cardDataService.getCardData('/students')
    this.displayedProjects$ = this.studentsProjects$
    window.scrollTo(0,0)
  }

  // We store the filtered version of the studentsProjects$ array to displayedProjects$ regarding 
  // which class filter button the user clicked.
  onFilterProjects(classFilter:string): void {
    this.displayedProjects$ = this.cardDataService.getCardData('/students').pipe(
        map((data) => data.filter(e => e.class === classFilter || e.class === classFilter.slice(0,1)))
      )
  }

  // We retrieve the latest data available when the users unfilters.
  onUnfilterProjects(): void {
    this.displayedProjects$ = this.cardDataService.getCardData('/students')
  }

  scrollToAnchor(anchor: string): void {
    this.viewportScroller.scrollToAnchor(anchor);
  }

  // onPostDeleted is triggered when one of StudentProjectsListComponent's children emits 'cardDeleted'
  // It then removes the deleted card from its displayedCourses$ to remove it from the DOM.
  onPostDeleted(postId: string): void {
    this.displayedProjects$ = this.displayedProjects$.pipe(
      map(projects => projects.filter(project => project.id !== postId))
    );
  }

}
