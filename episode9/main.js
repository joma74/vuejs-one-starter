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
	methods: {
		hideModal(){
			this.isVisible = ! this.isVisible;
		}
	},
	data() { // This is a static component,
		return { // so to make a instance factory wrap it e.g. in a return
			isVisible: true
		}
	}
});

new Vue({
	el: '#root'
});