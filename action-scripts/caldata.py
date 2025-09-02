import requests
import os 
import datetime as dt
import json
key = os.environ["key"]
print(key)
calid = '9srf5u5iffu2dg06625hbvhbj8@group.calendar.google.com'
timemin = str(dt.datetime.now().date())


r = f'https://www.googleapis.com/calendar/v3/calendars/{calid}/events?orderBy=startTime&showDeleted=false&singleEvents=true&timeMin={timemin}T00%3A00%3A00Z&key={key}'
t = requests.get(r)
data = t.json()
print(r)

print(t)
with open('output.json', 'w') as f:
    json.dump(data, f)