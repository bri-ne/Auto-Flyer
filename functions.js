//== populating events ==//
/* this script pull a json file from github repo and populates the */
/* template 
  <div class="container">
    <div class="eventdate">
      <div class="date-day">26</div>
      <div class="date-mo">aug</div>
    </div>
    <div class="calevent">
      <div class="event-title">Event Title 1</div>
      <div class="event-time">6:30 pm - 8:30 pm</div>
      <div class="event-location">Event Location, Event Address</div>
      <div class="event-link">RSVP at phillysocialists.org</div>
    </div>
  </div>

*/


//== Packages==//
//import * as core from "@actions/core";
//import * as github from "@actions/github";
//import { Octokit } from "octokit";

//== Getting Data ==//
function getEvents() {
  fetch("output.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    caldata = data.items;
    //showEvents(data,dEntered);
    console.log('showeventscalled');

  })
}
getEvents();
//== Variables ==//
const subtitle = document.querySelector(".subtitle")
let caldata
var subMo = [];




//== Funcations ==//
function addEvent(edate, mo, etitle, etime, elocation, elink) {
  var div_content = document.createElement('div');
  var h_edate = `<div class="eventdate"><div class="date-day">${edate}</div><div class="date-mo">${mo}</div></div>`
  var h_etitle = `<div class="event-title">${etitle}</div>`
  var h_etime = `<div class="event-time">${etime}</div>`
  var h_elocation = `<div class="event-location">${elocation}</div>`
  //var h_elink = `<div class="event-link">${elink}</div></div>`
  div.className = 'container';
  div.innerHTML = h_edate + '<div class="calevent">' + h_etitle + h_etime + h_elocation + /*h_elink +*/ '</div>';
  document.getElementById("calcontent").appendChild(div_content);
}

function showEvents(d) {
  let cal_s
  let cal_e
  let edate
  let mo 
  let etitle
  let etime
  let elocation
  let sub
  /* this will hold the for loop on addEvent*/
  /*first filter the caldata to only the next 5 events based on the date filter*/
  for (let k = 0; k <6; k++) {
    console.log(k)
    cal_s = new Date(caldata[k].start.dateTime);
    cal_e = new Date(caldata[k].end.dateTime);
    if (cal_s < d) {
      console.log(`${caldata[k].summary} is not in time range`)
    } else {edate = cal_s.getDate();
      mo = cal_s.toLocaleString('default', { month: 'long' });
      etitle = caldata[k].summary;
      etime = cal_s.toLocaleTimeString() + " - " + cal_e.toLocaleTimeString() // will need to do some formatting here
      elocation = caldata[k].location
      //let elink = caldata[k][whatever]
      subMo.push(mo)
      addEvent(edate, mo, etitle, etime, elocation);//, elink);
  };};
  // setting heading
  if (subMo[0] == subMo[4]) {
    sub = subMo[0];
  } else {
    sub = subMo[0] + ' - ' + subMo[4];
  };
  subtitle.innerHTML += sub;

}




//== Running it ==//
// this is the actual event listener

document.getElementById("dateInput").addEventListener("input", event => {
  document.getElementById("calcontent").innerHTML = '';
  //var input = this.value;
  var dateEntered = new Date(event.target.value)//.toISOString();
  //var v = new Date(input);
  // console.log(input); //e.g. 2015-11-13
  console.log(event);
  console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
  
  showEvents(dateEntered);
 ;
});




