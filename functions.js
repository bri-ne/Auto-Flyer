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


//== Variables ==//
const subtitle = document.querySelector(".subtitle")
var subMo = [];
// ==the github token == //
/*
const octokit = new Octokit({
  auth: process.env.GTOKEN
});*/



//== Funcations ==//
function addEvent(edate, mo, etitle, etime, elocation, elink) {
  var div = document.createElement('div');
  var h_edate = `<div class="eventdate"><div class="date-day">${edate}</div><div class="date-mo">${mo}</div></div>`
  var h_etitle = `<div class="event-title">${etitle}</div>`
  var h_etime = `<div class="event-time">${etime}</div>`
  var h_elocation = `<div class="event-location">${elocation}</div>`
  //var h_elink = `<div class="event-link">${elink}</div></div>`
  div.className = 'container';
  div.innerHTML = h_edate + '<div class="calevent">' + h_etitle + h_etime + h_elocation + /*h_elink +*/ '</div>';
  document.body.appendChild(div);
}

function showEvents(gcalOutput, d) {
  /* this will hold the for loop on addEvent*/
  /*first filter the gcaloutput to only the next 5 events based on the date filter*/
  for (let k = 0; k < gcalOutput.length; k++) {
    if (getDate(gcalOutput.items[k].start.dateTime) < d) {
      console.log('{gcalOutput.items[i].summary} is not in time range')
    } else {
      for (let i = 0; i < 6; i++) {
        let edate = getDate(gcalOutput.items[i].start.dateTime);
        let mo = getMonth(gcalOutput.items[i].start.dateTime);
        let etitle = gcalOutput.items[i].summary;
        let etime = toLocaleTimeString(gcalOutput.items[i].start.dateTime) + " - " + toLocaleTimeString(gcalOutput.items[i].end.dateTime) // will need to do some formatting here
        let elocation = gcalOutput.items[i].location
        //let elink = gcalOutput.items[i][whatever]
        subMo.push(mo)
        addEvent(edate, mo, etitle, etime, elocation, elink);
      }
      if (subMo[0] == subMo[4]) {
        subtitle.appendChild(subMo[0]);
      } else {
        subtitle.appendChild(subMo[0] + ' - ' + subMo[4])
      }
    }
  }
}

/*
async function getEvents(d) {
  await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'bri-ne',
    repo: 'auto-flyer',
    path: 'output.json',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  }).then(data => {
    console.log(data);
    showEvents(data.contents, d);
  })
    .catch(error => {
      console.error('Error:', error);
    });
}
*/

function getEvents(d) {
  fetch("test.json")
    .then(response => response.json())
    .then(json => 
       showEvents(JSON.parse(json), d)
      )
};




//== Running it ==//
// this is the actual event listener

//var caldata = readTextFile();

document.getElementById("dateInput").addEventListener("input", event => {
  //var input = this.value;
  var dateEntered = new Date(event.target.value)//.toISOString();
  //var v = new Date(input);
  // console.log(input); //e.g. 2015-11-13
  console.log(event);
  console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
  getEvents(dateEntered)
  //showEvents(caldata, dateEntered);
});




