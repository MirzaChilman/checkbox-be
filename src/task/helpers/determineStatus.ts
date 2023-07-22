import { differenceInDays } from 'date-fns';
import { Status } from '../types';

interface Props {
  currentDate: Date;
  dueDate: Date;
}

export const determineStatus = ({ currentDate, dueDate }: Props): Status => {
  const differenceDay = differenceInDays(dueDate, currentDate);

  let status;

  if (differenceDay < 0) {
    status = Status.Overdue;
  } else if (differenceDay < 7) {
    status = Status.DueSoon;
  } else {
    status = Status.NotUrgent;
  }

  return status;
};
