import SWebComponent from 'coffeekraken-sugar/js/core/SWebComponent'
import __bodymovin from 'bodymovin'
import __whenProperty from 'coffeekraken-sugar/js/utils/objects/whenProperty'

/**
 * @name 		SBodymivinComponent
 * @extends 	SWebComponent
 * Simple webcomponent wrapper around the freaking cool bodymovin library.
 * Features:
 * - All bodymovin capabilities
 * - Use it as an image tag ```<s-bodymovin src="..."></s-bodymovin>```
 * - Support a reactive mode that play the animation when a special class is detected
 * - Cool "yoyo" mode that will play the animation backward when complete
 *
 * @example 	html
 * <s-bodymovin src="my-cool-animation.json" yoyo></s-bodymovin>
 *
 * @see 		http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0 		Bodymovin repository
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */
export default class SBodymovinComponent extends SWebComponent {

	/**
	 * Default props
	 * @definition 		SWebComponent.defaultProps
	 * @protected
	 */
	static get defaultProps() {
		return {

			/**
			 * Bodymovin animation data object
			 * @prop
			 * @type 	{object}
			 * @see 	http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
			 */
			animationData : null,

			/**
			 * Bodymovin json animation relative path
			 * @prop
			 * @type 	{String}
			 * @see 	http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
			 */
			path : null,

			/**
			 * Alias to the "path" prop
			 * @prop
			 * @type 	{String}
			 * @see 	http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
			 */
			src : null,

			/**
			 * Set if the animation has to loop or not
			 * @prop
			 * @type 	{Boolean}
			 * @see 	http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
			 */
			loop : false,

			/**
			 * Set if the animation has to autoplay or not
			 * @prop
			 * @type 	{Boolean}
			 * @see 	http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
			 */
			autoplay : false,

			/**
			 * Specify the direction of the animation
			 * @prop
			 * @type 	{Integer}
			 * @see		http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
			 */
			direction : 1,

			/**
			 * Set the playback speed
			 * @prop
			 * @type 	{Number}
			 * @see 	http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
			 */
			speed : 1,

			/**
			 * Set a name to the animation to get it later through the bodymovin api
			 * @prop
			 * @type 	{String}
			 * @see 	http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
			 */
			name : null,

			/**
			 * Set the renderer to use
			 * @prop
			 * @type 	{String}
			 * @see 	http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
			 */
			renderer : 'svg',

			/**
			 * Specify when to play the animation
			 * @prop
			 * @type 	{String}
			 */
			playOn : null,

			/**
			 * Specify if we want the animation to react to a class change
			 * @prop
			 * @type 	{Boolean}
			 */
			reactive : false,

			/**
			 * Specify the class that the bodymovin will react to
			 * @prop
			 * @type	{String}
			 */
			reactiveClass : 'active',

			/**
			 * Specify if the animation has to take place when the reactive class is removed.
			 * If false, the animation will simply jump to start when the class is removed.
			 * @prop
			 * @type 	{Boolean}
			 */
			reactiveBackward : false,

			/**
			 * Specify if the animation has to play backward when arrived to the end. Like a yoyo
			 * @prop
			 * @type 	{Boolean}
			 */
			yoyo : false,

			/**
			 * Specify the speed for the yoyo backward animation
			 * @prop
			 * @type 	{Number}
			 */
			yoyoSpeed : 1,

			/**
			 * Specify how many time to wait before playing the animation back to his starting point
			 * @prop
			 * @type 	{Number}
			 */
			yoyoTimeout : 0,

			/**
			 * Specify the laoding class to set on the element before the animation is ready to play
			 * @prop
			 * @type 	{String}
			 */
			loadingClass : 'loading',

			/**
			 * Listen for classes changes
			 * @protected
			 */
			class : null

		};
	}

	/**
	 * Physical props
	 * @definition 		SWebComponent.physicalProps
	 * @protected
	 */
	static get physicalProps() {
		return [];
	}

	/**
	 * Css
	 * @protected
	 */
	static defaultCss(componentName, componentNameDash) {
		return `
			${componentNameDash} {
				display : inline-block;
			}
		`;
	}

	/**
	 * Component will mount
 	 * @definition 		SWebComponent.componentWillMount
	 * @protected
	 */
	componentWillMount() {
		super.componentWillMount();
	}

	/**
	 * Mount component
	 * @definition 		SWebComponent.componentMount
	 * @protected
	 */
	componentMount() {
		super.componentMount();

		// init bodymovin
		this.bodymovin = __bodymovin.loadAnimation({
			...this.props,
			container : this,
			loop : ! this.props.yoyo ? this.props.loop : false,
			path : this.props.path || this.props.src
		});
		this.bodymovin.setDirection(this.props.direction);
		this.bodymovin.setSpeed(this.props.speed);

		// add the loading class
		this.classList.add(this.props.loadingClass);

		// when is ready
		__whenProperty(this.bodymovin, 'isLoaded', (value) => {
			return value === true
		}).then((property) => {
			setTimeout(() => {
				this._onAnimationReady();
			});
		});

		// bodymovin proxy
		this._exposeBodymovinFn([
			'play',
			'stop',
			'pause',
			'setSpeed',
			'goToAndPlay',
			'goToAndStop',
			'setDirection',
			'playSegments'
		]);
	}

	/**
	 * Component will receive prop
	 * @definition 		SWebComponent.componentWillReceiveProp
	 * @protected
	 */
	componentWillReceiveProp(name, newVal, oldVal) {
		switch(name) {
			case 'speed':
				this.bodymovin.setSpeed(newVal);
			break;
			case 'direction':
				this.bodymovin.setDirection(newVal);
			break;
			case 'class':
				newVal = typeof(newVal) !== 'string' ? '' : newVal;
				oldVal = typeof(oldVal) !== 'string' ? '' : oldVal;
				// check reactiveClass<
				if (this.props.reactive) {
					const classes = newVal.split(' ');
					const oldClasses = oldVal.split(' ');
					if (classes.indexOf(this.props.reactiveClass) === -1 && oldClasses.indexOf(this.props.reactiveClass) !== -1) {
						if (this.props.reactiveBackward) {
							// play back
							this.bodymovin.setDirection(-1);
							this.bodymovin.goToAndPlay(this.bodymovin.totalFrames, true);
						} else {
							// goto frame 0 without playing
							this.bodymovin.goToAndStop(0,true);
						}
					} else if (classes.indexOf(this.props.reactiveClass) !== -1 && oldClasses.indexOf(this.props.reactiveClass) === -1){
						// play forward if needed
						this.bodymovin.setDirection(1);
						this.bodymovin.goToAndPlay(0,true);
					}
				}
			break;
		}
	}

	/**
	 * Actual real init method that will be fired when the bodymovin animation is ready
	 */
	_onAnimationReady() {

		// remove the loading class
		this.classList.remove(this.props.loadingClass);

		// reactiveClass
		if (this.props.reactive && this.classList.contains(this.props.reactiveClass)) {
			this.bodymovin.goToAndStop(this.bodymovin.totalFrames, true);
		}

		// check the play on prop
		if (this.props.playOn) {
			this.addEventListener(this.props.playOn, (e) => {
				this.bodymovin.goToAndPlay(0,true);
			});
		}

		// handle yoyo
		if (this.props.yoyo) {
			this.bodymovin.addEventListener('complete', (e) => {
				if (this.bodymovin.currentFrame <= 0) {
					this.bodymovin.setSpeed(this.props.speed);
					this.bodymovin.setDirection(1);
				} else {
					setTimeout(() => {
						this.bodymovin.setSpeed(this.props.yoyoSpeed);
						this.bodymovin.setDirection(-1);
					}, this.props.yoyoTimeout);
				}
				if (this.props.loop || this.bodymovin.currentFrame > 0) {
					this.bodymovin.play();
				}
			});
		}

		// this.props.queuePoints = {
		// 	0 : 'one',
		// 	35 : 'two',
		// 	52 : 'three'
		// }
		//
		// if (this.props.queuePoints) {
		//
		// 	this.bodymovin.addEventListener('enterFrame', (e) => {
		// 		console.log('enterframe', e);
		// 		if (this.__bodymovinPlayTimeout) return
		// 		if (this.props.queuePoints[Math.round(e.currentTime)]) {
		// 			console.log('seg');
		// 			this.bodymovin.pause();
		// 		}
		//
		// 	});
		// }
	}

	/**
	 * Expose some bodymovin functions on the component iutlself
	 */
	_exposeBodymovinFn(fns) {
		// loop on each functions to expose
		fns.forEach((fn) => {
			this[fn] = function() {
				this.bodymovin[fn].apply(this.bodymovin, arguments);
			}
		});
	}

	/**
	 * @name 	bodymovin
	 * Heres the list of bodymovin methods that are exposed on the component itself:
	 * - play()
	 * - pause()
	 * - stop()
	 * - setSpeed(speed)
	 * - setDirection(direction)
	 * - goToAndPlay(timeOrFrame, isFrame)
	 * - goToAndStop(timeOrFeame, isFrame)
	 * - playSegments(segments)
	 */
}
