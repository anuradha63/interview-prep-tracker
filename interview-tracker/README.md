
# Interview Tracker

Interview Tracker is an easy to use, community driven website aimed at helping students ace technical interviews. It is made using Node.js and uses MongoDB to store all the data.

🌐 **Live Demo:** https://interview-prep-tracker-kima.onrender.com

  - View and share important interview coding problems of various topics including trees, graphs, dynamic programming, greedy algorithm and many more.
  - Study and share the first-person interview experiences of students who have faced the interviews themselves in a blog like fashion.
  - Implemented login and signup features using JSONWebToken.
  - Implemented a custom Admin panel to manage the website, add/remove/view admins, and approve/disapprove requests to add new interview questions and experiences.

### Tech

Interview Tracker uses a number of open source projects to work properly:

* [mongodb] - a general purpose, document-based, distributed database built for modern application developers and for the cloud
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [EJS] - templating engine
* [JWT + bcrypt] - authentication and password encryption
* [Multer] - profile picture file uploads
* html, css, js - frontend



### Setting up

Requires [Node.js](https://nodejs.org/) v14+ to run.

1. Install node.js
2. Set up a MongoDB Atlas cluster and get your connection URI.
3. Open Interview Tracker using an editor like VS Code.
4. Create a `.env` file in the root directory:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```
5. Install the dependencies and start the server:
```sh
$ npm install
$ node seed.js
$ npm start
```
6. Run the website at http://localhost:3000/

> **Note:** Run `node seed.js` only once to initialise the database with topics and company data.

### Landing Page

![Landing Page](https://imgur.com/iUmdLou.jpg)

This is the first page you'll see when you open the website. Here you can signup, login or see the features and testimonials of the website.
The Start Preparing and Interview Experience pages require a valid logged in user. If you try to go to these pages without logging in, you'll be directed to the login page.
After logging in the navbar will show your username. There is a dropdown menu taking you to various parts of the website. The dropdown menu will contain an additional option of taking you to the admin panel, if you've logged in as an admin.

### Login/Signup

![Login](https://imgur.com/ayiugfA.jpg)

In these pages you signup for a new account or login to an existing one. These pages will give an error when you leave a field blank or make invalid inputs in the fields and then attempt to submit.

For login, the website will check if the email and password match, or if the account associated with the email exists or not. The signup page will check if the email id is in the correct form, ensure that the password is at least 8 characters long, verify that the uploaded image is a jpeg or png image within 5mb, and much more.

### Interview Preparation

![topics](https://imgur.com/pbHqrOI.jpg)

When you click on the Start Preparing button in the landing page or the Interview Preparation option from the navbar, you'll be taken to this page. Here you will see all the topics which currently have questions in them.
You can use the Add Question button to add your own question. The question will be added to this page once it is approved by the admin.

![questions](https://imgur.com/eObrm72.jpg)

Select any topic and you'll be directed to this page with all the questions on that topic. You will get information on the name of the question and the platform where you can solve that question. Clicking Visit Question will take you to a place where you can solve it. Hovering on this button will give information about the URL where you will be directed to.

### Interview Experience

![companies](https://imgur.com/5i7zOm1.jpg)

When you click on Interview Experience button in the landing page or from the navbar, you'll be taken to this page. All the companies for which people have shared their experience will be displayed here. It will also show the number of experiences for each company.

You can use the Add Experience button to write your own interview experience and send it for approval.

![experiences](https://imgur.com/0K8tbaW.jpg)

Here you will be able to see all the experiences of users for a particular company. You can also see information about the user as well as their profile pic. Some experiences can be long and have a See More option. Use the Back button to go back a page.

### Admin Panel

![Admin Panel](https://imgur.com/bwZjD7H.jpg)

The admin panel can be accessed from the navbar if you are an admin. It provides you with a variety of options:
- Add or remove admins
- Approve or reject submitted interview questions
- Approve submitted interview experiences


