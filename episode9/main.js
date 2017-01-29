Vue.component('message', {
	props: ['header', 'body'],
	template: `
	<article class="message" v-show="isVisible">
	<div class="message-header">
	<p>{{ header }}</p>
	<button class="delete" @click="hideModal"></button>
	</div>
	<div class="message-body">
	{{ body }}
	</div>
	</article>
	`,
	methods: { // This is a static component, but methods are stateless - so they can be an object property
		hideModal(){
			this.isVisible = ! this.isVisible;
		}
	},
	data() { // This is a static component, so to make a instance factory wrap it e.g. in a return.
		return { // The "data" option should be a function that returns a per-instance value in component definitions.
		isVisible: true
	}
}
});

new Vue({
	el: '#root'
});