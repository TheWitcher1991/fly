'use strict'

import { Fly  } from '../build/fly.min'

const app = new Fly()

app.listen(8080, () => {
	console.log('Server has been Started...')
})

