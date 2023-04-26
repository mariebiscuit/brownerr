import json
import os.path
from os import abort

from flask import Flask, render_template, jsonify, request
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
    rating = db.Column(db.Float)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        CheckConstraint('rating >= 1.0 AND rating <= 5.0', name='rating_range'),
    )

    # Serializing the response
    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'bio': self.bio,
            'email': self.email,
            'rating': self.rating
            # 'created at': self.created_at,
        }

    # Associating the records to user's first name
    def __repr__(self):
        return f'<User {self.name}>'


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


"""
-------- Create Functionality --------
"""


@app.route('/user/create/', methods=["GET", "POST"])
def create():
    data = request.get_json()
    name = data['name']
    email = data['email']
    bio = data['bio']

    # Create a new User object
    user = User(name=name,
                email=email,
                bio=bio)
    db.session.add(user)
    db.session.commit()
    return {'message': 'User added succesfully'}
    # return render_template('add_user.html')


#
# @app.route("/user/add", methods=["POST"])
# def create_user():
#     try:
#         data = request.get_json()
#         id = data['id']
#         first_name = data['first_name']
#         last_name = data['last_name']
#         email = data['email']
#         bio = data['bio']
#
#         # Create a new User object
#         user = User(id=id,
#                     first_name=first_name,
#                     last_name=last_name,
#                     email=email,
#                     bio=bio)
#         db.session.add(user)
#         db.session.commit()
#
#         return jsonify({'message': 'User added successfully'})
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({'error': str(e)}), 500


"""
@app.route("/user/delete", methods=["DELETE"])
def delete_users():
    users = User.query.all()
    db.session.delete(users)
    db.session.commit()
    return jsonify({'result': True})
"""

# @app.route("/user/<int:id>", methods=["GET"])
# def get_user(id):
#     user = User.query.get(id)
#     if user is None:
#         abort()
#     return jsonify(user.to_json())

# def index():
#     users = User.query.all()
#     return render_template('add_user.html', users=users)
#
#
# @app.route("/user")
# def hello():
#     return "Commands available for user is: adding a description for the service they are offering, " \
#            "deleting their account, updating their bio and etc. "
#
#
# @app.route("/user/create/<username>")
# def user_create(username):
#     return f"Adding a user with username {username} to the database...."
#
#
# @app.route("/user/delete/<username>")
# def user_delete(username):
#     return f"Removing the user with username {username} from the database..."
#
#
# @app.route("/user/bio/<username>/<bio>")
# def user_bio(username, bio):
#     return f"Updating bio for user with username {username}. Adding the following bio: '{bio}'"
#
#
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=2000)
