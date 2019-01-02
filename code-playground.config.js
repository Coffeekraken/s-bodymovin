module.exports = {
	// server port
	port : 3000,

	// title
	title : 's-bodymovin-component',

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
				<h1 class="h3 m-b-small">
					Coffeekraken s-bodymovin-component
				<h1>
				<p class="p m-b-bigger">
					Simple webcomponent wrapper around the freaking cool bodymovin library
				</p>
				<s-bodymovin reactive class="active" onclick="this.classList.toggle('active')" src="/demo/data/favourite-app-icon.json"></s-bodymovin>
				<s-bodymovin autoplay loop src="/demo/data/exploding-heart.json"></s-bodymovin>
				<s-bodymovin autoplay loop yoyo yoyo-speed="4" src="/demo/data/touch-id.json"></s-bodymovin>
			`
		},
		css : {
			language : 'sass',
			data : `
				@import 'node_modules/coffeekraken-sugar/index';
				@import 'node_modules/coffeekraken-s-typography-component/index';
				@include s-init();
				@include s-classes();
				@include s-typography-classes();
				body {
					padding: s-space(big);
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
				import SBodymovinComponent from './dist/index'
			`
		}
	}
}
