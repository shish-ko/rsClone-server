
# Server for rsClone-geogesser

  

To run it localy: clone repo and than run **npm install** and **npm run start** commands.

  
  

# API

Hostname: **https://rsclone-server.onrender.com/**

> Each following behavior can be changed during team conversations.

  
  

## /auth/registraion
Method: **POST**;
*Adds new user to DataBase*

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

  
  

## /auth/login

Method: **POST**;
*Returns JWT-token and some user info*

Accept: JSON

```

{
"username": "example",
"password": "example"
}

```

Returns:

- Code: 200,
- body.token: JWT-token,
- body.totalScore: number

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
*Returns user's totalScore*

Accept: JSON
headers: **Authorization: JWT-token**  

Returns:
- Code: 200;
- body.totalScore: number

  

OnError:

- Code: 400;
- body.message: "Invalid token or token has expired"  

------------------------

method: **POST**
*Adds new score to user's scores.*

Accept: JSON
headers: **Authorization: JWT-token**

body.score: number  

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
*Returns an array of custom games (created by users)*
  

Returns:

- Code: 200;
- body: [customGames] 

OnError:

- Code: 500;
- body.message: Interval server error" 

------------------------

method: **POST**
*Adds new custom game to DataBase*

Accept: JSON
body.gameSet: [9 rounds ]
body.createdBy: string
bodycreatedDate: Date.now()
body.gameTitle: string
```

{createdBy: "userName", createdDate: 111111111111, votes: 5, gameTitle: "map Set", 
gameSet: [{"latLng":{"lat":"42.12","lng":"41.13"},"city":"Minsk"}, utc: "+3", continent: "Europe", picture: "flag URL"}, ...]

```

Returns:

- Code: 201;
- body.message: "Game has been successfully added"  

OnError:

- Code: 400;
- body.message: Error object *with validation error*

------------------------

method: **PATCH**
*Server checks if the game with Id exists, if *increase = false*,  decreases the votes property, or deletes the game if it reaches 0 votes. In case of *increase = true* , server adds one vote and saves the game.*

Accept: JSON

body._id: gameId
body.increase: boolean


Returns:

- Code: 200;
- body.message: "Thank for your voice!" or "Thank for your voice! Game was deleted"

OnError:

- Code: 400;
- body.message: "Interval server error"
