from flask import Flask
from flask_restful import Resource, Api
from json import dumps

app = Flask(__name__)
api = Api(app)


class Pinging(Resource):
    def get(self):
        return {'status':'success'}


api.add_resource(Pinging, '/pinging') # Route_1

if __name__ == '__main__':
     app.run()