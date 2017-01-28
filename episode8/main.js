Vue.component('task', {
	template: '<li><slot></slot></li>'
});
Vue.component('tasks-list', {
	template: `
	<ul> <!-- templates must have a single root element -->
	<task v-for="task in tasks">{{ task.description }}</task>
	</ul>
	`,
	data() { // This is a static component,
		return { // so to make a instance factory wrap it e.g. in a return
			tasks: [
			{description: 'Go to the store', completed: true},
			{description: 'Finish screencast', completed: false},
			{description: 'Make donation', completed: false},
			{description: 'Clear inbox', completed: false},
			{description: 'Make dinner', completed: false},
			{description: 'Clean room', completed: true}
			]
		}
	}
});

new Vue({
	el: '#root'
});