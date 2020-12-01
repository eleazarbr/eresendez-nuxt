<template>
  <div v-if="document.toc.length" class="field pb-5">
    <p>{{ $t('blog.toc_title') }}</p>
    <ul>
      <li
        v-for="link of document.toc"
        :key="link.id"
        :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }"
      >
        <nuxt-link :to="`#${link.id}`">{{ link.text }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TableOfContents',
  props: ['document'],
}
</script>

<style lang="css" scoped>
.toc3 {
  margin-left: 1.25rem;
}

.toc4 {
  margin-left: 2.5rem;
}
</style>
