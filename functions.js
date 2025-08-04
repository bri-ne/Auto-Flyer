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

example of google api output
{
 "kind": "calendar#events",
 "etag": "\"p32nvt173q3n8s0o\"",
 "summary": "Philly Socialists Public Calendar",
 "description": "",
 "updated": "2025-08-03T12:22:45.176Z",
 "timeZone": "America/New_York",
 "accessRole": "owner",
 "defaultReminders": [],
 "nextPageToken": "Cj8KLwotCgsI69HewgYQmOr0IBIeChwKGjI3dGY4NzNpYjFpMTlzNzJwZzg0dDR1bW4wGgwI3oHBxAYQwMrngALAPgE=",
 "items": [
  {
   "kind": "calendar#event",
   "etag": "\"3499001932766398\"",
   "id": "6tgm8ob474rm2bb569gjab9kclim2b9p6ksjibb36th3ic9m6sr3ce9jcc",
   "status": "confirmed",
   "htmlLink": "https://www.google.com/calendar/event?eid=NnRnbThvYjQ3NHJtMmJiNTY5Z2phYjlrY2xpbTJiOXA2a3NqaWJiMzZ0aDNpYzltNnNyM2NlOWpjYyA5c3JmNXU1aWZmdTJkZzA2NjI1aGJ2aGJqOEBn",
   "created": "2025-05-27T17:40:25.000Z",
   "updated": "2025-06-09T20:29:26.383Z",
   "summary": "TUF Cookout & Clothes Distro",
   "location": "Malcolm X Memorial, 5100 Pine St, Philadelphia, PA 19143, USA",
   "creator": {
    "email": "isapickett3@gmail.com"
   },
   "organizer": {
    "email": "info@phillysocialists.org"
   },
   "start": {
    "dateTime": "2025-06-22T13:00:00-04:00",
    "timeZone": "America/New_York"
   },
   "end": {
    "dateTime": "2025-06-22T16:00:00-04:00",
    "timeZone": "America/New_York"
   },
   "iCalUID": "6tgm8ob474rm2bb569gjab9kclim2b9p6ksjibb36th3ic9m6sr3ce9jcc@google.com",
   "sequence": 0,
   "attendees": [
    {
     "email": "9srf5u5iffu2dg06625hbvhbj8@group.calendar.google.com",
     "displayName": "Philly Socialists Public Calendar",
     "self": true,
     "responseStatus": "accepted"
    },
    {
     "email": "info@phillysocialists.org",
     "organizer": true,
     "responseStatus": "accepted"
    }
   ],
   "reminders": {
    "useDefault": true
   },
   "eventType": "default"
  },
  {
   "kind": "calendar#event",
   "etag": "\"3499930885876926\"",
   "id": "71im2c1pc4q36bb271ijib9k68p3cb9o6sq32b9i69hj2ohi6kom8e31cc",
   "status": "confirmed",
   "htmlLink": "https://www.google.com/calendar/event?eid=NzFpbTJjMXBjNHEzNmJiMjcxaWppYjlrNjhwM2NiOW82c3EzMmI5aTY5aGoyb2hpNmtvbThlMzFjYyA5c3JmNXU1aWZmdTJkZzA2NjI1aGJ2aGJqOEBn",
   "created": "2025-06-03T15:32:39.000Z",
   "updated": "2025-06-15T05:30:42.938Z",
   "summary": "The Time that Remains- Screening @ Making Worlds",
   "location": "210 S 45th St, Philadelphia, PA 19104, USA",
   "creator": {
    "email": "isapickett3@gmail.com"
   },
   "organizer": {
    "email": "info@phillysocialists.org"
   },
   "start": {
    "dateTime": "2025-07-12T16:00:00-04:00",
    "timeZone": "America/New_York"
   },
   "end": {
    "dateTime": "2025-07-12T18:15:00-04:00",
    "timeZone": "America/New_York"
   },
   "iCalUID": "71im2c1pc4q36bb271ijib9k68p3cb9o6sq32b9i69hj2ohi6kom8e31cc@google.com",
   "sequence": 0,
   "attendees": [
    {
     "email": "9srf5u5iffu2dg06625hbvhbj8@group.calendar.google.com",
     "displayName": "Philly Socialists Public Calendar",
     "self": true,
     "responseStatus": "accepted"
    },
    {
     "email": "info@phillysocialists.org",
     "organizer": true,
     "responseStatus": "accepted"
    }
   ],
   "hangoutLink": "https://meet.google.com/vzx-tpaz-twc",
   "conferenceData": {
    "entryPoints": [
     {
      "entryPointType": "video",
      "uri": "https://meet.google.com/vzx-tpaz-twc",
      "label": "meet.google.com/vzx-tpaz-twc"
     },
     {
      "entryPointType": "more",
      "uri": "https://tel.meet/vzx-tpaz-twc?pin=7643503219836",
      "pin": "7643503219836"
     },
     {
      "regionCode": "US",
      "entryPointType": "phone",
      "uri": "tel:+1-347-382-9549",
      "label": "+1 347-382-9549",
      "pin": "912550906"
     }
    ],
    "conferenceSolution": {
     "key": {
      "type": "hangoutsMeet"
     },
     "name": "Google Meet",
     "iconUri": "https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v6/web-512dp/logo_meet_2020q4_color_2x_web_512dp.png"
    },
    "conferenceId": "vzx-tpaz-twc"
   },
   "reminders": {
    "useDefault": true
   },
   "eventType": "default"
  },


 ]
}

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
const GOOGLE_CLIENT_ID = process.env.gcal_key; // Replace with your client ID
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







