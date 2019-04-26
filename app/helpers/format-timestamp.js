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

function padLeadingZeroes(val, digits) {
  let valString = `${val}`;
  while (valString.length < digits) valString = 0 + valString;
  return valString;
}

function dateToString(date) {
  const d = new Date(date);
  const ampm = d.getHours() > 12 ? 'PM' : 'AM';
  return `${
    MONTH_NAMES[d.getMonth()]
  } ${d.getDate()}, ${d.getFullYear()} ${padLeadingZeroes(
    d.getHours() % 12,
    2
  )}:${padLeadingZeroes(d.getMinutes(), 2)}.${padLeadingZeroes(
    d.getSeconds(),
    2
  )} ${ampm}`;
}

export default helper(function formatTimestamp([date]) {
  if (typeof date === 'undefined') return '(unknown)';
  return dateToString(date);
});
