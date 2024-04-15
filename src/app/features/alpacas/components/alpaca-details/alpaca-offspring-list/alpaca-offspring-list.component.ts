import { Component, Input } from '@angular/core';
import { Alpaca } from '../../../models/alpaca.model';
import { AlpacaOffspringCardComponent } from './alpaca-offspring-card/alpaca-offspring-card.component';

@Component({
  selector: 'app-alpaca-offspring-list',
  standalone: true,
  imports: [
    AlpacaOffspringCardComponent
  ],
  templateUrl: './alpaca-offspring-list.component.html',
})
export class AlpacaOffspringListComponent{
  @Input() set alpaca (alpaca: Alpaca) {
    this.offsprings = []; 
      alpaca.offspring.sort((a, b) => new Date(b.dateOfBirth).getFullYear() - new Date(a.dateOfBirth).getFullYear())
      this.offsprings = alpaca.offspring;
  }

  offsprings: Alpaca[] = [];
}

