<template>
    <div>
        <div class="pageTitle">
            <span class="title">{{course.name}}</span>
            <span class="dots">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </div>

        <div class="content">
            <div class="container">
                
                <modules-view/>

                <div class="right">
                    <div class="content">
                        
                        <player-view/>

                            <supports-view />


                            
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import  ModulesView from './components/ModulesView.vue'
import  PlayerView from './components/PlayerView.vue'
import SupportsView from './components/SupportsView.vue'
import router from "@/router"

export default {
    name: 'ModulesAdnLessons',

    setup(){
        const store = useStore()

        const course = computed(() => store.state.courses.courseSelected)
        
        if (course.value.id === '') {
            router.push({name: 'campus.home'})
        }
        

        return {
            course,
            //modules
        }
    },

    components: {
        ModulesView,
        PlayerView,
        SupportsView
    }
}
</script>