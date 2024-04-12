import { Injectable } from '@angular/core';
import { Message, MessageType } from './message.model';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

function getToastProperties(messageType: MessageType) {
  switch (messageType) {
    case MessageType.Error:
      return { panelClass: 'error-snackbar' };
    case MessageType.Info:
      return { panelClass: 'info-snackbar'};            
    case MessageType.Success:
      return { panelClass: 'success-snackbar'};
    case MessageType.Warning:
      return { panelClass: 'warning-snackbar'};
    default:
      return { panelClass: 'default-snackbar' };
  }
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  public showMessage(message: Message) : MatSnackBarRef<SimpleSnackBar>  {
    const { panelClass } = getToastProperties(message.messageType);

    const actionButton =  message.actionButtonText ? message.actionButtonText : '';

    // Side-effect: showing the toast
    return this.snackBar.open(`${message.userMessage}`, actionButton, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: [panelClass]
    });
  }

  public showSuccessMessage(operation: string, userMessage: string) {
    this.showMessage({
      operation,
      technicalMessage: null,
      userMessage,
      messageType: MessageType.Success
    });
  }
}
