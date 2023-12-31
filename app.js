const express =  require('express');
const bodyParser= require('body-parser');
const placesRoutes=require('./routes/places-route')
const mongoose = require('mongoose'); 
const usersRoutes = require('./routes/users-route');
const HttpError = require('./models/http-error');
const app = express();


app.use(bodyParser.json());
app.use('/api/places',placesRoutes);
app.use('/api/users',usersRoutes);


app.use((req,res,next)=>{
  const error  = new HttpError('could not find this route.',404);
  throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
  });
  mongoose.connect('mongodb+srv://bhanuakiri2001:ZcnMN1uWpA1q30Cs@cluster0.7aktpk6.mongodb.net/places?retryWrites=true&w=majority')
  .then(()=>{
    app.listen(5000);
  })
  .catch(err =>{
    console,log(err);
  });
