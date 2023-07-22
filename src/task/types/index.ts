import { registerEnumType } from '@nestjs/graphql';

export enum Status {
  NotUrgent = 'NotUrgent',
  DueSoon = 'DueSoon',
  Overdue = 'Overdue',
}

registerEnumType(Status, {
  name: 'status', // Name of the GraphQL enum type
});
