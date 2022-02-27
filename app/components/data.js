'use strict'

const url = require('url')

export default (ctx, next) => {
	const { req } = ctx,
	      { pathname, query } = url.parse(req.url, true)
	ctx.path = pathname
	ctx.query = query
	ctx.method = req.method.toLowerCase()
	return next()
}
