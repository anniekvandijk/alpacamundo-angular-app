import { Injectable, inject } from '@angular/core';
import { MessageService } from '../features/messages/message.service';
import { Message, MessageType } from '../features/messages/message.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private messageService = inject(MessageService);

  public handleError(operation: string, error: HttpErrorResponse) : void {
  
    this.log(operation, error);
    this.addMessage(operation, error);
  }

  private log(operation: string, error: HttpErrorResponse) : void {
    console.log(operation, error.message);
  }

  private addMessage(operation: string, error: HttpErrorResponse) : void {

    let userMessage = 'Fout opgetreden: ';

    switch (error.status) {

      case 401:
        userMessage += 'Niet geautoriseerd (401)';
        break;

      case 403:
        userMessage += 'Geen permissies voor deze actie (403)';
        break;

      case 404:
        userMessage += 'Het gevraagde werd niet gevonden (404)';
        break;

      default: // Overige fouten
        userMessage += `Dit ging heel fout (${error.status})`;
        break;
    }
    
    const message: Message = {
      operation: operation,
      technicalMessage: error.message,
      userMessage,
      messageType: MessageType.Error
    };
    
    this.messageService.showMessage(message);
  }
}
