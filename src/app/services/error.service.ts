import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Message, MessageType } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private messageService: MessageService) { }

    /**
  * Handle Http operation that failed.
  * Let the app continue.
  *
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
    handleError(operation: string, error: any) {
   
      const message: Message = {
        operation: operation,
        technicalMessage: error.message,
        userMessage: 'An error occurred. Please try again later.',
        messageType: MessageType.Error
      };

      this.messageService.add(message);
    };
  }

