curl --location --request POST 'http://localhost:2000/user/create/' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "available_provider": "1",
    "bio": "cs32",
    "email": "alyssa_loo@brown.edu",
    "id": "109585309523249677212",
    "name": "Alyssa Marie Li Ann Loo",
    "picture": "https://lh3.googleusercontent.com/a/AGNmyxYhdWN5oQjD2jIX2gSJatK4EDoj0UKbDetsLMggpaE=s96-c",
    "role": "user",
    "service": 1
  }'

curl --location --request POST 'http://localhost:2000/user/create/' \
--header 'Content-Type: application/json' \
--data-raw '
{
    "available_provider": "0",
    "bio": "32cs",
    "email": "alyssa_loo1@brown.edu",
    "id": "100095258518480076485",
    "name": "Alyssa Marie Li Ann Loo",
    "picture": "https://lh3.googleusercontent.com/a/AGNmyxYhdWN5oQjD2jIX2gSJatK4EDoj0UKbDetsLMggpaE=s96-c",
    "role": "user",
    "service": 2
  }'