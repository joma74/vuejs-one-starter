Vue.component('tabs', {
    props: [],
    template: `
    	<div>
    		<div class="tabs">
    			<ul>
        			<li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
        				<a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
        			</li>
    			</ul>
    		</div>
    		<slot></slot>
    	</div>
    `,
    methods: { // This is a static component, but methods are stateless - so they can be an object property.
        selectTab(selectedTab) {
            this.tabs.forEach(tab => {
                tab.isActive = (tab.name == selectedTab.name);
            });
        }
    },
    data() { // This is a static component, so to make a instance factory wrap it e.g. in a return.
        return { // The "data" option should be a function that returns a per-instance value in component definitions.
            tabs: []
        }
    },
    mounted() {
        console.log(this.$children);
    },
    created() {
        this.tabs = this.$children;
    }
});

Vue.component('tab', {
    props: {
        name: {
            required: true
        },
        selected: {
            default: false
        }
    },
    template: `
    		<div v-show="this.isActive">
    			<slot></slot>
    		</div>
    `,
    data() {
        return {
            isActive: false
        }
    },
    computed: {
        href() {
            return '#' + this.name.trim().toLowerCase().replace(/ /g, '-');
        }
    },
    mounted() {
        this.isActive = this.selected;
    }
});

new Vue({
    el: '#root',
    data: { // This is a global object, so object properties are initialized one time
        showSome: true
    }
});
