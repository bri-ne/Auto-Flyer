import jicson
import json

with open('output.json', 'w') as f:
    json.dump(jicson.fromFile('./calendar.ics'), f)
f.close()