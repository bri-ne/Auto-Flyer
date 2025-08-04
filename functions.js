//== populating events ==//
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


const subtitle = document.querySelector(".subtitle")
var subMo = [];




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

function showEvents(gcalOutput) {
  /* this will hold the for loop on addEvent*/
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


function getEvents(d) {
  /* this function will grab the information from google calendar
  d will be the start date to query the google calendar api */
  const apiUrl = 'https://www.googleapis.com/calendar/v3/calendars/9srf5u5iffu2dg06625hbvhbj8@group.calendar.google.com/events?' + new URLSearchParams({
    maxResults: 5,
    timeMin: d,
    orderBy: 'startTime'
  })

  // Make a GET request
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      showEvents(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Function to generate the OAuth URL and redirect the user
const GOOGLE_OAUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_CLIENT_ID =  GCAL_KEY; // Replace with your client ID
const GOOGLE_CALLBACK_URL = "http://localhost:3000";
const GOOGLE_OAUTH_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

function initiateGoogleOAuth() {
  const state = crypto.randomUUID(); // Generate a CSRF token
  localStorage.setItem("oauth_state", state);

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_CALLBACK_URL,
    access_type: "offline",
    response_type: "code",
    state: state,
    scope: GOOGLE_OAUTH_SCOPES.join(" "),
  });

  const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?${params.toString()}`;
  window.location.href = GOOGLE_OAUTH_CONSENT_SCREEN_URL;
};

initiateGoogleOAuth();

// this is the actual event listener

document.getElementById("dateInput").addEventListener("input", event => {
  //var input = this.value;
  var dateEntered = new Date(event.target.value).toISOString();
  //var v = new Date(input);
 // console.log(input); //e.g. 2015-11-13
  console.log(event);
  console.log(dateEntered); //e.g. Fri Nov 13 2015 00:00:00 GMT+0000 (GMT Standard Time)
  // getEvents(dateEntered)
  getEvents(dateEntered);
});







