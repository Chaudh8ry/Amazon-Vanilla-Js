import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
let today = dayjs();

function isWeekend(date){
  let dayOfWeek = date.format('d');
  return dayOfWeek == '0' || dayOfWeek == '6';
};

console.log(isWeekend(today));