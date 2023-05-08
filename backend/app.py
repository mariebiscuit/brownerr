import os.path
from os import abort
from functools import wraps
from google.oauth2 import id_token
from google.auth.transport import requests
from google.auth import jwt

from sqlalchemy import func, CheckConstraint, event

from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from handlers.sorting.rating_sort import sort_provider
from config import Auth

# Inspiration for the database and CRUD operations: https://www.thepythoncode.com/article/building-crud-app-with-flask-and-sqlalchemy

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'brownerr.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

app.app_context().push()


# Creating the schema for User table in the database
class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Text, primary_key=True)
    picture = name = db.Column(db.Text, nullable=False)
    name = db.Column(db.String(100), nullable=False)  # split into first and last time
    service = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=True)  # String
    bio = db.Column(db.Text, nullable=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    rating_provider = db.Column(db.Float, default=0.0)
    rating_recipient = db.Column(db.Float, default=0.0)
    num_ratings_provider = db.Column(db.Integer, default=0)
    num_ratings_recipient = db.Column(db.Integer, default=0)
    available_provider = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    role = db.Column(db.String(100), nullable=False)

    __table_args__ = (
        CheckConstraint('rating_provider >= 0.0 AND rating_recipient <= 5.0', name='rating_provider_range'),
        CheckConstraint('rating_recipient >= 0.0 AND rating_recipient <= 5.0', name='rating_recipient_range'),
    )

    transactions_as_provider = db.relationship('Transaction', backref='provider_transactions',
                                               foreign_keys='Transaction.provider_id')
    transactions_as_recipient = db.relationship('Transaction', backref='recipient_transactions',
                                                foreign_keys='Transaction.recipient_id')

    # Serializing the response
    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'picture': self.picture,
            'service': self.service,
            'bio': self.bio,
            'email': self.email,
            'rating_provider': self.rating_provider,
            'rating_recipient': self.rating_recipient,
            'available_provider': self.available_provider,
            'created_at': self.created_at,
            'role': self.role
        }

    # Associating the records to user's first name
    def __repr__(self):
        return f'<User {self.name}>'


class Transaction(db.Model):
    __tablename__ = 'transaction'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'))
    provider_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    recipient_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    rating_provider = db.Column(db.Float, default=0.0)
    rating_recipient = db.Column(db.Float, default=0.0)
    review_provider = db.Column(db.Text)
    review_recipient = db.Column(db.Text)
    transaction_timestamp = db.Column(db.DateTime(timezone=True), server_default=func.now())

    provider = db.relationship('User', backref='provider_transactions', foreign_keys=[provider_id], lazy='joined')
    recipient = db.relationship('User', backref='recipient_transactions', foreign_keys=[recipient_id], lazy='joined')

    # Serializing the response
    def to_json(self):
        return {
            'id': self.id,
            'service_id': self.service_id,
            'provider_id': self.provider_id,
            'recipient_id': self.recipient_id,
            'rating_provider': self.rating_provider,
            'rating_recipient': self.rating_recipient,
            'review_provider': self.review_provider,
            'review_recipient': self.review_recipient,
            'transaction_timestamp': self.transaction_timestamp,
        }


@event.listens_for(Transaction, 'after_insert')
def update_user_ratings(target, connection, transaction):
    provider = db.session.query(User).filter_by(id=transaction.provider_id).first()
    recipient = db.session.query(User).filter_by(id=transaction.recipient_id).first()
    if provider is not None:
        provider_ratings = [transaction.rating_provider for transaction in provider.transactions_as_provider]
        provider.rating_provider = sum(provider_ratings) / len(provider_ratings)
        provider.num_ratings_provider = len(provider_ratings)
        connection.execute(
            User.__table__.update().where(User.id == provider.id).values(rating_provider=provider.rating_provider,
                                                                         num_ratings_provider=provider.num_ratings_provider))
    if recipient is not None:
        recipient_ratings = [transaction.rating_recipient for transaction in recipient.transactions_as_recipient]
        recipient.rating_recipient = sum(recipient_ratings) / len(recipient_ratings)
        recipient.num_ratings_recipient = len(recipient_ratings)
        connection.execute(
            User.__table__.update().where(User.id == recipient.id).values(rating_recipient=recipient.rating_recipient,
                                                                          num_ratings_recipient=recipient.num_ratings_recipient))


# Creating the schema for service type table in the database
class Service(db.Model):
    __tablename__ = 'service'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False, unique=True)

    # Serializing the response
    def to_json(self):
        return {
            'id': self.id,
            'service': self.name,
        }


# Creating the schema for services in the database
class Job(db.Model):
    __tablename__ = 'job'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    job = db.Column(db.Integer, db.ForeignKey('service.id'))
    name = db.Column(db.Text)
    poster = db.Column(db.Text, db.ForeignKey('user.id'))
    location = db.Column(db.Text)
    start_day = db.Column(db.Integer)
    start_month = db.Column(db.Integer)
    start_year = db.Column(db.Integer)

    end_day = db.Column(db.Integer)
    end_month = db.Column(db.Integer)
    end_year = db.Column(db.Integer)
    overview = db.Column(db.Text)

    __table_args__ = (
        CheckConstraint('start_day >= 0 AND start_day <= 31', name='start_day_range'),
        CheckConstraint('start_month >= 0 AND start_month <= 12', name='start_month_range'),
        CheckConstraint('end_day >= 0 AND end_day <= 31', name='start_day_range'),
        CheckConstraint('end_month >= 0 AND end_month <= 12', name='start_month_range')

    )

    def to_json(self):
        return {
            'id': self.id,
            'job': self.job,
            'name': self.name,
            'poster': self.poster,
            'location': self.location,
            'start_day': self.start_day,
            'start_month': self.start_month,
            'start_year': self.start_year,
            'end_day': self.end_day,
            'end_month': self.end_month,
            'end_year': self.end_year,
            'overview': self.overview
        }


# Creating the database with above defined table(s)
db.create_all()


# IMPORTANT: ADD REVIEWS FOR EACH USER (ENDPOINT)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "credential" in request.headers:
            token = request.headers["credential"].split(" ")[1]  # maybe in headers?
        if not token:
            return {
                       "message": "Authentication Token is missing!",
                       "data": None,
                       "error": "Unauthorized"
                   }, 401
        try:
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), Auth.CLIENT_ID)  # Token verified
            userid = idinfo['sub']  # Google ID
            current_user = User.query.get(userid)

            if current_user is None:
                return {
                           "message": "Invalid Authentication token!",
                           "data": None,
                           "error": "Unauthorized"
                       }, 401
            if not current_user["active"]:
                abort(403)
        except Exception as e:
            return {
                       "message": "Something went wrong",
                       "data": None,
                       "error": str(e)
                   }, 500

        return f(current_user, *args, **kwargs)

    return decorated


"""
-------- Read Functionality --------
"""


# Seeing all users in the database
@app.route("/user/list/", methods=["GET"])
def get_all_users():
    users = User.query.all()
    user_list = [user.to_json() for user in users]
    sorted = sort_provider(user_list)
    resp = jsonify(sorted)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


# Searching for users by unique id
@app.route("/user/id/<id_user>/", methods=["GET"])
def get_user(id_user):
    user = User.query.get(id_user)
    if user is None:
        abort()

    resp = jsonify(user.to_json())
    resp.headers.add('Access-Control-Allow-Origin', '*')
    return resp


# Searching for users by their service (only works if we provide id)
@app.route("/user/service/<service>/", methods=["GET"])
def get_users_service(service):
    users = User.query.filter_by(service=service).all()
    users_json = [user.to_json() for user in users]
    return jsonify(users_json)


# Searching for users by their name
@app.route("/user/name/<name>/", methods=["GET"])
def get_users(name):
    users = User.query.filter_by(name=name).all()
    users_json = [user.to_json() for user in users]
    return jsonify(users_json)


# Seeing all transactions in the database
@app.route("/transaction/list/", methods=["GET"])
def get_all_transactions():
    transactions = Transaction.query.all()
    return jsonify([transaction.to_json() for transaction in transactions])


# Seeing all services in the database
@app.route("/service/list/", methods=["GET"])
def get_all_services():
    services = Service.query.all()
    return jsonify([service.to_json() for service in services])


# Seeing a specific service in the database
@app.route("/service/<id>/", methods=["GET"])
def get_service(id):
    service = Service.query.get(id)
    if service is None:
        abort()
    return jsonify(service.to_json())


# Seeing all jobs in the database
@app.route("/job/list/", methods=["GET"])
def get_all_jobs():
    jobs = Job.query.all()
    return jsonify([job.to_json() for job in jobs])


# Seeing all reviews for a specific provider
@app.route("/user/provider/<provider_id>/reviews/", methods=["GET"])
def get_provider_reviews(provider_id):
    provider = User.query.filter_by(id=provider_id).all()
    transactions = Transaction.query.filter_by(provider_id=provider)
    provider_reviews = [transaction.review_provider for transaction in transactions]
    return provider_reviews


# Seeing all reviews for a specific recipient
@app.route("/user/recipient/<recipient_id>/reviews/", methods=["GET"])
def get_recipient_reviews(recipient_id):
    recipient = User.query.filter_by(id=recipient_id).all()
    transactions = Transaction.query.filter_by(recipient_id=recipient)
    recipient_reviews = [transaction.review_recipient for transaction in transactions]
    return recipient_reviews


# Seeing all jobs a specific user posted
@app.route("/user/<user_id>/jobs")
def get_user_jobs(user_id):
    user = User.query.filter_by(id=user_id).all()
    jobs = Job.query.filter_by()
    return jobs


"""
-------- Create Functionality --------
"""


@app.route("/user/signin/<credential>", methods=["GET"])
def signin_user(credential):
    try:
        data = jwt.decode(credential, verify=False)

        user = User.query.get(data['sub'])

        if user == None:
            new_user = User(id=data['sub'],
                            name=data['name'],
                            picture=data['picture'],
                            email=data['email'],
                            role='user')
            db.session.add(new_user)
            db.session.commit()
            user = User.query.get(data['sub'])

        return jsonify({'status': 200} | user.to_json())

    except:
        return jsonify({'status': 400, 'message': 'Invalid credential'})


# All users should have access to this endpoint (however they can only access it once unless deleted - unique email)
@app.route('/user/create/', methods=["GET", "POST"])
def create_user():
    data = request.get_json()
    id = data['id']
    name = data['name']
    service = data['service']
    bio = data['bio']
    email = data['email']
    role = data['role']
    picture = data['picture']
    available_provider = data['available_provider']

    # Create a new User object
    user = User(id=id,
                name=name,
                service=service,
                bio=bio,
                email=email,
                available_provider=available_provider,
                role=role,
                picture=picture)
    db.session.add(user)
    db.session.commit()
    return {'message': 'User added successfully.'}


# This should be automatically triggered (provider & recipient simultaneously trigger it)
@app.route('/transaction/create/', methods=["GET", "POST"])
def create_transaction():
    data = request.get_json()
    service_id = data['service_id']
    provider = data['provider_id']
    recipient = data['recipient_id']
    rating_provider = data['rating_provider']
    rating_recipient = data['rating_recipient']
    review_provider = data['review_provider']
    review_recipient = data['review_recipient']

    # Create a new User object
    transaction = Transaction(service_id=service_id,
                              provider_id=provider,
                              recipient_id=recipient,
                              rating_provider=rating_provider,
                              rating_recipient=rating_recipient,
                              review_provider=review_provider,
                              review_recipient=review_recipient)

    db.session.add(transaction)
    db.session.commit()
    return {'message': 'Transaction added successfully.'}


# Only admin should have access to this endpoint
@app.route('/service/create/', methods=["GET", "POST"])
def create_service():
    data = request.get_json()
    name = data['name']

    service = Service(name=name)

    db.session.add(service)
    db.session.commit()
    return {'message': 'service added successfully'}


# Any user should have access to this endpoint
@app.route('/job/create/', methods=["GET", "POST"])
def create_job():
    data = request.get_json()
    job = data['job']
    name = data['name']
    poster = data['poster']
    location = data['location']
    start_day = data['start_day']
    start_month = data['start_month']
    start_year = data['start_year']
    end_day = data['end_day']
    end_month = data['end_month']
    end_year = data['end_year']
    overview = data['overview']

    job = Job(job=job, name=name, poster=poster, location=location, start_day=start_day, start_month=start_month,
              start_year=start_year, end_day=end_day, end_month=end_month, end_year=end_year, overview=overview)

    db.session.add(job)
    db.session.commit()
    return {'message': 'job added successfully'}


"""
-------- Delete Functionality --------
"""


# Only the admin should have access to this (mainly for testing purposes)
@app.route("/user/delete/all/", methods=["DELETE"])
def delete_users():
    users = User.query.all()
    for user in users:
        db.session.delete(user)
    db.session.commit()
    return {'message': 'All users deleted successfully.'}


# All users should have access to this endpoint; however should only be able to delete their own id
@app.route("/user/delete/<int:id>/", methods=["DELETE"])
@token_required
def delete_user(current_user, id):
    if current_user.id == id or current_user.role == 'admin':
        user = User.query.get(id)
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted successfully.'}
    else:
        abort(401)


# Only the admin should have access to this (mainly for testing purposes)
@app.route("/transaction/delete/all/", methods=["DELETE"])
def delete_transactions():
    transactions = Transaction.query.all()
    for transaction in transactions:
        db.session.delete(transaction)
    db.session.commit()
    return {'message': 'All transactions deleted successfully.'}


# Only the admin should have access to this (mainly for testing purposes)
@app.route("/service/delete/all/", methods=["DELETE"])
@token_required
def delete_services(current_user):
    if current_user.role == 'admin':
        services = Service.query.all()
        for service in services:
            db.session.delete(service)
        db.session.commit()
        return {'message': 'All services deleted successfully.'}


# Only the admin should have access to this (mainly for testing purposes)
@app.route("/job/delete/all/", methods=["DELETE"])
def delete_jobs(current_user):
    if current_user.role == 'admin':
        jobs = Job.query.all()
        for job in jobs:
            db.session.delete(job)
        db.session.commit()
        return {'message': 'All jobs deleted successfully.'}


"""
-------- Update Functionality --------
"""


# All users should have access to this endpoint
@app.route("/user/update/<int:id>/", methods=["POST"])
# @token_required
def update_user_info(current_user, id):
    print("hi")
    if current_user.id == id or current_user.role == 'admin':
        user = User.query.get(id)
        # user.service = request.json.get('service', user.service)
        user.bio = request.json.get('bio', user.bio)
        # user.available_provider = request.json.get('available_provider', user.available_provider)
        db.session.commit()
        resp = jsonify({'code': 200, 'message': 'Bio and availability successfully updated.'})
    else:
        resp = jsonify({'code': 404, 'message': 'You must be logged in to edit your own profile.'})

    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
    return resp


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=2000)
