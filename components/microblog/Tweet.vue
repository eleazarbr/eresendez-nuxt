<template>
  <div class="content">
    <p>
      <span v-html="tweet.text" class="is-size-5" style="color: black"> </span>
      <br />
      <span class="is-size-6">
        {{
          $moment(tweet.created_at).locale($store.getters["lang/locale"]).format("lll")
        }}
      </span>
    </p>
  </div>
</template>
<script>
export default {
  name: "Tweet",
  props: ["tweet"],
};
</script>
