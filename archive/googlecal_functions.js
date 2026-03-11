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


//===================== global letiables ==================//
const subtitle = document.querySelector(".subtitle")
let caldata
let subMo = [];


//====================== Getting Data ======================//
function getEvents() {
  fetch("output.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      caldata = data.items;
      //showEvents(data,dEntered);
      console.log('showeventscalled');

    })
};
getEvents();

//====================== Populating Flyer Funcations =======================================================//
function addEvent(edate, mo, etitle, etime, elocation, elink) {
  let div_content = document.createElement('div');
  let h_edate = `<div class="eventdate"><div class="date-day">${edate}</div><div class="date-mo">${mo}</div></div>`
  let h_etitle = `<div class="event-title">${etitle}</div>`
  let h_etime = `<div class="event-time">${etime}</div>`

  let h_elocation
  if (elocation === undefined) {
    h_elocation = '<div class="event-location">TBD</div>'
  } else {
    h_elocation = `<div class="event-location">${elocation}</div>`
  }
  //let h_elink = `<div class="event-link">${elink}</div></div>`
  div_content.className = 'container edit';
  div_content.contentEditable = 'False';
  div_content.innerHTML = h_edate + '<div class="calevent">' + h_etitle + h_etime + h_elocation + /*h_elink +*/ '</div>';
  document.getElementById("calcontent").appendChild(div_content);
}

function showEvents(d) {
  let sub
  let upcoming = caldata.filter((item) => new Date(item.start.dateTime) > d);// filter for upcoming

  for (let k = 0; k < 6; k++) { // then grab the next 10
    console.log(k)
    let cal_s = new Date(upcoming[k].start.dateTime);
    let cal_e = new Date(upcoming[k].end.dateTime);
    if (cal_s < d) {
      console.log(`${upcoming[k].summary} is not in time range`)
    } else {
      let edate = cal_s.getDate();
      let mo = cal_s.toLocaleString('default', { month: 'long' });
      let etitle = upcoming[k].summary;
      let etime = cal_s.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " - " + cal_e.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      let elocation = upcoming[k].location
      //let elink = upcoming[k][whatever]
      subMo.push(mo)
      addEvent(edate, mo, etitle, etime, elocation);//, elink);
    };
  };
  // ==== setting heading ===//
  if (subMo[0] == subMo.slice(-1)[0]) {
    sub = subMo[0];
  } else {
    sub = subMo[0] + ' - ' + subMo.slice(-1)[0];
  };
  // === if heading is undefined send error ===//
  if (sub === undefined) {
    subtitle.innerHTML += 'no events found :/';
  } else {
    subtitle.innerHTML += sub;
    subtitle.innerHTML += ' Events';
  }
}

// ========  make cal details editable ===========================================//
let editElems = document.getElementsByClassName("edit")
const toggleButton = document.querySelector('#editToggle');
function butttog() {
  if (editElems[0].contentEditable === 'false') {
    for (let j = 0; j < editElems.length; j++) {
      editElems[j].contentEditable = "True";
    };
    console.log('Button is active!');
    toggleButton.innerHTML = 'Edit ON'
    alert('Look at you editing ;) dont forget to the update the calendar!')
    // Insert on logic here
  } else {
    alert('Edit is off')
    for (let j = 0; j < editElems.length; j++) {
      editElems[j].contentEditable = "False";
    }
    console.log('Button is not active.');
    toggleButton.innerHTML = 'Edit OFF'
    // Insert off logic here
  }

};

// ======= print the damn thing, but consistently =======//
let element = document.getElementById('element-to-print');

const printButton = document.querySelector('#printButton');
const d_now = new Date();
let opt = {
  margin: 0.5,//[vMargin, hMargin],
  filename: `PS_upcomingevents_${d_now.toLocaleDateString()}.pdf`,
  image: { type: 'jpeg', quality: 1 },
  html2canvas: {
    scale: 1,
    //dpi: 300,
    //letterRendering: true,
    useCORS: true
  },
  jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  pagebreak: { mode: 'avoid-all' }
};

// New Promise-based usage:

function buttprint() {
  html2pdf().set(opt).from(element).save();
}



//========================= Running it ======================================================//
// this is the actual event listener for date input
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

// Add an event listener for the edit event
toggleButton.addEventListener('click', function () {
  butttog();
});

// Add an event listener for the download event
printButton.addEventListener('click', function () {
  buttprint();
});




