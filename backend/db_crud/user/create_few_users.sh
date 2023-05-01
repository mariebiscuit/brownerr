#curl -H "Content-Type: application/json" -X POST -d '{"name": "Alice", "service":"DJ",  "bio": "into reading", "email": "aa@brown.edu", "rating_provider": "", "rating_recipient": "", "available_provider": "1"}'  http://localhost:2000/user/create/
#curl -H "Content-Type: application/json" -X POST -d '{"name": "Bob", "service":"Photographer",   "bio": "basketball enthusiast", "email": "bb@brown.edu", "rating_provider": "", "rating_recipient": "", "available_provider": "0"}'  http://localhost:2000/user/create/
#curl -H "Content-Type: application/json" -X POST -d '{"name": "Cindy", "service": "None", "bio": "nature lover", "email": "cc@brown.edu", "rating_provider": "", "rating_recipient": "", "available_provider": "1"}'  http://localhost:2000/user/create/

curl --location --request POST 'http://localhost:2000/user/create/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "John Doe",
    "service": 2,
    "bio": "I am a professional electrician",
    "email": "john.doe@example.com",
    "rating_provider": 0.0,
    "rating_recipient": 0.0,
    "available_provider": 1
}'

curl --location --request POST 'http://localhost:2000/user/create/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Jane Smith",
    "service": 1,
    "bio": "I am a certified plumber",
    "email": "jane.smith@example.com",
    "rating_provider": 0.0,
    "rating_recipient": 0.0,
    "available_provider": 1
}'

curl --location --request POST 'http://localhost:2000/user/create/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Bob Johnson",
    "service": 3,
    "bio": "I am a professional landscaper",
    "email": "bob.johnson@example.com",
    "rating_provider": 0.0,
    "rating_recipient": 0.0,
    "available_provider": 1
}'
