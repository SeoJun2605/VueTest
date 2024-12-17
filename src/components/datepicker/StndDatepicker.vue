<template>
    <ul>
        <li>
            <!-- <img :src="require('@/static/img/left_arrow_ico.svg')" @click="prevDate" />  -->
        </li>
        <li class="textCenter">
            <Datepicker ref="picker" :stnd-dt="dt" @on-selected="onSelectedDatepicker"></Datepicker>
        </li>
        <li>
            <!-- <img :src="require('@/static/img/right_arrow_ico.svg')" @click="nextDate"/> -->
        </li>
    </ul>
</template>
<script>

import { DateUtil } from '@/utils/DateUtil.js'
import baseMixins from '@/views/mixins/baseMixins.vue'
import Datepicker from '@/components/datepicker/Datepicker.vue'

export default {
    mixins: [baseMixins],
    name: 'stnd-datepicker',
    props: {
        stndDt: {
            type: String,
            require: false
        },
        maxObj: {
            type: Object,
            require: false
        }
    },
    data() {
        return {
            dt: ''
        }
    },
    components: {
        Datepicker
    },
    methods: {
        init: function() {
            let $this = this;
        }
        ,prevDate: function() {
            let $this = this;
            $this.dt = DateUtil.addDay($this.dt, -1);
            this.$emit('onSelected', $this.dt);
        }
        ,nextDate: function() {
            let $this = this;
            $this.dt = DateUtil.addDay($this.dt, 1);
            if(!!$this.maxObj){
               if($this.maxObj.maxDt < $this.dt){
                    $this.dt = $this.maxObj.maxDt;
                    $this.alert($this.maxObj.msg);
               }
            }
            this.$emit('onSelected', $this.dt);
        }
        ,onSelectedDatepicker: function(selectedDate) {
            let $this = this;
            $this.dt = selectedDate;
            this.$emit('onSelected', selectedDate);
        }
    },
    updated: function () {
    
    },
    computed: {
    
    },
    watch: {
        stndDt: function() {
            this.dt = this.stndDt;
        }
    },
    mounted: function() {
        let $this = this;
    }
}
</script>

<style scoped>
.textCenter {    
    text-align: center;
}
</style>