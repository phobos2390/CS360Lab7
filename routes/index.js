var express = require('express');
var fs = require('fs');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) 
{
  res.render('index', { title: 'Express' });
});

router.get('/getcity', function(req, res, next) 
{
	console.log(req.query);
	var regExpression = new RegExp("^" + req.query.q);
	fs.readFile(__dirname + '/cities.dat.txt',function(err,data) 
	{
		if(err) 
		{
			throw err; 
		}
		var cities = data.toString().split("\n"); 
		var jsonresult = [];
		for(var i = 0; i < cities.length; i++) 
		{ 
			var result = cities[i].search(regExpression);
			if(result != -1)
			{
				jsonresult.push({city:cities[i]});
				console.log(cities[i]);
			}
			console.log(cities[i]); 
		}
		res.status(200).json(jsonresult);
	});
});

module.exports = router;
