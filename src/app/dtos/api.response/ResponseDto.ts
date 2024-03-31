import { NotificationDto } from './NotificationDto';

export interface ResponseDto<T> {
  dados: T;
  mensagens: NotificationDto[];
}
