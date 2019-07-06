var Product = require('../models/menu');
var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://sonusourav:mongopass@instigo-server-ytfvu.gcp.mongodb.net/api?retryWrites=true&w=majority",{useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection failed!");
  });
var products = [
new Product({
			day:0,
			breakfast:{"time":"7:30-9:30 am","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			lunch:{"time":"12:30-2:30 pm","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			snacks:{"time":"4:30-6:00 pm","item":"Masala Dosa,Coconut Chutney,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			dinner:{"time":"8:00-9:30 am","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0}
}),
new Product({
			day:1,
			breakfast:{"time":"7:30-9:30 am","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			lunch:{"time":"12:30-2:30 pm","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			snacks:{"time":"4:30-6:00 pm","item":"Masala Dosa,Coconut Chutney,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			dinner:{"time":"8:00-9:30 am","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0}
}),
new Product({
			day:2,
			breakfast:{"time":"7:30-9:30 am","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			lunch:{"time":"12:30-2:30 pm","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			snacks:{"time":"4:30-6:00 pm","item":"Masala Dosa,Coconut Chutney,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			dinner:{"time":"8:00-9:30 am","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0}
}),
new Product({
			day:3,
			breakfast:{"time":"7:30-9:30 am","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			lunch:{"time":"12:30-2:30 pm","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			snacks:{"time":"4:30-6:00 pm","item":"Masala Dosa,Coconut Chutney,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			dinner:{"time":"8:00-9:30 am","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0}
}),
new Product({
			day:4,
			breakfast:{"time":"7:30-9:30 am","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			lunch:{"time":"12:30-2:30 pm","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			snacks:{"time":"4:30-6:00 pm","item":"Masala Dosa,Coconut Chutney,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			dinner:{"time":"8:00-9:30 am","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0}
}),
new Product({
			day:5,
			breakfast:{"time":"7:30-9:30 am","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			lunch:{"time":"12:30-2:30 pm","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			snacks:{"time":"4:30-6:00 pm","item":"Masala Dosa,Coconut Chutney,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			dinner:{"time":"8:00-9:30 am","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0}
}),
new Product({
			day:6,
			breakfast:{"time":"7:30-9:30 am","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			lunch:{"time":"12:30-2:30 pm","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			snacks:{"time":"4:30-6:00 pm","item":"Masala Dosa,Coconut Chutney,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0},
			dinner:{"time":"8:00-9:30 am","item":"Masala Dosa,Coconut Chutney ,Sambhar ,Moong Sprouts,Egg Bhurji,Seasonal Fruit","raters":0,"ratings":0}
})
];
var done =0;
for(var i=0; i<products.length; i++){
	products[i].save(function(err,result){
		done++;
		if (done == products.length) {
			console.log("Added successfully");
			exit();
		}
	});
}
function exit(){
	mongoose.disconnect();
}