import { Component, OnInit } from '@angular/core';
import { WorksService } from '../../services/works.service';
import { Work } from '../../interfaces/work.interface';

@Component({
  selector: 'app-list-page',
  standalone: false,
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {
  public works: Work[] = [];

  constructor( private worksService: WorksService){}

  ngOnInit(): void {
    this.worksService.getWorks()
        .subscribe( works => this.works = works

         );
  }
}
