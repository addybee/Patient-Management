// declaring modules and npm packages that will be used in this module
const  express= require('express');
const helmet=require('helmet');
const morgan=require('morgan');
const patients = require('./routes/patients');

const app =express();//this returns an object called app

// applying middleware functions and routers in the request processing pipeline
app.use(express.json());
app.use(helmet());
app.use('/api/patients', patients);

if(app.get('env')=='development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}
// setting the listening port
port =process.env.PORT|| 1000;
app.listen(port,()=>console.log(`listening to port ${port}...`));