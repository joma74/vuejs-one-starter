Vue.component('modal', {
    props: {},
    template: `
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            <slot name="title"></slot>
          </p>
          <button class="delete"></button>
        </header>
        <section class="modal-card-body">
          <slot>
            Default content here.
          </slot>
        </section>
        <footer class="modal-card-foot">
          <a class="button is-success">Save changes</a>
          <a class="button">Cancel</a>
        </footer>
      </div>
    </div>
		`,
    methods: { // This is a static component, but methods are stateless - so they can be an object property.
    },
    data() { // This is a static component, so to make a instance factory wrap it e.g. in a return.
        return { // The "data" option should be a function that returns a per-instance value in component definitions.
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
    methods: {}
});
