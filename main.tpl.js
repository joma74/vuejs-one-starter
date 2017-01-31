Vue.component('cname', {
	props: {
			one: {
					required: true,
					default: ''
			}
	},
	template: `
		<input :placeholder="this.theComputed" @blur="onChanged" required>
	`,
	methods: { // This is a static component, but methods are stateless - so they can be an object property.
		onChanged(){
			this.$emit('changed');
		}
	},
	data() { // This is a static component, so to make a instance factory wrap it e.g. in a return.
		return { // The "data" option should be a function that returns a per-instance value in component definitions.
		}
	},
	computed: { // access like data
			theComputed() {
					return this.one + ' vue';
			}
	},
	created() { // lifecycle hook see
		console.log('Created ' + this.$options.name);
	},
	mounted() { // lifecycle hook see
		console.log('Mounted ' + this.$options.name);
	}
});

new Vue({
	el: '#root',
	data: { // This is a global object, so object properties are initialized one time
		doShow: true
	},
	methods: {
			toggle(){
				this.doShow = !this.doShow;
			}
	}
});
