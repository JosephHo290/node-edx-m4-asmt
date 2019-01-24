const express = require('express') 
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/test')

const Account = mongoose.model('Account', 
  { name: String,
    balance: Number
  }
 )


let app = express()
app.use(logger('dev'))
app.use(bodyParser.json())


  app.get('/accounts', (req, res) => {
	  Account.find({},null,{sort:{
        '_id': -1 //Sort by _id DESC
		}},function(err2,obj2) { 
	if(err2) console.log("ERR occurs" + err2)
		res.send(obj2);
		//mongoose.disconnect()
		})
    })
  
  app.post('/accounts', (req, res) => {
    const a = new Account(req.body)
	a.save((error, results) => {
      if (error) return next(error)
      res.send(results)
	  //mongoose.disconnect()
    })
  })
  
  app.put('/accounts/:id', (req, res) => {
	  console.log(req.body)
        Account.updateOne({_id: mongoose.Types.ObjectId(req.params.id)},  
							{$set: req.body}, 
			(error, results) => {
				if (error) return next(error)
				res.send(results)
				//mongoose.disconnect()
       }
     )
  })
  
  app.delete('/accounts/:id', (req, res) => {
	  //var hoID2 = new mongodb.ObjectID(req.params.id)
   
   Account.findOneAndDelete({_id: mongoose.Types.ObjectId(req.params.id)}, (error, results) => {
      if (error) return next(error)
      res.send(results)
	  //mongoose.disconnect()
   })
  })
  
  app.listen(3000,()=> {console.log("Server start listening @ port 3000")})