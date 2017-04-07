<template>
<transition enter-active-class="animated rubberBand" leave-active-class="animated fadeOut">
    <div class="column is-3">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    {{project.name}}
                </p>
                <a class="card-header-icon">
                    <span class="icon is-medium" v-on:click="emitDelete">
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
</transition>
</template>

<script>
import * as thunk from "../thunk/thunk-types"

export default {
    name: 'projectcard-component',
    props: ['project'],
    methods: {
        emitDelete() { // moved to methods as thunk is unknown to the template
            // the parent component knows the context of this event
            // t.i. project and it's index the gui list
            this.$emit(thunk.ON_DELETE);
        }
    }
}
</script>
