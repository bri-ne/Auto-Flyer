import json
import os
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
#import base64
import datetime


## variables
scopes = ['https://www.googleapis.com/auth/calendar']
gcstoken = os.environ['GCSTOKEN']

calid = '9srf5u5iffu2dg06625hbvhbj8@group.calendar.google.com'

def getit(calender_id):
  try:
    creds = Credentials.from_authorized_user_file(gcstoken, scopes)
    flow = InstalledAppFlow.from_client_secrets_file(gcstoken, scopes=scopes)
    creds = flow.run_local_server(port=0)
    service = build('calendar', 'v3', credentials=creds)
    # Call the Calendar API
    now = datetime.datetime.now(tz=datetime.timezone.utc).isoformat()
    print("Getting the upcoming 10 events")
    events_result = (
        service.events()
        .list(
            calendarId=calender_id,
            timeMin=now,
            #maxResults=10,
            #singleEvents=True,
            orderBy="startTime",
        )
        .execute()
      )
    events = events_result.get("items", [])
    return events
  except HttpError as error:
    print(f"An error occurred: {error}")

with open('data.json', 'w') as f:
    json.dump(getit(calid), f)
