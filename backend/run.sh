curl -H "Content-Type: application/json" -X POST -d '{"name": "Alice", "bio": "DJ", "email": "a@brown.edu", "rating_provider": "4.3", "rating_recipient": "4.7", "available_provider": "1"}'  http://localhost:2000/user/create/
curl -H "Content-Type: application/json" -X POST -d '{"name": "Bob", "bio": "Photographer", "email": "b@brown.edu", "rating_provider": "3", "rating_recipient": "5", "available_provider": "0"}'  http://localhost:2000/user/create/
curl -H "Content-Type: application/json" -X POST -d '{"name": "Cindy", "bio": "Driver", "email": "c@brown.edu", "rating_provider": "5", "rating_recipient": "4", "available_provider": "1"}'  http://localhost:2000/user/create/

# curl http://localhost:2000/user/delete/2/ -X DELETE
# curl http://localhost:2000/user/delete/all/ -X DELETE