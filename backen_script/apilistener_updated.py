from flask import Flask
from flask_restful import Resource, Api
from json import dumps
import RPi.GPIO as GPIO
import time

app = Flask(__name__)
api = Api(app)

GPIO.setmode(GPIO.BCM)
GPIO.setup(24, GPIO.OUT)

class Pinging(Resource):
    def get(self):
        GPIO.output(24, True)
        time.sleep(0.5)
        GPIO.output(24, False)
        return {'status':'success'}


api.add_resource(Pinging, '/pinging') # Route_1

if __name__ == '__main__':
     app.run()
