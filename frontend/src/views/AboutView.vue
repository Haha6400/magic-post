<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div>
  <step-progress :steps="mySteps" :current-step="currentStep" icon-class="fa fa-check"></step-progress>
</div>
</template>

<script>
import StepProgress from 'vue-step-progress'
import 'vue-step-progress/dist/main.css';

export default {
  components: {
    'step-progress': StepProgress
  },

  data() {
    return {
      mySteps: ['Step 1', 'Step 2', 'Step 3'],
      currentStep: 1
    };
  },
}

</script>
