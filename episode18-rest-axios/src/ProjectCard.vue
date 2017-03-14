<template>
<div v-bind:class="{ rubberBand: !isDeleted, fadeOut: isDeleted }" class="column is-3 animated">
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{project.name}}
            </p>
            <a class="card-header-icon">
                <span class="icon is-medium" v-on:click="$emit('doDelete')">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </span>
            </a>
        </header>
        <div class="card-content">
            <div class="content">
                {{project.description}}
                <br>
                <small>{{project.lastModifiedOn}}</small>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'projectcard-component',
    props: ['project'],
    data() {
        return { // needed for per-instance data
            isDeleted: false
        }
    },
    created: function() {
        this.$eventHub.$on('on-deleted', this.setDeleted)
    },
    beforeDestroy: function() {
        this.$eventHub.$off('on-deleted', this.setDeleted)
    },
    methods: {
        setDeleted(projectKey) {
            if (this.project.key === projectKey) {
                this.isDeleted = true;
            }
        }
    }
}
</script>
