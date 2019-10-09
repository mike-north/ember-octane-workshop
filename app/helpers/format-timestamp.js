import { helper } from '@ember/component/helper';
import { dateToString } from '../utils/date';

export default helper(function formatTimestamp(params /*, hash*/) {
  return dateToString(params[0]);
});
