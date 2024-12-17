<template>
  <input class="timepicker text-center">
</template>

<script>
import '@/static/plugins/timepicker/jquery.timepicker.js';
import '@/static/plugins/timepicker/jquery.timepicker.min.js';
import '@/static/plugins/timepicker/jquery.timepicker.css';
import '@/static/plugins/datepicker/datepicker3.css'

export default {
  name: 'TimePicker',
  data() {
    return {
      dt: '00:00',
    };
  },
  mounted() {
    this.initTimepicker();
  },
  methods: {
    initTimepicker() {
      $('.timepicker').timepicker({
        timeFormat: 'HH:mm p',
        interval: 60,
        minTime: '00:00am',
        maxTime: '11:00pm',
        defaultTime: '10',
        startTime: '00:00',
        dynamic: true,
        dropdown: true,
        scrollbar: true
      });
    }
  }
}

</script>

<style scoped>
.dt {
  width: 150px;
  text-align: center;
}
</style>