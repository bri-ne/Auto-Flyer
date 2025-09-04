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
//== letiables ==//
const subtitle = document.querySelector(".subtitle")
let caldata
let subMo = [];




//== Funcations ==//
function addEvent(edate, mo, etitle, etime, elocation, elink) {
  let div_content = document.createElement('div');
  let h_edate = `<div class="eventdate"><div class="date-day">${edate}</div><div class="date-mo">${mo}</div></div>`
  let h_etitle = `<div class="event-title">${etitle}</div>`
  let h_etime = `<div class="event-time">${etime}</div>`

  let h_elocation 
  if (elocation === undefined){
    h_elocation =  '<div class="event-location">TBD</div>'
  }else{
    h_elocation =  `<div class="event-location">${elocation}</div>`
  }
  //let h_elink = `<div class="event-link">${elink}</div></div>`
  div_content.className = 'container edit';
  div_content.contentEditable = 'False';
  div_content.innerHTML = h_edate + '<div class="calevent">' + h_etitle + h_etime + h_elocation + /*h_elink +*/ '</div>';
  document.getElementById("calcontent").appendChild(div_content);
}

function showEvents(d) {
  let sub
  let upcoming = caldata.filter((item) => new Date(item.start.dateTime) > d );
  /* this will hold the for loop on addEvent*/
  /*first filter the caldata to only the next 5 events based on the date filter*/
  for (let k = 0; k <6; k++) {
    console.log(k)
    let cal_s = new Date(upcoming[k].start.dateTime);
    let cal_e = new Date(upcoming[k].end.dateTime);
    if (cal_s < d) {
      console.log(`${upcoming[k].summary} is not in time range`)
    } else {let edate = cal_s.getDate();
      let mo = cal_s.toLocaleString('default', { month: 'long' });
      let etitle = upcoming[k].summary;
      let etime = cal_s.toLocaleTimeString() + " - " + cal_e.toLocaleTimeString() // will need to do some formatting here
      let elocation = upcoming[k].location
      //let elink = upcoming[k][whatever]
      subMo.push(mo)
      addEvent(edate, mo, etitle, etime, elocation);//, elink);
  };};
  // setting heading
  if (subMo[0] == subMo[4]) {
    sub = subMo[0];
  } else {
    sub = subMo[0] + ' - ' + subMo[4];
  };
  // if heading is undefined send error
  if (sub === undefined) {
    subtitle.innerHTML += 'no events found :/';
  } else {
    subtitle.innerHTML += sub;
  }
  

}



//== Running it ==//
// this is the actual event listener

document.getElementById("dateInput").addEventListener("input", event => {
  document.getElementById("calcontent").innerHTML = '';
  subtitle.innerHTML = '';
  //let input = this.value;
  let dateEntered = new Date(event.target.value)//.toISOString();
  //let v = new Date(input);
  // console.log(input); //e.g. 2015-11-13
  console.log(event);
  console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
  
  showEvents(dateEntered);
 ;
});


//make cal details editable



const toggleButton = document.querySelector('#editToggle');
let editElems = document.getElementsByClassName("edit")

function butttog() {
  if (editElems[0].contentEditable==='false') {
    for(let j = 0; j < editElems.length; j++){
      editElems[j].contentEditable="True";
    };
    console.log('Button is active!');
    toggleButton.innerHTML = 'Edit ON'
    alert('Look at you editing ;) dont forget to the update the calendar!')
    // Insert on logic here
  }else{
    alert('Edit is off')
    for(let j = 0; j < editElems.length; j++){
      editElems[j].contentEditable="False";
    }
    console.log('Button is not active.');
    toggleButton.innerHTML = 'Edit OFF'
    // Insert off logic here
  }

};


// Add an event listener for the 'click' event
toggleButton.addEventListener('click', function() {
  butttog();
});





