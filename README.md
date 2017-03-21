# Coffeekraken s-bodymovin <small>0.0.1</small> [![Build Status](https://travis-ci.org/Coffeekraken/s-bodymovin-component.svg?branch=release/0.0.1)](https://travis-ci.org/Coffeekraken/s-bodymovin-component)

Simple webcomponent wrapper around the freaking cool bodymovin library

## Table of content

1. **[Demo](http://components.coffeekraken.io/app/s-bodymovin-component)**
2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [Javascript API](doc/api/js)
5. [SASS API](doc/api/sass)
6. [Sugar Web Components Documentation](https://github.com/Coffeekraken/sugar/blob/master/doc/webcomponent.md)
7. [Browsers support](#readme-browsers-support)
8. [Contribute](#readme-contribute)
9. [Who are Coffeekraken?](#readme-who-are-coffeekraken)
10. [Licence](#readme-license)

<a name="readme-install"></a>
## Install

```
npm install coffeekraken-s-bodymovin --save
```

<a name="readme-get-started"></a>
## Get Started

First, import the component into your javascript file like so:

```js
import SBodymovinComponent from 'coffeekraken-s-bodymovin'
```

Then simply use it inside your html like so:

```html
<s-bodymovin src="my-cool-animation.json"></s-bodymovin>
```

<a id="readme-browsers-support"></a>
## Browsers support

Check the bodymovin library browser support [here](http://github.coffeekraken.io/bodymovin/bodymovin/^4.0.0)

> The webcomponent API (custom elements, shadowDOM, etc...) is not supported in some older browsers like IE10, etc... In order to make them work, you will need to integrate the [corresponding polyfill](https://www.webcomponents.org/polyfills).

<a id="readme-contribute"></a>
## Contribute

This is an open source project and will ever be! You are more that welcomed to contribute to his development and make it more awesome every day.
To do so, you have several possibilities:

1. [Share the love ❤️](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-share-the-love)
2. [Declare issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-declare-issues)
3. [Fix issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-fix-issues)
4. [Add features](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-add-features)
5. [Build web component](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-build-web-component)

<a id="readme-who-are-coffeekraken"></a>
## Who are Coffeekraken

We try to be **some cool guys** that build **some cool tools** to make our (and yours hopefully) **every day life better**.  

#### [More on who we are](https://github.com/Coffeekraken/coffeekraken/blob/master/who-are-we.md)

<a id="readme-license"></a>
## License

The code is available under the [MIT license](LICENSE.txt). This mean that you can use, modify, or do whatever you want with it. This mean also that it is shipped to you for free, so don't be a hater and if you find some issues, etc... feel free to [contribute](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md) instead of sharing your frustrations on social networks like an asshole...
