<template>
    <div class="box-keycounter">
        <div class="box-frame">
            <img src="@/assets/frames/initial.png" alt="keyboard" class="frame">
        </div>
        <KeyCounterStats current="0"/>
    </div>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue';
import KeyCounterStats from '@/components/KeyCounter/KeyCounterStats.vue';


  export default defineComponent({
    name: 'KeyCounter',
    components: {
      KeyCounterStats
    },

    setup(props) {

        const test = ref(null);

        const initWebSocket = () => {
            const ws = new WebSocket('ws://localhost:8088/keycounter');
            ws.onopen = () => {
                console.log('WebSocket connected');
            };
            ws.onmessage = (e) => {
                console.log(e.data);
            };
            ws.onclose = () => {
                console.log('WebSocket disconnected');
                setTimeout(() => {
                    initWebSocket();
                }, 1000);
            };
        };

        //initWebSocket();


        return {
            test
        }
    },
  });
</script>

<style scoped>
.box-keycounter {
    width: 800px;
    height: 300px;
    margin: 0;
    padding: 0;
}

.title {
    margin: 0;
    font-weight: 500;
    font-size: 2.6rem;
}

.frame {
    width: 100%;
    height: 100%;
}
</style>
