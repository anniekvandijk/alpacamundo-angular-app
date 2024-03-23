import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [
    MatButtonModule,
  ],
  templateUrl: './technical-page.component.html',
})
export class TechnicalPageComponent implements OnInit{

  private errorService = inject(ErrorService);

  public technicalMessage: string | null = null;

  public messageHistory: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.technicalMessage = params['message'];
    });
    this.messageHistory = this.errorService.errorArray
  }

  public clearErrorHistory() {
    this.errorService.clearErrors();
    this.technicalMessage = null;
    this.messageHistory = this.errorService.errorArray;
  }
}
