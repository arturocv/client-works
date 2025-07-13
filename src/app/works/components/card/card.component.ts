import { Component, OnInit, Input } from '@angular/core';
import { Work } from '../../interfaces/work.interface';

@Component({
  selector: 'work-card',
  standalone: false,
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit{
  @Input()
  public work!: Work;

  ngOnInit(): void {
    if ( !this.work ) throw Error('Hero property is required');
  }

}
