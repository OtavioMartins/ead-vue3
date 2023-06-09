<template>
        <div class="pageTitle">
            <span class="title">Meus Cursos</span>
            <span class="dots">
                <span></span>
                <span></span>
                <span></span>
            </span>
        </div>

        <div class="content">
            <ul class="listCourses">
                <card-course-view
                  class="animate__animated animate__headShake"
                  v-for="course in courses"
                  :key="course.id"
                  :bgName="'laravel'"
                  :course="course">

                </card-course-view>
            </ul>
        </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import CardCourseView from './components/CardCourseView.vue'

export default {
  name: 'HomeView',
  setup(){
    const store = useStore()
    //store.state.courses.myCourses
    const courses = computed(() => store.state.courses.myCourses)

    onMounted(() => store.dispatch('getCourses'))

    return {
      courses
    }
  },

  components: {
    CardCourseView
  }
}

</script>
