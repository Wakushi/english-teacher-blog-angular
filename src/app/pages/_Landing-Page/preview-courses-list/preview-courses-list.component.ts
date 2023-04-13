import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardModel } from 'src/app/models/card.model';
import { CardDataService } from 'src/app/services/card-data.service';

@Component({
  selector: 'app-preview-courses-list',
  templateUrl: './preview-courses-list.component.html',
  styleUrls: ['./preview-courses-list.component.scss']
})
export class PreviewCoursesListComponent implements OnInit {

  constructor(private cardDataService: CardDataService) {}

  courses$!:Observable<CardModel[]>

  ngOnInit(): void {
    this.courses$ = this.cardDataService.getCardData('/courses')
  }

}
