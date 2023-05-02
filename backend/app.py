import os.path
from os import abort

from sqlalchemy import func, CheckConstraint, event

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'brownerr.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

app.app_context().push()


# Creating the schema for User table in the database
class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    service = db.Column(db.Integer, db.ForeignKey('service.id'))
    bio = db.Column(db.Text)
    email = db.Column(db.String(80), unique=True, nullable=False)
    rating_provider = db.Column(db.Float, default=0.0)
    rating_recipient = db.Column(db.Float, default=0.0)
    num_ratings_provider = db.Column(db.Integer, default=0)
    num_ratings_recipient = db.Column(db.Integer, default=0)
    available_provider = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

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
            'service': self.service,
            'bio': self.bio,
            'email': self.email,
            'rating_provider': self.rating_provider,
            'rating_recipient': self.rating_recipient,
            'available_provider': self.available_provider,
            'created_at': self.created_at
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
    review_provider_summary = db.Column(db.Text)
    review_recipient = db.Column(db.Text)
    review_recipient_summary = db.Column(db.Text)
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
            'review_provider_summary': self.review_provider_summary,
            'review_recipient': self.review_recipient,
            'review_recipient_summary': self.review_recipient_summary,
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


# Creating the database with above defined table(s)
db.create_all()

"""
-------- Read Functionality --------
"""


# Seeing all users in the database
@app.route("/user/list/", methods=["GET"])
def get_all_users():
    users = User.query.all()
    return jsonify([user.to_json() for user in users])


# Searching for users by unique id
@app.route("/user/<int:id_user>/", methods=["GET"])
def get_user(id_user):
    user = User.query.get(id_user)
    if user is None:
        abort()
    return jsonify(user.to_json())


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


"""
-------- Create Functionality --------
"""


# All users should have access to this endpoint (however they can only access it once unless deleted - unique email)
@app.route('/user/create/', methods=["GET", "POST"])
def create_user():
    data = request.get_json()
    name = data['name']
    service = data['service']
    bio = data['bio']
    email = data['email']
    # rating_provider = data['rating_provider']
    # rating_recipient = data['rating_recipient']
    available_provider = data['available_provider']

    # Create a new User object
    user = User(name=name,
                service=service,
                bio=bio,
                email=email,
                # rating_provider=rating_provider,
                # rating_recipient=rating_recipient,
                available_provider=available_provider)
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
    job = Job(job=job)
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
def delete_user(id):
    user = User.query.get(id)
    if user is None:
        abort()
    db.session.delete(user)
    db.session.commit()
    return {'message': 'User deleted successfully.'}


# Only the admin should have access to this (mainly for testing purposes)
@app.route("/transaction/delete/all", methods=["DELETE"])
def delete_transactions():
    transactions = Transaction.query.all()
    for transaction in transactions:
        db.session.delete(transaction)
    db.session.commit()
    return {'message': 'All transactions deleted successfully.'}


# Only the admin should have access to this (mainly for testing purposes)
@app.route("/service/delete/all/", methods=["DELETE"])
def delete_services():
    services = Service.query.all()
    for service in services:
        db.session.delete(service)
    db.session.commit()
    return {'message': 'All services deleted successfully.'}


# Only the admin should have access to this (mainly for testing purposes)
@app.route("/job/delete/all/", methods=["DELETE"])
def delete_jobs():
    jobs = Job.query.all()
    for job in jobs:
        db.session.delete(job)
    db.session.commit()
    return {'message': 'All jobs deleted successfully.'}


"""
-------- Update Functionality --------

"""


# All users should have access to this endpoint
@app.route("/user/update/<int:id>/", methods=["PUT"])
def update_user_info(id):
    user = User.query.get(id)
    if user is None:
        abort()
    user.service = request.json.get('service', user.service)
    user.bio = request.json.get('bio', user.bio)
    user.available_provider = request.json.get('available_provider', user.available_provider)
    db.session.commit()
    return {'message': 'Bio and availability successfully updated.'}


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=2000)
