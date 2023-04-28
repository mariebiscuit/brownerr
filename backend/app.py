import os.path
from os import abort

from sqlalchemy import func, CheckConstraint

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
    service = db.Column(db.Integer, db.ForeignKey('job.id')) # points to jobs id
    bio = db.Column(db.Text)
    email = db.Column(db.String(80), unique=True, nullable=False)
    rating_provider = db.Column(db.Float)  # Should be an average of all reviews and cannot be modified by the user
    rating_recipient = db.Column(db.Float)  # Should be an average of all reviews and cannot be modified by the user
    available_provider = db.Column(db.Integer)  # 0 if unavailable, 1 if available
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        CheckConstraint('rating_provider >= 1.0 AND rating_recipient <= 5.0', name='rating_recipient_range'),
        CheckConstraint('rating_recipient >= 1.0 AND rating_recipient <= 5.0', name='rating_recipient_range'),
    )

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
            'created at': self.created_at
        }

    # Associating the records to user's first name
    def __repr__(self):
        return f'<User {self.name}>'


# Creating the schema for Transaction table in the database
class Transaction(db.Model):
    __tablename__ = 'transaction'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    job_id = db.Column(db.Integer)  # foreign key that should point to id in Job
    provider = db.Column(db.Integer, db.ForeignKey('user.id'))  # foreign key that should point to id in User
    recipient = db.Column(db.Integer, db.ForeignKey('user.id'))  # foreign key that should point to id in User
    rating_provider = db.Column(db.Float)  # Should be an average of all reviews and cannot be modified by the user
    rating_recipient = db.Column(db.Float)  # Should be an average of all reviews and cannot be modified by the user
    transaction_timestamp = db.Column(db.DateTime(timezone=True), server_default=func.now())

    # Serializing the response
    def to_json(self):
        return {
            'id': self.id,
            'job_id': self.job_id,
            'provider': self.provider,
            'recipient': self.recipient,
            'rating_provider': self.rating_provider,
            'rating_recipient': self.rating_recipient,
            'transaction_timestamp': self.transaction_timestamp,
        }


# Creating the schema for Jobs table in the database
class Job(db.Model):
    __tablename__ = 'job'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    average_rate = db.Column(db.Float)

    # Serializing the response
    def to_json(self):
        return {
            'id': self.id,
            'job': self.name,
            'average_rate': self.average_rate
        }


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


# Searching for users by their job
@app.route("/user/job/<job>/", methods=["GET"])
def get_users_job(job):
    users = User.query.filter_by(service=job).all()
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


# Seeing all jobs in the database
@app.route("/job/list/", methods=["GET"])
def get_all_jobs():
    jobs = Job.query.all()
    return jsonify([job.to_json() for job in jobs])


"""
-------- Create Functionality --------
"""


@app.route('/user/create/', methods=["GET", "POST"])
def create_user():
    data = request.get_json()
    name = data['name']
    service = data['service']
    bio = data['bio']
    email = data['email']
    rating_provider = data['rating_provider']
    rating_recipient = data['rating_recipient']
    available_provider = data['available_provider']

    # Create a new User object
    user = User(name=name,
                service=service,
                bio=bio,
                email=email,
                rating_provider=rating_provider,
                rating_recipient=rating_recipient,
                available_provider=available_provider)
    db.session.add(user)
    db.session.commit()
    return {'message': 'User added successfully.'}


@app.route('/transaction/create/', methods=["GET", "POST"])
def create_transaction():
    data = request.get_json()
    job_id = data['job_id']
    provider = data['provider']
    recipient = data['recipient']
    rating_provider = data['rating_provider']
    rating_recipient = data['rating_recipient']

    # Create a new User object
    transaction = Transaction(job_id=job_id,
                              provider=provider,
                              recipient=recipient,
                              rating_provider=rating_provider,
                              rating_recipient=rating_recipient)

    db.session.add(transaction)
    db.session.commit()
    return {'message': 'Transaction added successfully.'}


@app.route('/job/create/', methods=["GET", "POST"])
def create_job():
    data = request.get_json()
    name = data['name']
    avg_rate = data['average_rate']

    job = Job(name=name,
              average_rate=avg_rate)

    db.session.add(job)
    db.session.commit()
    return {'message': 'Job added successfully'}


"""
-------- Delete Functionality --------
"""


@app.route("/user/delete/all/", methods=["DELETE"])
def delete_users():
    users = User.query.all()
    for user in users:
        db.session.delete(user)
    db.session.commit()
    return {'message': 'All users deleted successfully.'}


@app.route("/user/delete/<int:id>/", methods=["DELETE"])
def delete_user(id):
    user = User.query.get(id)
    if user is None:
        abort()
    db.session.delete(user)
    db.session.commit()
    return {'message': 'User deleted successfully.'}


@app.route("/transaction/delete/all", methods=["DELETE"])
def delete_transactions():
    transactions = Transaction.query.all()
    for transaction in transactions:
        db.session.delete(transaction)
    db.session.commit()
    return {'message': 'All transactions deleted successfully.'}


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
