import { Component, Input, OnInit, inject } from '@angular/core';
import { Alpaca } from 'src/app/features/alpacas/models/alpaca.model';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alpaca-offspring-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './alpaca-offspring-card.component.html',
  styleUrls: ['./alpaca-offspring-card.component.scss']
})
export class AlpacaOffspringCardComponent implements OnInit {
  @Input() alpaca!: Alpaca;
  private router = inject(Router);
  public alpacaMainImageUrl!: string;

  ngOnInit(): void {
    this.alpacaMainImageUrl = environment.storageUrls.alpacaMainImageUrl;
  }

  public navigateToDetails(alpaca: Alpaca) {
    this.router.navigate(['/alpacas/detail', alpaca.id]);
  }
}
