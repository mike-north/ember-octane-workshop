import { helper } from '@ember/component/helper';

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export default helper(function formatTimestamp([iso8601Date]) {
  const d = new Date(iso8601Date);
  const ampm = d.getHours() > 12 ? 'AM' : 'PM';
  return `${
    MONTH_NAMES[d.getMonth()]
  } ${d.getDate()}, ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}.${d.getSeconds()} ${ampm}`;
});
