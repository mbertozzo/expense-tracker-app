# expense-tracker-app
A fullstack app working as an expense manager and tracker. Also a chance to play with GraphQL.  
Everything WIP.

![Expense Tracker Screenshot](screenshot.png)

### What's under the hood?
The project is built on top of react-boilerplate, as such it runs on Node.js, Express and (surprise!) React.  
Sequelize.js is used as ORM to retrieve and store data from and to MySQL.  
Apollo Server extends Express and works as GraphQL server.


## Getting started
To get a working local copy of the project clone this repo to your machine and install the dependencies with

```bash
$ npm install
```

Please note that in order for everything to work, you'll need MySQL up and running on your machine, or a MySQL server you can connect to.

### Configuring the connection parameters for the DB
Just rename the `.env-template` file in the root folder to `.env`.
You can now specify up to three different connection parameters, based on working environment (development, test, production). If you're unsure what to change, you should edit the `development` params.

### Ready to go!
Finally, you can run the project by typing in your console

```bash
$ npm start
```

This will fire up Node and create two tables (`movement` and `category`) in the DB you specified in the `.env` file. Please note that previously existing tables **with the same name** will be dropped. To prevent this, in the `.env` file you can set the `DROP_EXISTING_TABLES` variable to `false`.  

You can also initialize the app with some randomly generated data, to test out features with ease: in the `.env` file, just set the `INIT_DUMMY_DATA` variable to `true`.


## Curiosity
Each version of the app is codenamed after a California city, following an alphabetical order.  
So here it is, this first, work-in-progress version is called **Avenal**. According to Wikipedia, the name was given by Spanish soldiers and explorers, since the area where the city is located was once covered with wild oats, and "avenal" means oatfield in Spanish.