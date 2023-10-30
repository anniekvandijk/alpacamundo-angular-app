import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Infopage } from 'src/app/models/infopage';
import { HttpStatusService } from 'src/app/services/http-status.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-infopage-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './infopage-card.component.html',
  styleUrls: ['./infopage-card.component.scss']
})
export class InfopageCardComponent {
  @Input() infopage!: Infopage;

  constructor(
    private navigationService: NavigationService
  ) { }

  public navigateToDetails(infopage: Infopage) {
    this.navigationService.goToInfoPageDetails(infopage);
  }
}
