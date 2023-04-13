import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { Observable, map } from 'rxjs';
import { CardDataService } from 'src/app/services/card-data.service';

@Component({
  selector: 'app-teacher-posts-list',
  templateUrl: './teacher-posts-list.component.html',
  styleUrls: ['./teacher-posts-list.component.scss']
})
export class TeacherPostsListComponent implements OnInit {

  constructor(
    private cardDataService: CardDataService,
    private viewportScroller: ViewportScroller
  ) {}

  // We use two instance of the teacherPosts data array. 
  // One immutable version (teacherPosts$) and one that can be a filtered version (displayedPosts$).
  teacherPosts$!: Observable<CardModel[]>
  displayedPosts$!:Observable<CardModel[]>

  ngOnInit(): void {
    this.teacherPosts$ = this.cardDataService.getCardData('/posts')
    this.displayedPosts$ = this.teacherPosts$
    window.scrollTo(0,0)
  }

  // We store the filtered version of the courses$ array to displayedPosts$ regarding 
  // which class filter button the user clicked.
  onFilterProjects(classFilter:string):void {
    this.displayedPosts$ = this.cardDataService.getCardData('/posts').pipe(
      map((data) => data.filter(e => e.class === classFilter || e.class === classFilter.slice(0,1)))
      )
  }

  // We retrieve the latest data available when the users unfilters.
  onUnfilterProjects():void {
    this.displayedPosts$ = this.cardDataService.getCardData('/posts')
  }

  scrollToAnchor(anchor: string): void {
    this.viewportScroller.scrollToAnchor(anchor);
  }

  // onPostDeleted is triggered when one of TeacherPostsListComponent's children emits 'cardDeleted'
  // It then removes the deleted card from its displayedPosts$ to remove it from the DOM.
  onPostDeleted(postId: string): void {
    this.displayedPosts$ = this.displayedPosts$.pipe(
      map(posts => posts.filter(post => post.id !== postId))
    );
  }

}
