'use strict';

var lists = require('nosqldb')('lists');

var whitelistUpdates = function(args) {

	//whitelisting our data updates to only allow keys id, name, and finished
	return _.pick(args || {}, 'id', 'name', 'finished');

};

module.exports = function(app, express) {

	/* RENDER OUR HOME PAGE WITH SAVED LISTS */

	app.get('/', function(req, res) {

		var foundLists = lists.all();

		var message = 'We have ' + foundLists.length + ' lists in our system:'

		var data = {
			greeting: 'Hi!',
			message: message,
			lists: foundLists
		};

		return res.render('home', data);

	});

	/* 
	BASIC API

	/api/lists/ [get, post] (collection of lists)
	/api/lists/:list_id [get, put, delete] (single list)
	*/


	var listsRouter = express.Router();

		listsRouter.route('/')

			//fetch entire collection
			.get(function(req, res) {

				var data = lists.all();

				var status = data.length > 0 ? 200 : 404;

				return res.status(status).send({
					status: status,
					message: 'Here are all the lists!',
					data: data
				});

			})

			//create item in collection
			.post(function(req, res) {

				var values = whitelistUpdates(req.body);

				lists.create(values);

				return res.status(204).send();

			});

		listsRouter.route('/:list_id')

			//get individual
			.get(function(req, res) {

				var data = lists.where({ id: req.params.list_id });

				return res.status(200).send({
					status: 200,
					message: 'Here is one list!',
					data: data
				});

			})

			//update individual
			.put(function(req, res) {

				var values = whitelistUpdates(req.body);

				lists.update({ id: req.params.list_id }, values);

				return res.status(204).send();

			})

			//delete individual
			.delete(function(req, res) {

				lists.delete({ id: req.params.list_id });

				return res.status(204).send();

			});


	app.use('/api/lists', listsRouter);

	return app;

};
