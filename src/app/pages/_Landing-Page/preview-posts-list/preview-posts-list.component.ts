import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardModel } from 'src/app/models/card.model';
import { CardDataService } from 'src/app/services/card-data.service';

@Component({
  selector: 'app-preview-posts-list',
  templateUrl: './preview-posts-list.component.html',
  styleUrls: ['./preview-posts-list.component.scss']
})
export class PreviewPostsListComponent implements OnInit {

  constructor(private cardDataService: CardDataService) {}

  teacherPosts$!:Observable<CardModel[]>

  ngOnInit(): void {
    this.teacherPosts$ = this.cardDataService.getCardData('/posts')
  }

}

