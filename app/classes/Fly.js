'use strict'

const http = require('http')
import middle from '../components/middle'

export default class Fly {
		middleware = []

		use(fn) {
			this.middleware.push(fn)
		}

		listen(...args) {
			return http.createServer(this.handle()).listen(...args)
		}

		handle() {
			const fns = middle(this.middleware)
			return (req, res) => {
				const ctx = {req, res}
				fns(ctx)
					.then(() => this.finishResponse(ctx))
					.catch(e => {
						console.log(e)
						res.writeHead(500, { 'Content-Type': 'text/plain' })
						res.end('Error')
					})
			}
		}

		finishResponse({ res, status = 200, contentType = 'application/json', body = '' }) {
			res.writeHead(status, { 'Content-Type': contentType })
			res.end(contentType === 'application/json' ? JSON.stringify(body) : body)
		}
}
