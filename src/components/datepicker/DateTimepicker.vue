<template>
  <div class="row">
    <div class='col-sm-6'>
      <div class="form-group">
        <div class='input-group date' id='timepicker'>
          <input type='text' class="form-control" />
          <span class="input-group-addon">
            <span class="glyphicon glyphicon-time"></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/static/plugins/timepicker/bootstrap-datetimepicker.js';
import '@/static/plugins/timepicker/bootstrap-datetimepicker.css';
import '@/static/plugins/timepicker/bootstrap-datetimepicker.min.css';
import moment from "moment";

export default {
  name: 'TimePicker',
  data() {
    return {
      selectedTime: '12:00', // 초기 시간 설정
    };
  },
  mounted() {
    this.initTimepicker();
  },
  methods: {
  initTimepicker() {
    $(function () {
      $('#timepicker').datetimepicker({
        format: 'yyyy-mm-dd h:ii',
        stepping: 60,
        defaultDate: moment().set({ 'hour': 0, 'minute': 0 }),
        useCurrent: false,
      });

      // Time selection updates the data model
      $('#timepicker').on('dp.change', (e) => {
        this.selectedTime = e.date.format('HH:mm');
      });
    });
  }
}
}
</script>
