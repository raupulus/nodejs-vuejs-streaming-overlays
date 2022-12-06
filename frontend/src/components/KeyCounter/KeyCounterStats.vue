<template>
    <div class="box-stats">
      <span class="stats">{{current}}</span>

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
      console.log('entra en subcomponent')

      return {

      }

    }
  });

</script>

<style lang="scss" scoped>
.box-stats {
  position: absolute;
  width: 800px;
  height: 300px;
  top: 0;
  left: 0;
  text-align: center;
  display: flex;
}

.box-stats .stats {
  position: relative;
  bottom: 0;
  margin: 0 auto;
  font-weight: 500;
  font-size: 6rem;
  line-height: 6rem;
  letter-spacing: 1.2rem;
  color: rgb(218, 59, 15);
  background-color: rgb(255, 255, 255);
  align-self: flex-end;
}
</style>
