import os.path
from os import abort

from flask import Flask, jsonify, request, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, CheckConstraint

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'users.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

app.app_context().push()


# Creating the schema for User table in the database
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
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
class Transcation(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    job_id = db.Column(db.Integer)  # foreign key that should point to id in Job
    provider = db.Column(db.Integer)  # foreign key that should point to id in User
    recipient = db.Column(db.Integer)  # foreign key that should point to id in User
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


# Searching for users by their first name
@app.route("/user/name/<name>/", methods=["GET"])
def get_users(name):
    users = User.query.filter_by(name=name).all()
    users_json = [user.to_json() for user in users]
    return jsonify(users_json)


# Seeing all transactions in the database
@app.route("/transaction/list/", methods=["GET"])
def get_all_transcations():
    transactions = Transcation.query.all()
    return jsonify([transaction.to_json() for transaction in transactions])


"""
-------- Create Functionality --------
"""


@app.route('/user/create/', methods=["GET", "POST"])
def create():
    data = request.get_json()
    name = data['name']
    bio = data['bio']
    email = data['email']
    rating_provider = data['rating_provider']
    rating_recipient = data['rating_recipient']
    available_provider = data['available_provider']

    # Create a new User object
    user = User(name=name,
                bio=bio,
                email=email,
                rating_provider=rating_provider,
                rating_recipient=rating_recipient,
                available_provider=available_provider)
    db.session.add(user)
    db.session.commit()
    return {'message': 'User added successfully.'}


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





if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=2000)
