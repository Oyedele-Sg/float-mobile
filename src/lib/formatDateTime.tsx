import moment from 'moment';

export const formatDateTime = (dateString: string): string => {
  const date = moment(dateString, 'YYYY-MM-DD HH:mm:ss');
  const now = moment();

  if (date.isSame(now, 'day')) {
    return `Today, ${date.format('h:mma')}`;
  }

  if (date.isSame(now.clone().subtract(1, 'day'), 'day')) {
    return `Yesterday, ${date.format('h:mma')}`;
  }

  return date.format('MMM D, YYYY [at] h:mma');
};