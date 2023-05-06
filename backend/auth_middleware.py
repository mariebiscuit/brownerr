from functools import wraps
from flask import request, abort

from google.oauth2 import id_token
from google.auth.transport import requests
from config import Auth
from app import User

# https://www.loginradius.com/blog/engineering/guest-post/securing-flask-api-with-jwt/
# https://developers.google.com/identity/gsi/web/guides/integrate
# https://cloud.google.com/endpoints/docs/openapi/authenticating-users-google-id

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "credential" in request.headers:
            token = request.headers["credential"].split(" ")[1] # maybe in headers?
        if not token:
            return {
                "message": "Authentication Token is missing!",
                "data": None,
                "error": "Unauthorized"
            }, 401
        try:
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), Auth.CLIENT_ID)  # Token verified
            userid = idinfo['sub'] # Google ID
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