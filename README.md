# expense-tracker-app
A fullstack app working as an expense manager and tracker. Also a chance to play with GraphQL.  
Everything WIP.

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
Just rename the `config-template.json` file in the `/server/api/config` folder to `config.json`.
You can now specify up to three different connection parameters, based on working environment (development, test, production). If you're unsure what to change, you should edit the `development` params.