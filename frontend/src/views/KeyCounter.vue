<template>
    <div class="box-keycounter">
        <div class="box-frame">
            <img src="@/assets/frames/initial.png" alt="keyboard" class="frame">
        </div>
        <KeyCounterStats :current="current"/>
    </div>
</template>

<script lang="ts">
import {ref, defineComponent} from 'vue';
import KeyCounterStats from '@/components/KeyCounter/KeyCounterStats.vue';
import { io } from "socket.io-client";

  export default defineComponent({
    name: 'KeyCounter',
    components: {
      KeyCounterStats
    },

    setup(props) {
        const current = ref(0);

        const increment = () => {
            //current.value++;
        }

        // Esto será cada directorio en assets/frames
        const getGroupFrames = () => {

        }

        // Esto será un array de frames, cada imagen dentro del directorio
        const getFrames = () => {

        }

        // Obtendrá un directorio Random del grupo de frames, devuelve
        // un array de frames
        const getRandomFrame = () => {

        }

        // Cuando recibamos muchos datos seguidos, recalcular velocidad de animación para aumentar/disminuir
        const recalcVelocity = () => {

        }

        // Esta función muestra la animación.
        const showAnimation = () => {
            recalcVelocity();
            getRandomFrame();

            // TODO: calcular cuanto tiempo se muestra un frame, para que la animación sea fluida y tomando como refencia 1 segundo la animación completa cuando no haya más pulsaciones, esto disminuye o aumenta la velocidad de la animación según el número de pulsaciones seguidas.

            // Resumen:
            /**
             * 1. Obtener un directorio random de frames
             * 2. Obtener un array de frames aleatorio entre todos los directorios
             * 3. Calcular velocidad siendo 1s el máximo repartido entre todos los frames 1s/frames = ms de cada frame mostrándose.
             * 4. Mostrar frames
             * 5. Repetir si hay más pulsaciones
             * 6. Si no hay más pulsaciones, mostrar el primer frame de la animación
             * 7. Actualizar la variable con el total de pulsaciones.
             */

             current.value = 0;
        }

        const callbackWebSocket = (data: any) => {
            console.log(data);
            //current.value = data;
            showAnimation();
        }

        const initWebSocket = () => {
            const socket = io("ws://localhost:3000");
            //socket.emit("keycounter", 'test');
            socket.on('keycounter', (res:any) => {
                console.log('res:', res);
                current.value = res?.current;
            });
        }

        initWebSocket();


        return {
            current
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
