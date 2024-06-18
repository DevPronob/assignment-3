## Live Link
**https://car-rental-service-assignment.vercel.app/**

## Used Tecnology
1.Node Js
2.Express Js
3.Typescript 
4.MongoDb
5.Zod (For Validattion)
6.JWT (For Authentation and Authorizion)
7.Bcrypt (For hassing password)

## Features Implemented
1.Authentication and Authorization:JWT-based authentication middleware.
2.CURD Operations for User Management,Car Management,Booking Management.
3.Error Handling for Global error handling with custom error response middleware to catch and handle errors.
3.Zod Validation for Data Validation.

## how to run the application locally

Firstly you have first to clone your repo
git clone https://github.com/DevPronob/assignment-3.git

then when the repository has been cloned <br/>
cd assignment-3

and then open the vs code with this file.then you have to see where .env(prossess.env.--) is used .
create a .env file in the root. then go to  mongodb site. <br/>
collect the mongodb url and paste it in the .env file with a proper name 
nad aslo add the port number with name in the .env file . <br/>
then go to the config >index.ts file . add .env file names in index.ts like <br/>

export default {
    port: process.env.PORT,<br/>
    mongodb_url: process.env.MONGO_URL,<br/>
    bcrypt_salt_rounds: process.env.SALT_ROUND,<br/>
    NODE_ENV: process.env.NODE_ENV,<br/>
    jwt_secrect: process.env.JWT_SECRECT
};
<br/>
process.env.YOUR .ENV FILE PORT <br/>
process.env.YOUR .ENV FILE DATABASE URL

<br/>
that. 
<br/> after adding that go to the server.ts file and see all the configeration is correct or not.<br/>
then add the commend 
npm run start:dev
if then <br/>
Example app listening on port 5000 <br/>
this messaage is coming in the console then every thing is ok <br/>

then you can use the application locally .
