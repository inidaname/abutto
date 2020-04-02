/*
  Not Found Error Handler
*/
exports.notFound = (req, res, next) => {
	const err = new Error('Route Not Found');
	err.status = 404;
	next(err);
};

/*
  Development Error Handler
*/
exports.developmentErrors = (err, req, res) => {
	err.stack = err.stack || '';
	const errorDetails = {
		// message: err.message,
		stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
	};
	res.status(err.status || 500);
	res.format({
		// Form Submit, Reload the page
		'application/json': () => res.json(errorDetails), // Ajax call, send JSON back
		// Based on the `Accept` http header
		'text/html': () => {
			res.json(errorDetails);
		}
	});
};

/*
  Production Error Handler
*/
exports.productionErrors = (err, req, res) => {
	res.status(err.status || 500);
	res.json({
		'error': {
			'message': err.message,
			error: {}
		}
	});
};