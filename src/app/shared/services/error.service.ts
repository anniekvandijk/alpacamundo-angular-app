import { Injectable, inject } from '@angular/core';
import { MessageService } from '../components/messages/message.service';
import { Message, MessageType } from '../components/messages/message.model';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { DateUtilitiesService } from './date-utilities.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private messageService = inject(MessageService);
  private dateUtilitiesService = inject(DateUtilitiesService);
  private router = inject(Router);

  errorArray: string[] = [];

  clearErrors() {
    this.errorArray = [];
  }

  handleError(operation: string, error: HttpErrorResponse) : void {
  
    this.log(operation, error);
    this.addMessage(operation, error);
  }

  private log(operation: string, error: HttpErrorResponse) : void {
    console.log(operation, error.message);
  }

  private addMessage(operation: string, error: HttpErrorResponse) : void {

    let userMessage = 'Fout opgetreden: ';

    switch (error.status) {

      case 400:
        userMessage += 'De verstuurde data is incorrect';
        break;

      case 401:
        userMessage += 'Niet geautoriseerd';
        break;

      case 403:
        userMessage += 'Geen permissies voor deze actie';
        break;

      case 404:
        userMessage += 'Het gevraagde werd niet gevonden';
        break;

      case 422:
        userMessage += 'De verstuurde data kan niet verwerkt worden';
        break;  

      default: // Overige fouten
        userMessage += `Er ging iets onverwachts mis`;
        break;
    }
    
    const timestamp = this.dateUtilitiesService.getCurrentTimestamp();

    const technicalMessage = `${timestamp} -- ${error.status}: ${error.error}. ${error.message}`

    const message: Message = {
      operation: operation,
      technicalMessage,
      userMessage,
      messageType: MessageType.Error,
      actionButtonText: environment.production ? '' : 'Technische info'
    };

    this.errorArray.push(technicalMessage);
    if (this.errorArray.length > 10) {
      this.errorArray.shift();
    }
    
    const ref = this.messageService.showMessage(message)
    ref.onAction().subscribe(() => {
      this.router.navigate(['/admin/technicalpage'], { queryParams: { message: technicalMessage } })
    });
  }
}
