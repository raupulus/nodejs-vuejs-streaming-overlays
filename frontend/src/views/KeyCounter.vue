<template>
    <div class="box-keycounter">
        <div class="box-frame">
            <img :src="currentImage"
                  alt="keyboard"
                  class="frame">

        </div>
        <KeyCounterStats :current="lastSocketRead.pulsations_current"/>
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

        // Opciones de la animación, se modifica dinámicamnte según la cantidad de pulsaciones en el tiempo.
        const animationOptions = ref({
            duration: 800, // Duración en ms
            velocity: 100, // Velocidad en escala 100% = 300ms
        });

        // Última lectura por el socket
        const lastSocketRead = ref({
            pulsations_current: 0,
            pulsations_total: 0,
            pulsation_average: 0,
        });

        // Si hay una animación activa
        const hasActiveAnimation = ref(false);

        const currentImage = ref('/src/assets/frames/initial.png');

        // Esto será cada directorio en assets/frames
        const getGroupFrames = () => {
            // TODO: Dinamizar, leer del fs

            // Devuelve el nombre de cada directorio con frames
            return [
                '1','2','3','4','5','6','7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'
            ]
        }

        let groupFrames = getGroupFrames();

        // Esto será un array de frames, cada imagen dentro del directorio. Por ahora está hardcodeado.
        const getFrames = (dir: string) => {

            // Sacamos una matriz con los nombres de los frames
            return [
                '/src/assets/frames/' + dir + '/1.png',
                '/src/assets/frames/' + dir + '/2.png',
                '/src/assets/frames/' + dir + '/3.png',
                '/src/assets/frames/' + dir + '/4.png',
            ]
        }


        // Obtendrá un directorio Random del grupo de frames, devuelve
        // un array de frames
        const getRandomFrames = () => {
            let randomDirName = groupFrames[Math.floor(Math.random() * groupFrames.length)];

            console.log('randomDirName', randomDirName);

            return getFrames(randomDirName);
        }

        // Cuando recibamos muchos datos seguidos, recalcular velocidad de animación para aumentar/disminuir
        const recalcVelocity = () => {
            let average = lastSocketRead.value.pulsation_average;

            if (average > 250) {
                animationOptions.value.velocity = 10;
            } else if (average > 200) {
                animationOptions.value.velocity = 20;
            } else if (average > 150) {
                animationOptions.value.velocity = 40;
            } else if (average > 100) {
                animationOptions.value.velocity = 60;
            } else if (average > 50) {
                animationOptions.value.velocity = 80;
            } else {
                animationOptions.value.velocity = 100;
            }

            let duration = 800 * animationOptions.value.velocity / 100;

            animationOptions.value.duration = duration;


            console.log('current average:', average)
            console.log('current velocity:', animationOptions.value.velocity);
            console.log('current duration:', duration);
        }

        // Esta función muestra la animación.
        const showAnimation = () => {

            if (!hasActiveAnimation.value) {
                recalcVelocity();

                let frames = getRandomFrames();
                frames.push('/src/assets/frames/initial.png');

                let totalFrames = frames.length;
                let frameDuration = animationOptions.value.duration / totalFrames;

                console.log('frameDuration', frameDuration);

                hasActiveAnimation.value = true;

                frames.forEach((frame, index) => {
                    let nextFrameAt = frameDuration * (index);

                    setTimeout(() => {
                        currentImage.value = frame;

                        if (index === totalFrames - 1) {
                            hasActiveAnimation.value = false;
                        }
                    }, nextFrameAt);
                });
            }
        }

        /**
         * Callback que se llama cada vez que se reciben datos emitidos por el servidor.
         * @param data
         */
        const callbackWebSocket = (data: any) => {
            console.log('data', data);

            lastSocketRead.value.pulsations_current = data?.pulsations_current || 0;

            lastSocketRead.value.pulsation_average = data?.pulsation_average || 0;

            lastSocketRead.value.pulsations_total = data?.pulsations_total || 0;
            showAnimation();
        }

        /**
         * Inicia la conexión al socket del servidor.
         */
        const initWebSocket = () => {
            const socket = io("ws://localhost:3000");

            socket.on('keycounter', (res:any) => {
                callbackWebSocket(res);
            });
        }

        initWebSocket();

        return {
            lastSocketRead,
            currentImage,
        }
    },
  });
</script>

<style scoped>
.box-keycounter {
    width: 950px;
    height: 350px;
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
