import json
import os.path
from os import abort

from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'users.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

app.app_context().push()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(100), nullable=False, primary_key=True)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    bio = db.Column(db.Text)

    def to_json(self):
        return {
            'id': self.id,
            'first name': self.first_name,
            'last name': self.last_name,
            'email': self.email,
            # 'created at': self.created_at,
            'bio': self.bio
        }

    def __repr__(self):
        return f'<User {self.first_name}>'


db.create_all()


@app.route("/user/list", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.to_json() for user in users])


@app.route("/user/delete", methods=["DELETE"])
def delete_users():
    users = User.query.all()
    db.session.delete(users)
    db.session.commit()
    return jsonify({'result': True})


@app.route("/user/add", methods=["POST"])
def create_user():
    if not request.json:
        abort()

    user = User(
        id=request.json.get('id'),
        first_name=request.json.get('first_name'),
        last_name=request.json.get('last_name'),
        email=request.json.get('email'),
        bio=request.json.get('bio')
    )

    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_json()), 201


# @app.route("/user/<int:id>", methods=["GET"])
# def get_user(id):
#     user = User.query.get(id)
#     if user is None:
#         abort()
#     return jsonify(user.to_json())

# def index():
#     users = User.query.all()
#     return render_template('index.html', users=users)
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
