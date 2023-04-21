from flask import Flask
from handlers.database import *

def create_app(config_name=None):
    app = Flask(__name__)
    
    # load config file
    app.config.from_object(config.get(config_name or 'dev'))

    # register blueprints
    # with app.app_context():
    app.register_blueprint(authentication)
    app.register_blueprint(product)
    app.register_blueprint(user)
    app.register_blueprint(recommender)

    @app.route('/',  methods=['GET'])
    def index():
        return "Welcome to the Brownerr API server"

    return app

# EB looks for an 'application' callable by default.
application = app = create_app()

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    app.run(ssl_context="adhoc", debug=True)