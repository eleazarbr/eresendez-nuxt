<template>
  <section class="px-10 pb-5">
    <b-collapse
      class="card"
      animation="none"
      v-for="(collapse, index) of collapses"
      :key="index"
      :open="isOpen == index"
      @open="isOpen = index"
    >
      <div slot="trigger" slot-scope="props" class="card-header" role="button">
        <div class="card-header-title">{{ collapse.title }}</div>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
        </a>
      </div>
      <div class="card-content">
        <div>
          <ol class="is-lower-roman" style="margin-top: 0">
            <li v-for="(item, index) in collapse.list" :key="index">{{ item }}</li>
          </ol>
        </div>
      </div>
    </b-collapse>
  </section>
</template>

<script>
export default {
  name: "BookOutline",

  data() {
    return {
      isOpen: 0,
      collapses: [
        {
          title: "Capítulo 1",
          list: [],
        },
        {
          title: "Capítulo 2",
          list: [],
        },
        {
          title: "Capítulo 3",
          list: [],
        },
        {
          title: "Capítulo 4",
          list: [],
        },
        {
          title: "Bonos",
          list: [],
        },
      ],
    };
  },
};
</script>
