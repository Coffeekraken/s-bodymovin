'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SWebComponent2 = require('coffeekraken-sugar/js/core/SWebComponent');

var _SWebComponent3 = _interopRequireDefault(_SWebComponent2);

var _bodymovin = require('bodymovin');

var _bodymovin2 = _interopRequireDefault(_bodymovin);

var _whenProperty = require('coffeekraken-sugar/js/utils/objects/whenProperty');

var _whenProperty2 = _interopRequireDefault(_whenProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var SBodymovinComponent = function (_SWebComponent) {
	_inherits(SBodymovinComponent, _SWebComponent);

	function SBodymovinComponent() {
		_classCallCheck(this, SBodymovinComponent);

		return _possibleConstructorReturn(this, (SBodymovinComponent.__proto__ || Object.getPrototypeOf(SBodymovinComponent)).apply(this, arguments));
	}

	_createClass(SBodymovinComponent, [{
		key: 'componentWillMount',


		/**
   * Component will mount
  	 * @definition 		SWebComponent.componentWillMount
   * @protected
   */
		value: function componentWillMount() {
			_get(SBodymovinComponent.prototype.__proto__ || Object.getPrototypeOf(SBodymovinComponent.prototype), 'componentWillMount', this).call(this);
		}

		/**
   * Mount component
   * @definition 		SWebComponent.componentMount
   * @protected
   */

	}, {
		key: 'componentMount',
		value: function componentMount() {
			var _this2 = this;

			_get(SBodymovinComponent.prototype.__proto__ || Object.getPrototypeOf(SBodymovinComponent.prototype), 'componentMount', this).call(this);

			// init bodymovin
			this.bodymovin = _bodymovin2.default.loadAnimation(_extends({}, this.props, {
				container: this,
				loop: !this.props.yoyo ? this.props.loop : false,
				path: this.props.path || this.props.src
			}));
			this.bodymovin.setDirection(this.props.direction);
			this.bodymovin.setSpeed(this.props.speed);

			// add the loading class
			this.classList.add(this.props.loadingClass);

			// when is ready
			(0, _whenProperty2.default)(this.bodymovin, 'isLoaded', function (value) {
				return value === true;
			}).then(function (property) {
				setTimeout(function () {
					_this2._onAnimationReady();
				});
			});

			// bodymovin proxy
			this._exposeBodymovinFn(['play', 'stop', 'pause', 'setSpeed', 'goToAndPlay', 'goToAndStop', 'setDirection', 'playSegments']);
		}

		/**
   * Unmount component
   * @definition 		SWebComponent.componentUnmount
   * @protected
   */

	}, {
		key: 'componentUnmount',
		value: function componentUnmount() {
			// destroy bodymovin
			this.bodymovin.destroy();

			// make sure we call the parent method
			_get(SBodymovinComponent.prototype.__proto__ || Object.getPrototypeOf(SBodymovinComponent.prototype), 'componentUnmount', this).call(this);
		}

		/**
   * Component will receive prop
   * @definition 		SWebComponent.componentWillReceiveProp
   * @protected
   */

	}, {
		key: 'componentWillReceiveProp',
		value: function componentWillReceiveProp(name, newVal, oldVal) {
			switch (name) {
				case 'speed':
					this.bodymovin.setSpeed(newVal);
					break;
				case 'direction':
					this.bodymovin.setDirection(newVal);
					break;
				case 'class':
					newVal = typeof newVal !== 'string' ? '' : newVal;
					oldVal = typeof oldVal !== 'string' ? '' : oldVal;
					// check reactiveClass<
					if (this.props.reactive) {
						var classes = newVal.split(' ');
						var oldClasses = oldVal.split(' ');
						if (classes.indexOf(this.props.reactiveClass) === -1 && oldClasses.indexOf(this.props.reactiveClass) !== -1) {
							if (this.props.reactiveBackward) {
								// play back
								this.bodymovin.setDirection(-1);
								this.bodymovin.goToAndPlay(this.bodymovin.totalFrames, true);
							} else {
								// goto frame 0 without playing
								this.bodymovin.goToAndStop(0, true);
							}
						} else if (classes.indexOf(this.props.reactiveClass) !== -1 && oldClasses.indexOf(this.props.reactiveClass) === -1) {
							// play forward if needed
							this.bodymovin.setDirection(1);
							this.bodymovin.goToAndPlay(0, true);
						}
					}
					break;
			}
		}

		/**
   * Actual real init method that will be fired when the bodymovin animation is ready
   */

	}, {
		key: '_onAnimationReady',
		value: function _onAnimationReady() {
			var _this3 = this;

			// remove the loading class
			this.classList.remove(this.props.loadingClass);

			// reactiveClass
			if (this.props.reactive && this.classList.contains(this.props.reactiveClass)) {
				this.bodymovin.goToAndStop(this.bodymovin.totalFrames, true);
			}

			// check the play on prop
			if (this.props.playOn) {
				this.addEventListener(this.props.playOn, function (e) {
					_this3.bodymovin.goToAndPlay(0, true);
				});
			}

			// handle yoyo
			if (this.props.yoyo) {
				this.bodymovin.addEventListener('complete', function (e) {
					if (_this3.bodymovin.currentFrame <= 0) {
						_this3.bodymovin.setSpeed(_this3.props.speed);
						_this3.bodymovin.setDirection(1);
					} else {
						setTimeout(function () {
							_this3.bodymovin.setSpeed(_this3.props.yoyoSpeed);
							_this3.bodymovin.setDirection(-1);
						}, _this3.props.yoyoTimeout);
					}
					if (_this3.props.loop || _this3.bodymovin.currentFrame > 0) {
						_this3.bodymovin.play();
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

	}, {
		key: '_exposeBodymovinFn',
		value: function _exposeBodymovinFn(fns) {
			var _this4 = this;

			// loop on each functions to expose
			fns.forEach(function (fn) {
				_this4[fn] = function () {
					this.bodymovin[fn].apply(this.bodymovin, arguments);
				};
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

	}], [{
		key: 'defaultCss',


		/**
   * Css
   * @protected
   */
		value: function defaultCss(componentName, componentNameDash) {
			return '\n\t\t\t' + componentNameDash + ' {\n\t\t\t\tdisplay : inline-block;\n\t\t\t}\n\t\t';
		}
	}, {
		key: 'defaultProps',


		/**
   * Default props
   * @definition 		SWebComponent.defaultProps
   * @protected
   */
		get: function get() {
			return {

				/**
     * Bodymovin animation data object
     * @prop
     * @type 	{object}
     * @see 	http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
     */
				animationData: null,

				/**
     * Bodymovin json animation relative path
     * @prop
     * @type 	{String}
     * @see 	http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
     */
				path: null,

				/**
     * Alias to the "path" prop
     * @prop
     * @type 	{String}
     * @see 	http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
     */
				src: null,

				/**
     * Set if the animation has to loop or not
     * @prop
     * @type 	{Boolean}
     * @see 	http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
     */
				loop: false,

				/**
     * Set if the animation has to autoplay or not
     * @prop
     * @type 	{Boolean}
     * @see 	http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
     */
				autoplay: false,

				/**
     * Specify the direction of the animation
     * @prop
     * @type 	{Integer}
     * @see		http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
     */
				direction: 1,

				/**
     * Set the playback speed
     * @prop
     * @type 	{Number}
     * @see 	http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
     */
				speed: 1,

				/**
     * Set a name to the animation to get it later through the bodymovin api
     * @prop
     * @type 	{String}
     * @see 	http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
     */
				name: null,

				/**
     * Set the renderer to use
     * @prop
     * @type 	{String}
     * @see 	http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0
     */
				renderer: 'svg',

				/**
     * Specify when to play the animation
     * @prop
     * @type 	{String}
     */
				playOn: null,

				/**
     * Specify if we want the animation to react to a class change
     * @prop
     * @type 	{Boolean}
     */
				reactive: false,

				/**
     * Specify the class that the bodymovin will react to
     * @prop
     * @type	{String}
     */
				reactiveClass: 'active',

				/**
     * Specify if the animation has to take place when the reactive class is removed.
     * If false, the animation will simply jump to start when the class is removed.
     * @prop
     * @type 	{Boolean}
     */
				reactiveBackward: false,

				/**
     * Specify if the animation has to play backward when arrived to the end. Like a yoyo
     * @prop
     * @type 	{Boolean}
     */
				yoyo: false,

				/**
     * Specify the speed for the yoyo backward animation
     * @prop
     * @type 	{Number}
     */
				yoyoSpeed: 1,

				/**
     * Specify how many time to wait before playing the animation back to his starting point
     * @prop
     * @type 	{Number}
     */
				yoyoTimeout: 0,

				/**
     * Specify the laoding class to set on the element before the animation is ready to play
     * @prop
     * @type 	{String}
     */
				loadingClass: 'loading',

				/**
     * Listen for classes changes
     * @protected
     */
				class: null

			};
		}

		/**
   * Physical props
   * @definition 		SWebComponent.physicalProps
   * @protected
   */

	}, {
		key: 'physicalProps',
		get: function get() {
			return [];
		}
	}]);

	return SBodymovinComponent;
}(_SWebComponent3.default);

exports.default = SBodymovinComponent;