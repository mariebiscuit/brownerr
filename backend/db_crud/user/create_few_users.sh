#curl -H "Content-Type: application/json" -X POST -d '{"name": "Alice", "service":"DJ",  "bio": "into reading", "email": "aa@brown.edu", "rating_provider": "", "rating_recipient": "", "available_provider": "1"}'  http://localhost:2000/user/create/
#curl -H "Content-Type: application/json" -X POST -d '{"name": "Bob", "service":"Photographer",   "bio": "basketball enthusiast", "email": "bb@brown.edu", "rating_provider": "", "rating_recipient": "", "available_provider": "0"}'  http://localhost:2000/user/create/
#curl -H "Content-Type: application/json" -X POST -d '{"name": "Cindy", "service": "None", "bio": "nature lover", "email": "cc@brown.edu", "rating_provider": "", "rating_recipient": "", "available_provider": "1"}'  http://localhost:2000/user/create/

curl --location --request POST 'http://localhost:2000/user/create/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "John Doe2",
    "service": 2,
    "bio": "I am a professional electrician",
    "email": "john.doe2@example.com",
    "available_provider": 1,
    "role": "admin"
}'

curl --location --request POST 'http://localhost:2000/user/create/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Jane Smith2",
    "service": 1,
    "bio": "I am a certified plumber",
    "email": "jane.smith2@example.com",
    "available_provider": 1,
    "role": "user"
}'

curl --location --request POST 'http://localhost:2000/user/create/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Bob Johnson2",
    "service": 3,
    "bio": "I am a professional landscaper",
    "email": "bob.johnson2@example.com",
    "role": "user",
    "available_provider": 1
}'
