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

    let userMessage: string;

    switch (error.status) {
      case 400:
        userMessage = 'The request was invalid. Please try again.';
        break;

      case 401:
        userMessage = 'You are not authorized';
        break;

      case 403:
        userMessage = 'You do not have the rights to perform this action.';
        break;

      case 404:
        userMessage = 'The requested resource was not found.';
        break;

      default: // 500
        userMessage = 'An error occurred. Please try again later.';
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
