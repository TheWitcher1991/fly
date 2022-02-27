'use strict'

export default (ctx, next) => new Promise(resolve => {
	let buffer = ''
	ctx.req.on('data', chuck => buffer += chuck)
	ctx.req.on('end', () => {
		try {
			ctx.reqBody = JSON.parse(buffer)
		} catch (e) {
			ctx.reqBody = {}
		}
		resolve()
	})
}).then(() => next())
