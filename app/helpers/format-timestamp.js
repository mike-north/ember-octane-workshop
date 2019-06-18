import { helper } from '@ember/component/helper';
import { dateToString } from 'shlack/utils/date';

export default helper(function formatTimestamp(params /*, hash*/) {
  if (params.length === 0) return '(unknown)';
  return dateToString(params[0]);
});
