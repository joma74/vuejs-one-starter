Vue.component('tabs', {
    template: `
		<div>
			<div class="tabs">
				<ul>
					<li v-for="tab in tabs" :class="{'is-active' : tab.isActive}">
						<a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
					</li>
				</ul>
			</div>
			<slot></slot>
		</div>
		`,
    methods: { // This is a static component, but methods are stateless - so they can be an object property.
        selectTab(selectedTab) {
						this.tabs.forEach(tab =>{
								if(tab.name == selectedTab.name){
										tab.isActive = true;
								}else{
									tab.isActive = false;
								}
						});
				}
    },
    data() { // This is a static component, so to make a instance factory wrap it e.g. in a return.
        return { // The "data" option should be a function that returns a per-instance value in component definitions.
            tabs: []
        }
    },
    created() {
        console.log("On created -> " + this.$children);
        this.tabs = this.$children;
    },
    mounted() {
        console.log("On mounted -> " + this.$children);
    }
});

Vue.component('tab', {
    props: {
        name: {
          required: true
        },
				selectedOnInit: {
					default: false
				}
    },
    template: `
			<div v-show="isActive">
				<slot></slot>
			</div>
		`,
    data() { // This is a static component, so to make a instance factory wrap it e.g. in a return.
        return { // The "data" option should be a function that returns a per-instance value in component definitions.
						isActive: false
        }
    },
    computed: { // access like data
  			href() {
  					return '#' + this.name.trim().toLowerCase().replace(/ /g, "-");
  			}
  	},
    mounted() {
        this.isActive = this.selectedOnInit;
    }
});

Vue.config.debug = false;
new Vue({
    el: '#root',
    data: { // This is a global object, so object properties are initialized one time
    }
});
