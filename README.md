# Moods

The idea is that I want to have a place where, if you’re having a hard time, you can come to 'moods' and share what’s got you in a mood- share a gif that exemplifies your mood, post a picture - and get support (ideally) from the commenters.

# Getting Started

To create this app, I used wireframes and ERDs (pictured below) as well as a Trello board (pictured below) as guides to help me establish and meet my goals. To deploy this app, you will need to open a coding program and install all required programs and set up Google Oath credentials.

# App Inspiration

I was inspired by conversations I've had with classmates who needed a person who could listen and hear their pain and stress. I know that a lot of people don't have a person like that in their lives so I wanted to build a place where they could go and get that support.

# Design inspiration

Within my vision for the app- that being building a community in a series of emotional moments- I felt like we would be building a scrapbook of us and our lives together. And I wanted to reflect that in the design. So the backgrounds look like pages out of a scrapbook and I think enhance that feeling.

# Wireframes

![Wireframe 1](./images/Wireframe-Page1.png)

![Wireframe 2](./images/Wireframe-Page2.png)

![Wireframe 3](./images/Wireframe-Page3.png)

# ERD Diagrams

![Initial ERD](./images/ERD-Diagram.png)

![Updated ERD](./images/Updated-ERD-Diagram.png)

# Trello Board

![Trello Board](./images/Trello-Board.png)

# App Screenshots

![Login Page](./images/Login-Page.png)

![Dashboard](./images/Dashboard.png)

![Edit Page](./images/Edit-Page.png)

![Create Mood Page](./images/New-Page.png)

![Comments Page](./images/Show-Page.png)

# Live Site

[Link to App](https://moodsblog.herokuapp.com/) to open app in browser.


# Technologies

* HTML
* CSS
* Javascript
* Bootstrap
* EJS
* Express
* Node.js
* Mongoose
* Google People Api
* Google Oath
* MongoDB
* Heroku

# Unsolved Problems

1. I was able to have full CRUD functionality on my moods (posts), but was not able to add the same functionality to my comments. I planned on allowing each user to post, edit and delete their comments, but ran into huge issues with mongo. It was creating a new user Id # for each user each time they signed in. The user Id # is how we identify one user from another so a user couldn't delete their comment if it was restricted to the user who posted it since according to the database, they were not that user. I was able to fix that error, but still could not figure out how to delete a comment. That is something I plan on working on in the future.

2. On my comments page, I planned and coded for the profile picture and user name of the user who posted the mood to appear along with their post. Unfortunately it will not appear so in it's place at this time, I have put a random kitten. I hope to make that work in the near future.


# Future Enhancements

In the future, I would like to add in the functions that I set out to include:

1. I would like the user to be able to add a gif to their post to exemplify their mood. There just wasn't enough to look into that option.

2. I would like the user to be able to upload a picture to exemplify their experience if they feel the community might need that to understand their situation

# Authors
 Chengusoyane Kargbo - *Initial work* - [ChenguK](https://github.com/ChenguK)

# Acknowledgements
 Thank you to anyone whose code inspired me (all of SEI-R 629) and to all those who helped me create this site. Especially our amazing instructions!