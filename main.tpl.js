Vue.component('cname', {
	props: ['one', 'two'],
	template: `
	<article class="message" v-show="isVisible">
	{{ one }} {{ two }}
	</article>
	`,
	methods: { // This is a static component, but methods are stateless - so they can be an object property.
		someMethod(){
		}
	},
	data() { // This is a static component, so to make a instance factory wrap it e.g. in a return.
		return { // The "data" option should be a function that returns a per-instance value in component definitions.
		}
	}
});

new Vue({
	el: '#root',
	data: { // This is a global object, so object properties are initialized one time
		showSome: true
	}
});