import { helper } from '@ember/component/helper';
import { dateToString } from 'shlack/utils/date';

export default helper(function formatTimestamp([date]) {
  const str = dateToString(date);
  return str || '(unknown)';
});
