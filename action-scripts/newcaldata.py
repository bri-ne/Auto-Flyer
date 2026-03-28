import jicson
import json
import ics2csv as ic

with open('output.json', 'w') as f:
    json.dump(jicson.fromFile('./calendar.ics'), f)
f.close()

calendar_string = ic.convert_ics_to_string('./calendar.ics')
event_list = ic.make_event_list(calendar_string)
ic.convert_list_to_csv(event_list, "calendar.csv")