'use strict'

export default middle => (ctx, next) => (function dispath(i) {
	let fn = middle[i]
	if (i === middle.length) fn = next
	return fn ?
		Promise.resolve(fn(ctx, () => dispatch(i + 1))) :
		Promise.resolve()
})(0)
