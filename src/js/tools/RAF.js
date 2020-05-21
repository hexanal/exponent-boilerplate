/**
 * Taken from: https://github.com/akufenstudio/nsfw/blob/master/src/akfn/nsfw/managers/RafManager.js
 * Sorry, I didn't need the whole lib... maybe one day?
 * I removed all the comments in a blind rage
 */

class RAF {
	constructor() {
		this.update = this.update.bind(this);
		this.binders = [];
		this.raf = null;
		this.now = Date.now();
		this.time = this.now;
		this.deltaTime = 0;
	}

	static start() {
		if(!RAF.INSTANCE) RAF.INSTANCE = new RAF();

		RAF.INSTANCE.update();
	}

	static stop() {
		window.cancelAnimationFrame( RAF.INSTANCE.raf );
	}

	update() {
		this.now = Date.now();
		this.deltaTime = this.now - this.time;
		this.time = this.now;

		for (let i=0; i < this.binders.length; i++) this.binders[i].fn( this.deltaTime );

		this.raf = window.requestAnimationFrame( this.update );
	}

	static bind(id, fn) {
		const _this = RafManager.INSTANCE;

		if ( typeof id !== 'string' ) {
			console.error('RAF :: Bind :: Invalid ID', id);
			return;
		}

		if ( typeof fn !== 'function' ) {
			console.error('RAF :: Bind :: Invalid Function', fn);
			return;
		}

		// use id check
		for ( let i = 0; i < _this.binders.length; i++ ) {
			const b = _this.binders[i];

			if (b.id === id ) {
				console.warn('RAF :: Bind :: ID already used !', id);
				return;
			}
		}

		RafManager.INSTANCE.binders.push({id:id,fn:fn});
	}

	static unbind(id) {
		const _this = RafManager.INSTANCE;

		for ( let i = 0; i < _this.binders.length; i++ ) {
			if (_this.binders[i].id === id) {
				_this.binders.splice(i, 1);
				break;
			}
		}
	}

	static debug () {
		console.table( RAF.INSTANCE.binders );
	}
}

export default RAF;
