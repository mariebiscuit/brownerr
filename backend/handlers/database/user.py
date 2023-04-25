from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'

db = SQLAlchemy(app)


class users(db.Model):
    id = db.Column('student_id', db.Integer, primary_key=True)
    name = db.Column(db.String(100))


def __init__(self, name):
    self.name = name

db.create_all()

@app.route("/user")
def hello():
    return "Commands available for user is: adding a description for the service they are offering, " \
           "deleting their account, updating their bio and etc. "


@app.route("/user/create/<username>")
def user_create(username):
    return f"Adding a user with username {username} to the database...."


@app.route("/user/delete/<username>")
def user_delete(username):
    return f"Removing the user with username {username} from the database..."


@app.route("/user/bio/<username>/<bio>")
def user_bio(username, bio):
    return f"Updating bio for user with username {username}. Adding the following bio: '{bio}'"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=2000)
