curl -H "Content-Type: application/json" -X POST -d '{"name": "Alice", "service":"DJ",  "bio": "into reading", "email": "aa@brown.edu", "rating_provider": "4.3", "rating_recipient": "4.7", "available_provider": "1"}'  http://localhost:2000/user/create/
curl -H "Content-Type: application/json" -X POST -d '{"name": "Bob", "service":"Photographer",   "bio": "basketball enthusiast", "email": "bb@brown.edu", "rating_provider": "3", "rating_recipient": "5", "available_provider": "0"}'  http://localhost:2000/user/create/
curl -H "Content-Type: application/json" -X POST -d '{"name": "Cindy", "service": "None", "bio": "nature lover", "email": "cc@brown.edu", "rating_provider": "5", "rating_recipient": "4", "available_provider": "1"}'  http://localhost:2000/user/create/

