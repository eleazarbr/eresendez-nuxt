<template>
  <div v-if="document.toc.length" class="field pb-5">
    <p>{{ $t("blog.toc_title") }}</p>
    <ol class="is-lower-roman">
      <li
        v-for="item of document.toc"
        :key="item.id"
        :class="{ toc2: item.depth === 2, toc3: item.depth === 3 }"
      >
        <nuxt-link :to="`#${item.id}`">{{ item.text }}</nuxt-link>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "TableOfContents",
  props: ["document"],
};
</script>

<style lang="css" scoped>
.toc3 {
  margin-left: 1.25rem;
}

.toc4 {
  margin-left: 2.5rem;
}
</style>
