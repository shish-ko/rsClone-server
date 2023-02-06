# Server for rsClone-geogesser

To run it localy: clone repo and than run **npm install** and **npm run start** commands.


# API
Hostname: **https://rsclone-server.onrender.com/**
> Each following behavior can be changed during team conversations.


##  /auth/registraion
Method: **POST**;
Accept: JSON
```
{
"username": "example",
"password": "example"
}
```
Returns: 
 - Code: 201,
 - body.message: 'New user has been added'
 
 OnError:
 - Code: 500,
 - body.message: 'Oops, something went wrong'


##  /auth/login
Method: **POST**;
body: JSON
```
{
"username": "example",
"password": "example"
}
```
Returns: 
 - Code: 200,
 - body.token: JWT-token,
 - body.topScores: [topScores]
  > JWT token expires in **24h**
  
 OnError:
 1. Incorrect username
 - Code: 400;
 - body.message: 'No user find with provided username'
 2. Invalid password
 - Code: 400,
 - body.message: 'Invalid password!'
 3. Else
 - Code: 500,
 - body.message: "Interval server error"

## /score

method: **GET**
headers:  **Authorization: JWT-token**

Returns: 
- Code: 200;
- body.topScores: [topScores]

OnError:
- Code: 400;
- body.message: "Invalid token or token has expired"

------------------------
method: **POST**
headers:  **Authorization: JWT-token**
body.score: new score

Returns: 
- Code: 201;
- body.topScores: [topScores]

OnError:
1. Invalid or expired token
- Code: 400;
- body.message: "Token has expired. Try to login again"

2. No score provided in body
- Code: 400
- body.message: "No score is provided"

3. Else
 - Code: 500
 - body.message: "Interval server error" 

## /custom

method: **GET**

Returns: 
- Code: 200;
- body: [customGames]

OnError:
- Code: 500;
- body.message: Interval server error"

------------------------
method: **POST**
body.gameSet: [12 rounds ]
```
[{"latLng":{"lat":"42.12","lng":"41.13"},"city":"Minsk"}, ...]
```
Returns: 
- Code: 201;
- body.message: "Game has been successfully added"

OnError:
- Code: 400;
- body.message: Error object *with validation error*

