# SBodymivinComponent

Extends **SWebComponent**

Simple webcomponent wrapper around the freaking cool bodymovin library.
Features:
- All bodymovin capabilities
- Use it as an image tag ```<s-bodymovin src="..."></s-bodymovin>```
- Support a reactive mode that play the animation when a special class is detected
- Cool "yoyo" mode that will play the animation backward when complete


### Example
```html
	<s-bodymovin src="my-cool-animation.json" yoyo></s-bodymovin>
```
See : **Bodymovin repository** : [http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0](http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0)

Author : Olivier Bossel [olivier.bossel@gmail.com](mailto:olivier.bossel@gmail.com)




## Attributes

Here's the list of available attribute(s).

### animationData

Bodymovin animation data object

Type : **{ object }**

See : **See more** : [http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0](http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0)

Default : **null**


### path

Bodymovin json animation relative path

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

See : **See more** : [http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0](http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0)

Default : **null**


### src

Alias to the "path" prop

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

See : **See more** : [http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0](http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0)

Default : **null**


### loop

Set if the animation has to loop or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

See : **See more** : [http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0](http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0)

Default : **false**


### autoplay

Set if the animation has to autoplay or not

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

See : **See more** : [http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0](http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0)

Default : **false**


### autoplayDelay

Specify a delay in ms to autoplay the animation

Type : **{ Integer }**

Default : **0**


### direction

Specify the direction of the animation

Type : **{ Integer }**

See : **See more** : [http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0](http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0)

Default : **1**


### speed

Set the playback speed

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

See : **See more** : [http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0](http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0)

Default : **1**


### name

Set a name to the animation to get it later through the bodymovin api

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

See : **See more** : [http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0](http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0)

Default : **null**


### renderer

Set the renderer to use

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

See : **See more** : [http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0](http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0)

Default : **svg**


### playOn

Specify when to play the animation

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **null**


### reactive

Specify if we want the animation to react to a class change

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**


### reactiveClass

Specify the class that the bodymovin will react to

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **active**


### reactiveBackward

Specify if the animation has to take place when the reactive class is removed.
If false, the animation will simply jump to start when the class is removed.

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**


### yoyo

Specify if the animation has to play backward when arrived to the end. Like a yoyo

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **false**


### yoyoSpeed

Specify the speed for the yoyo backward animation

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **1**


### yoyoTimeout

Specify how many time to wait before playing the animation back to his starting point

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **0**


### loadingClass

Specify the laoding class to set on the element before the animation is ready to play

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Default : **loading**




## Methods


### bodymovin

Heres the list of bodymovin methods that are exposed on the component itself:
- play()
- pause()
- stop()
- setSpeed(speed)
- setDirection(direction)
- goToAndPlay(timeOrFrame, isFrame)
- goToAndStop(timeOrFeame, isFrame)
- playSegments(segments)