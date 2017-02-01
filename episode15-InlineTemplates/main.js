Vue.component('progress-view', {
    props: {

    },
    template: `
		`,
    methods: { // This is a static component, but methods are stateless - so they can be an object property.
    },
    data() { // This is a static component, so to make a instance factory wrap it e.g. in a return.
        return { // The "data" option should be a function that returns a per-instance value in component definitions.
           completionRate: 50
        }
    },
    computed: { // access like data
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
    },
    methods: {
    }
});
