from flask import Blueprint, request
from flask_expects_json import expects_json
import requests
import json
from pymongo import MongoClient

from utils.schema import user_schema

client = MongoClient()
db = client['brownerr-db1']

user = Blueprint("userAPI", __name__)

@user.route('/user/<user_id>', methods=['GET', 'DELETE', 'POST'])
def existing_user(user_id):
    userId = request.args.get('user_id')

    if request.method == 'GET':
        user = db['users'].find_one({'user_id': userId})
        print(user)

    if request.method == 'POST':
        data = request.form
        db['users'].update_one({'user_id': userId}, data)

    if request.method == 'DELETE':
        db['users'].delete_one({'user_id': userId})

@user.route('/user/create', methods=['POST'])
@expects_json(user_schema)
def create_user():
    user_data = request.get_json()
    return db['users'].insert_one(user_data)