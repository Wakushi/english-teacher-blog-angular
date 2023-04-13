import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataBaseObject } from 'src/app/interfaces/database-object.interface';
import { CardModel } from 'src/app/models/card.model';
import { CardDataService } from 'src/app/services/card-data.service';

@Component({
  selector: 'app-preview-projects-list',
  templateUrl: './preview-projects-list.component.html',
  styleUrls: ['./preview-projects-list.component.scss']
})
export class PreviewProjectsListComponent implements OnInit {

  constructor(private cardDataService: CardDataService){}

  studentsProjects$!: Observable<CardModel[]>

  ngOnInit(): void {
   this.studentsProjects$ = this.cardDataService.getCardData('/students')
  }

}
