<p align="center">
  <a href="https://gitpoint.co/">
    <img alt="Know Thyself" title="Know Thyself" src="https://i.imgur.com/Q3qbgNu.png" width="450">
  </a>
</p>

<p align="center">
  Simple Journaling - Hard Prompts
</p>


Know Thyself if a web journaling app to help build self knowledge through the practice of responding to thought provoking writing prompts with a minimum word count.

## Features
  - Login with Google or make a new account locally
  - See the weather and time in your area
  - Get supplied with thought provoking prompts for journaling
  - Ability to write words on said prompt
  - Complete at least 500 words on that prompt to save it
  - View entries and prompts from past days
  - Habit Tracker (add, track and remove habits)

## Getting Started / Installing

#### [-Use our App on Heroku-](https://knowthyself-mtcs.herokuapp.com/)


#### Install locally following these steps
- Clone or fork the repo
- In the root folder... ```npm install```.
- In knowthyself/frontend... ```npm install```

This will install all the dependencies needed to run locally.

* To setup Oauth login
- go to console.developer.google.com
- creat a new project 
- search from Oauth api
- from there create credientials => create Oauth client ID
- in credientals => Oauth consent screen
- add authorized domain - it will be localhost://3000
- go back to credentials => click on your project
- add your origin URI (eg.localhost://3000) and your redirect URI (eg localhost://3000/auth/google & localhost://3000/profile)
- add client secret and client ID
- make an .env file in the root directory and plug in all this information
- .env files are formatted like this ```SOME_VAR=somevalue```

To run locally you need to...
- Have two instances of terminal open
- In one, window the root folder...```npm run dev```
- The other, in knowthyself/frontend... ```npm start```


## Built With

* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Heroku](https://heroku.com/)
* [Passport](http://www.passportjs.org/)
* [OAuth](https://oauth.net/)
* [JWT](https://jwt.io/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [MLAB](https://mlab.com/)
* [React](https://reactjs.org/)
* [Material UI](https://material-ui.com/)


## Authors


* **[Jake Marsh](https://github.com/JMarsh2201)** - *Initial work*
* **[Alison Morgan](https://github.com/alison-morgan)** - *Initial work*  
* **[Kyle Gillett](https://github.com/kegillett)** - *Initial work*



## Acknowledgments

* Our Family and Friends!!!
* [Montana Code School](https://montanacodeschool.com/)
* [750words.com](750words.com) - For Inspiration
* [Ed Weymouth](https://github.com/ed42311)
* [Jack Peterson](https://github.com/jack829)
