const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/jokesDB',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
const jokeSchema = {
	title: String,
	content: String
};

const Joke = mongoose.model('Joke', jokeSchema); // will auto create db, with name 'jokes'

// chained route handlers
app.route('/jokes')
	.get((req, res) => {
		Joke.find((err, jokes) => {
			if (!err) {
				res.send(jokes);
			} else {
				res.send(err);
			}
		});
	})
	.post((req, res) => {
		console.log(req.body.title);
		console.log(req.body.content);
		let newJoke = new Joke({
			title: req.body.title,
			content: req.body.content
		});

		newJoke.save((err) => {
			if (!err) {
				res.send('Data save');
			} else {
				res.send(err);
			}
		})
	})
	.delete((req, res) => {
		Joke.deleteMany((err) => {
			if (!err) {
				res.send("Successfully deleted all records.");
			} else {
				res.send(err);
			}
		});
	});

app.listen(PORT, () => {
	console.log(`${PORT} port is running`);
});