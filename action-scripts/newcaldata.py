import jicson
import json


with open('output.json', 'w') as f:
    json.dump(jicson.fromFile('./calendar.ics'), f)
f.close()

#`import ics2csv as ic
#calendar_string = ic.convert_ics_to_string('./calendar.ics')
#event_list = ic.make_event_list(calendar_string)
#ic.convert_list_to_csv(event_list, "calendar.csv")
#need to investigate https://correctics.com/help/validate-fix-ics-programmatically/