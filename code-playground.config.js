module.exports = {
	// server port
	port : 3000,

	// title
	title : 's-bodymovin',

	// layout
	layout : 'right',

	// compile server
	compileServer : {

		// compile server port
		port : 4000

	},

	// editors
	editors : {
		html : {
			language : 'html',
			data : `
				<div class="container">
					<h1 class="h1 m-b-small">
						Coffeekraken s-bodymovin
					<h1>
					<p class="p m-b-bigger">
						Simple webcomponent wrapper around the freaking cool bodymovin library
					</p>
					<s-bodymovin reactive class="active" onclick="this.classList.toggle('active')" src="/data/favourite-app-icon.json"></s-bodymovin>
					<s-bodymovin autoplay loop src="/data/exploding-heart.json"></s-bodymovin>
					<s-bodymovin autoplay loop yoyo yoyo-speed="4" src="/data/touch-id.json"></s-bodymovin>
				</div>
			`
		},
		css : {
			language : 'sass',
			data : `
				@import 'node_modules/coffeekraken-sugar/index';
				@include s-init();
				@include s-classes();
				@include s-typography-classes();
				body {
					background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
				}
				.container {
					@include s-position(absolute, middle, center);
					min-width:80vw;
				}
				s-bodymovin {
					height: 150px;
					width: 150px;
				}
				s-bodymovin[reactive] {
					cursor: pointer;
				}
			`
		},
		js : {
			language : 'js',
			data : `
				import 'webcomponents.js/webcomponents-lite'
				import SBodymovinComponent from './dist/index'
			`
		}
	}
}
