export function formatDate(date, start = 0){
  // changes:
  //    2018-03-25T12:00:00Z
  // to:
  //    2018/03/25 from 12:00
  let year = date.slice(0,4);
  let month = date.slice(5,7);
  let day = date.slice(8,10);
  let hour = date.slice(11,16);
  // let word = " at ";
  // if (start == 1) word = " from ";
  // else if (start == 2) word = " untill ";

  //TODO commented because we don't need info about hour as far as I see
    let formattedDate = year + "/" + month + "/" + day; // + word + hour;

  return(formattedDate)
}

function daysBetween(startDate, endDate){
  let oneDay=1000*60*60*24;
  let timeDifference = endDate - startDate;
  return Math.round((timeDifference / oneDay)+ 0.5);
}

export function timeUntil(dateString){
  let today = new Date();
  let futureDate = Date.parse(dateString);

  return daysBetween(today,futureDate);
}
