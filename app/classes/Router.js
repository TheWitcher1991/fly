'use strict'

import middle from '../components/middle'

export default class Router {

	routes = {}

	constructor() {
		for (const method of ['get', 'post', 'put', 'delete']) {
			this[method] = (path, ...args) => {
				const fns = middle(args)
				if (!this.routes[path]) this.routes[path] = {}
				this.routes[path][method] = fns
			}
		}
	}

	toMiddleware() {
		return (ctx, next) => {
			const { path, method } = ctx
			if (!this.routes[path]) {
				ctx.body = { mesage: 'Not Found' }
				ctx.status = 404
				return Promise.resolve()
			}
			if (!this.routes[path][method]) {
				ctx.body = { message: 'Method not supported' }
				ctx.status = 405
				return Promise.resolve()
			}
			return this.routes[path][method](ctx, next)
		}
	}
}
