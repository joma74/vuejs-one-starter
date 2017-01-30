window.Event = new class {
  constructor() {
      this.vue = new Vue();
  }

  fire(event, data = null){
    this.vue.$emit(event, data);
  }

  listen(event, callback){
    this.vue.$on(event, callback);
  }

}

Vue.component('coupon', {
    props: {

    },
    template: `
			<input placeholder="Enter your coupon code" @blur="onCouponApplied">
		`,
    methods: { // This is a static component, but methods are stateless - so they can be an object property.
        onCouponApplied() {
            Event.fire('applied', this.coupon);
        }
    },
    data() { // This is a static component, so to make a instance factory wrap it e.g. in a return.
        return { // The "data" option should be a function that returns a per-instance value in component definitions.
        }
    },
    computed: { // access like data
    },
    created() {},
    mounted() {}
});

new Vue({
    el: '#root',
    data() { // This is a static component, so to make a instance factory wrap it e.g. in a return.
        return { // The "data" option should be a function that returns a per-instance value in component definitions.
            couponApplied: false
        }
    },
    methods: { // This is a static component, but methods are stateless - so they can be an object property.
        onCouponApplied() {
            this.couponApplied = true;
        }
    },
    created(){
      Event.listen('applied', () => {
        this.couponApplied = true;
      });
    }
});
