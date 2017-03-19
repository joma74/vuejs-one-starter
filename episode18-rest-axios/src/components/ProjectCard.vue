<template>
<div v-bind:class="{ rubberBand: !isDeleted, fadeOut: isDeleted }" class="column is-3 animated">
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{project.name}}
            </p>
            <a class="card-header-icon">
                <span class="icon is-medium" v-on:click="emitDeleted">
                  <i class="icon-trash" aria-hidden="true"></i>
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
import * as evt from "../thunk/event-types"

export default {
    name: 'projectcard-component',
    props: ['project'],
    data() {
        return { // needed for per-instance data
            isDeleted: false
        }
    },
    created: function() {
        this.$eventHub.$on(evt.ON_DELETED, this.setDeleted)
    },
    beforeDestroy: function() {
        this.$eventHub.$off(evt.ON_DELETED, this.setDeleted)
    },
    methods: {
        emitDeleted(){ // moved to methods as evt is unknown to the template
          // the parent component knows the context of this event
          // t.i. project and it's index the gui list
          this.$emit(evt.EMIT_DELETE);
        },
        setDeleted(projectKey) {
            if (this.project.key === projectKey) {
                this.isDeleted = true;
            }
        }
    }
}
</script>
