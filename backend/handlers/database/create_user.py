from flask import Blueprint
import requests
import json

authentication = Blueprint("user", __name__)

@authentication.route("/user/create", methods=['GET'])
def 