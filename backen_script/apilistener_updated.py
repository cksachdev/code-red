import RPi.GPIO as GPIO
import time
import os
import pdb
import subprocess

from flask import Flask
from flask_restful import Resource, Api
from flask import request
from json import dumps

app = Flask(__name__)
api = Api(app)

GPIO.setmode(GPIO.BCM)
GPIO.setup(24, GPIO.OUT)
GPIO.setup(23, GPIO.IN)

class Pinging(Resource):
  def get(self):

    alert_type = request.args.get("type")
    mp3_process = subprocess.Popen(['omxplayer', '--loop', alert_type+'.mp3'])

    time.sleep(2)
    player_time = 0
    while player_time < 600:
      if GPIO.input(23):
        print("Motion Detected...")
        player_time = 650
        time.sleep(0.1)
        mp3_process.kill()
        os.system("killall omxplayer.bin &")
        os.system("killall omxplayer &")

      time.sleep(0.5)
      player_time+=1

    return {'status':'success'}


api.add_resource(Pinging, '/pinging') # Route_1

if __name__ == '__main__':
  app.run()
