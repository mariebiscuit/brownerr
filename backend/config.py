from private import CLIENT_ID, CLIENT_SECRET

class Auth:
    CLIENT_ID = "296281874095-j1kagpkpq2spn433j5bq2al44kgj2d0m.apps.googleusercontent.com"
    AUTH_URI = "https://accounts.google.com/o/oauth2/auth"
    TOKEN_URI = "https://oauth2.googleapis.com/token"
    AUTH_CERT_URL = "https://www.googleapis.com/oauth2/v1/certs"
    CLIENT_SECRET = CLIENT_SECRET
    REDIRECT_URL = "http://localhost:2000/gCallback"
    JAVASCRIPT_ORIGINS = "http://localhost:2000"