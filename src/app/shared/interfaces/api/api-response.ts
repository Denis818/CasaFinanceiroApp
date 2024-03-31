import { NotificationResponse } from './notification-response';

export interface ApiResponse<T> {
  dados: T;
  mensagens: NotificationResponse[];
}
