# import RPi.GPIO as GPIO
import time
import os
import pdb

from flask import Flask
from flask_restful import Resource, Api
from flask import request
from json import dumps

app = Flask(__name__)
api = Api(app)

GPIO.setmode(GPIO.BCM)
GPIO.setup(24, GPIO.OUT)

class Pinging(Resource):
  def get(self):
    # GPIO.output(24, True)
    alert_type = request.args.get("type")
    mp3_process = subprocess.Popen(['omxplayer', alert_type+'.mp3'])

    player_time = 0
    while player_time < 50:
      if GPIO.input(23):
        print("Motion Detected...")
        player_time = 50;
        time.sleep(3)
        subprocess.call(['killall', 'omxplayer'])
      time.sleep(0.5)
      player_time++;

    # pdb.set_trace()
    # time.sleep(0.5)
    # GPIO.output(24, False)

    return {'status':'success'}


api.add_resource(Pinging, '/pinging') # Route_1

if __name__ == '__main__':
  app.run()
