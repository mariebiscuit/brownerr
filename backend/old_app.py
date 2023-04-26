from flask import Flask
from handlers.database.userAPI import user

def create_app(config_name=None):
    app = Flask(__name__)

    # register blueprints
    app.register_blueprint(user)

    @app.route('/',  methods=['GET'])
    def index():
        return "Welcome to the Brownerr API server"

    return app

app = create_app()

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    app.run(ssl_context="adhoc", debug=True)