<template>
    <div class="box-stats">
      <span class="stats burn">{{current}}</span>
    </div>
</template>

<script lang="ts">
  import {ref, defineComponent} from 'vue';

  export default defineComponent({
    name: 'KeyCounterStats',

    props: {
      current: {
        type: Number,
        required: false,
        default: 0
      },
    },

    setup(props) {
      return {

      }

    }
  });

</script>

<style lang="scss" scoped>
.box-stats {
  position: absolute;
  width: 950px;
  top: 0;
  left: 0;
  text-align: center;
  display: flex;
}

.box-stats .stats {
  position: relative;
  bottom: 0;
  margin: 0 auto;
  font-weight: 800;
  font-size: 4.5rem;
  line-height: 6.8rem;
  letter-spacing: 1.5rem;
  color: #feec85;
  /*
  background: rgb(126, 254, 241);
    background: -moz-radial-gradient(circle, rgba(126, 254, 241, 1) 0%, rgba(255, 252, 49, 1) 34%, rgba(255, 204, 36, 1) 56%, rgba(255, 54, 20, 1) 78%);
    background: -webkit-radial-gradient(circle, rgba(126, 254, 241, 1) 0%, rgba(255, 252, 49, 1) 34%, rgba(255, 204, 36, 1) 56%, rgba(255, 54, 20, 1) 78%);
    background: radial-gradient(circle, rgba(126, 254, 241, 1) 0%, rgba(255, 252, 49, 1) 34%, rgba(255, 204, 36, 1) 56%, rgba(255, 54, 20, 1) 78%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#7efef1", endColorstr="#ff3614", GradientType=1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    */


/*
    text-shadow: 0 0 8px rgb(0, 0, 0, 0.2),
    2px -1px 8px #f8e7a1f2,
    -2px -1px 8px #f8e7a1f2,
    5px -2px 15px #ffcc00d7,
    -5px -2px 15px #ffcc00d7,
    10px -6px 12px #ec740cd7,
    -10px -6px 12px #ec740cd7,
    15px -18px 20px #ff0000d8,
    -15px -18px 20px #ff0000d8;


  text-shadow: 0 0 5px #fefcc9,
  2px -2px 5px #feec85,
  -7px -7px 7px #ffae34,
  7px -7px 15px #ec760c,
  -7px -18px 20px #cd4606,
  0 -25px 25px #973716,
  5px -25px 20px #ff0000;
  */
}

.box-stats .stats.fire {
  position: relative;
  animation: animation 1s ease-in-out infinite alternate;
  -moz-animation: animation 1s ease-in-out infinite alternate;
  -webkit-animation: animation 1s ease-in-out infinite alternate;
  -o-animation: animation 1s ease-in-out infinite alternate;
}

.burn {
  position: relative;
  animation: animation .65s ease-in-out infinite alternate;
  -moz-animation: animation .65s ease-in-out infinite alternate;
  -webkit-animation: animation .65s ease-in-out infinite alternate;
  -o-animation: animation .65s ease-in-out infinite alternate;
}

@keyframes animation {
  0% {
    text-shadow: 0 0 8px rgb(0, 0, 0, 0.2),
    2px -1px 4px #f8e7a1f2,
    5px -2px 15px #ffcc00d7,
    5px -6px 10px #ec740cd7,
    5px -14px 20px #ff0000d8,
  }

  100% {
    text-shadow: 0 0 8px rgb(0, 0, 0, 0.3),
    2px -1px 8px #f8e7a1f2,
    5px -2px 15px #ffcc00d7,
    6px -6px 12px #ec740cd7,
    7px -18px 20px #ff0000d8,
  }
}

@-moz-keyframes animation {
    0% {
        text-shadow: 0 0 8px rgb(0, 0, 0, 0.2),
            2px -1px 4px #f8e7a1f2,
            5px -2px 15px #ffcc00d7,
            5px -6px 10px #ec740cd7,
            5px -14px 20px #ff0000d8,
    }

    100% {
        text-shadow: 0 0 8px rgb(0, 0, 0, 0.3),
            2px -1px 8px #f8e7a1f2,
            5px -2px 15px #ffcc00d7,
            6px -6px 12px #ec740cd7,
            7px -18px 20px #ff0000d8,
    }
}

@-webkit-keyframes animation {
    0% {
        text-shadow: 0 0 8px rgb(0, 0, 0, 0.2),
            2px -1px 4px #f8e7a1f2,
            5px -2px 15px #ffcc00d7,
            5px -6px 10px #ec740cd7,
            5px -14px 20px #ff0000d8,
    }

    100% {
        text-shadow: 0 0 8px rgb(0, 0, 0, 0.3),
            2px -1px 8px #f8e7a1f2,
            5px -2px 15px #ffcc00d7,
            6px -6px 12px #ec740cd7,
            7px -18px 20px #ff0000d8,
    }
}

@-o-keyframes animation {
    0% {
        text-shadow: 0 0 8px rgb(0, 0, 0, 0.2),
            2px -1px 4px #f8e7a1f2,
            5px -2px 15px #ffcc00d7,
            5px -6px 10px #ec740cd7,
            5px -14px 20px #ff0000d8,
    }

    100% {
        text-shadow: 0 0 8px rgb(0, 0, 0, 0.3),
            2px -1px 8px #f8e7a1f2,
            5px -2px 15px #ffcc00d7,
            6px -6px 12px #ec740cd7,
            7px -18px 20px #ff0000d8,
    }
}
</style>
