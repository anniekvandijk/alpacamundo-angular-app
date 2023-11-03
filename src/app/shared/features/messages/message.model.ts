export interface Message {
    operation: string;
    technicalMessage: string | null;
    userMessage: string | null;
    messageType: MessageType;
}

export enum MessageType {
    Error = 'error',
    Warning = 'warning',
    Info = 'info',
    Success = 'success'
}