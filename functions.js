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


//========= fn for cleaning timestamp on cal data =======================================//
function cleanalert() {
  console.log("the cleaning is happening");
};
cleanalert();
function dateclean(eventlist, col,colname) {
  let ev
  let y 
  let m
  let day 
  let t1
  let t2
  try{
    for (i in eventlist) {
      ev = eventlist[i];
      y = ev[col];//.slice(0,4);
      m = ev[col];//.slice(4,6);
      day = ev[col];//.slice(6,11);
      t1 = ev[col];//.slice(11,13);
      t2 = ev[col];//.slice(13,);
      cleandate = y.slice(0,4)+"-"+m.slice(4,6)+"-"+day.slice(6,11)+":"+t1.slice(11,13)+":"+t2.slice(13,);
      cleandate = new Date(cleandate);
      eventlist[i][colname] = cleandate; //new Date(cleandate);
    };
    cleanalert();
  }
  catch(err) {
  console.log(err.message);
  }
  return eventlist; 
};


//====================== Getting Data ===================================================//
function getEvents() {
  fetch("output.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      caldata = data['VCALENDAR'][0]['VEVENT']; /**array of events */
      console.log('showeventscalled');
    });
};

getEvents();





//dateclean(caldata, "DTSTART", "DTSTARTCLEAN"); /* clean those dates */
//caldata = dateclean(caldata, "DTEND", "DTENDCLEAN"); /* clean those dates */

//====================== Populating Flyer Funcations =======================================================//

//CREATING THE HTML ======
function addEvent(edate, mo, etitle, etime, elocation, edescription, elink) {
  let div_content = document.createElement('div');
  let h_edate = `<div class="eventdate"><div class="date-day">${edate}</div><div class="date-mo">${mo}</div></div>`
  let h_etitle = `<div class="event-title">${etitle}</div>`
  let h_etime = `<div class="event-time">${etime}</div>`
  
  let h_description
  if (edescription === undefined || edescription == 'undefined') {
    h_description = ''
  } else {
    h_description = `<div class="event-description">${edescription}</div>`
  }

  let h_elocation
  if (elocation === undefined) {
    h_elocation = '<div class="event-location">TBD</div>'
  } else {
    h_elocation = `<div class="event-location">${elocation}</div>`
  }
  //let h_elink = `<div class="event-link">${elink}</div></div>`
  div_content.className = 'container edit';
  div_content.contentEditable = 'False';
  div_content.innerHTML = h_edate + '<div class="calevent">' + h_etitle + h_description + h_etime + h_elocation + /*h_elink +*/ '</div>';
  document.getElementById("calcontent").appendChild(div_content);
}




//Filter function =====
// 
//function calfilter(eventlist,d) {
//  for (let j = 0; j < eventlist.length; j++) {
//      eventlist.DTSTARTCLEAN = new Date(eventlist.DTSTART.slice(0,4)+"-"+eventlist.DTSTART.slice(4,6)+"-"+eventlist.DTSTART.slice(6,11)+":"+eventlist.DTSTART.slice(11,13)+":"+eventlist.DTSTART.slice(13,))
 //     eventlist.DTENDCLEAN = new Date(eventlist.DTEND.slice(0,4)+"-"+eventlist.DTEND.slice(4,6)+"-"+eventlist.DTEND.slice(6,11)+":"+eventlist.DTEND.slice(11,13)+":"+eventlist.DTEND.slice(13,))
 //   }
 // caldata.DTSTARTCLEAN = "value3";
 // return eventlist => 10;
//}

function cleanlocal(l,li){
  return l[li]['LOCATION'].replaceAll('\\','').slice(0,l[li]['LOCATION'].replaceAll('\\','').lastIndexOf(' Philadelphia,')); /**event location */
};

//PULLING THE ACTUAL CALENDAR EVENTS DATA
function showEvents(d) {
  subMo.length = 0;
  let sub
  let cal_s
  let cal_e
  ///======================== formatting data =========//
  dateclean(caldata, "DTSTART", "DTSTARTCLEAN");
  dateclean(caldata, "DTEND", "DTENDCLEAN");
  let upcoming = caldata.filter((item) => item.DTSTARTCLEAN > d);// filter for upcoming


  for (let k = 0; k < 8; k++) { // then grab the next 10
    console.log(k)
    if(upcoming[k].DTSTARTCLEAN && upcoming[k].DTENDCLEAN){
      cal_s = upcoming[k].DTSTARTCLEAN;   /**event start */
      cal_e = upcoming[k].DTENDCLEAN;   /**event end */
    }
    if (cal_s < d) {
      console.log(`${upcoming[k]['SUMMARY']} is not in time range`) /**event summary */
    } else {
      try{
        let edate = cal_s.getDate();
        let mo = cal_s.toLocaleString('default', { month: 'long' });
        let etitle = upcoming[k]['SUMMARY'];     
        let edescription 
        let elocation 
        let etime = cal_s.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " - " + cal_e.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        if(upcoming[k]['DESCRIPTION']){
          edescription = upcoming[k]['DESCRIPTION'];
        }else{
          edescription = '';
        };
        
        
        if(upcoming[k]['LOCATION'] && upcoming[k]['LOCATION'] != undefined){
          elocation = cleanlocal(upcoming,k);
        }else{
          elocation = '';
        }
        //let elink = upcoming[k][whatever]
        subMo.push(mo)
        addEvent(edate, mo, etitle, edescription, etime, elocation);//, elink);
      }
      catch(err){
        console.log("showevents has errored:")
        console.log(err.message);
      }
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

// ========  make cal details editable ==================================================================//
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

// ======= print the damn thing, but consistently ==================================================//
let element = document.getElementById('element-to-print');

const printButton = document.querySelector('#printButton');
const d_now = new Date();
let opt_desktop = {
  margin: 0.5,//[vMargin, hMargin],
  filename: `PS_upcomingevents_${d_now.toLocaleDateString()}.pdf`,
  image: { type: 'jpeg', quality: 1 },
  html2canvas: {
    scale: 2,
    dpi: 300,
    letterRendering: true,
    useCORS: true
  },
  jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  pagebreak: { mode: 'avoid-all' }
};

let opt_mobile = {
  margin: 0.5,//[vMargin, hMargin],
  filename: `PS_upcomingevents_${d_now.toLocaleDateString()}.pdf`,
  image: { type: 'jpeg', quality: 1 },
  html2canvas: {
    scale: 1.75,
    dpi: 300,
    letterRendering: true,
    useCORS: true
  },
  jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  pagebreak: { mode: 'avoid-all' }
};
// New Promise-based usage:

function buttprint() {
  if(window.screen.width > 1320){
    html2pdf().set(opt_desktop).from(element).save();
  }else{
    html2pdf().set(opt_mobile).from(element).save();
  } 
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




