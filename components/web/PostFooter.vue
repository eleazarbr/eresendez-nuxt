<template>
  <div>
    <hr />

    <!-- Say thanks button -->
    <div class="columns is-variable is-1 is-vcentered is-mobile">
      <div class="column is-narrow">
        <p class="font-bold">{{ $t("blog.say_thanks") }}</p>
      </div>
      <div class="column is-narrow">
        <b-button
          type="is-info"
          icon-left="twitter"
          tag="a"
          target="_blank"
          expanded
          :href="twitterShareUrl"
        >
          <b> Tweet it </b>
        </b-button>
      </div>
    </div>

    <!-- Edit this page link -->
    <b-field :label="$t('blog.edit_page')">
      <b-button
        icon-left="github"
        type="is-dark"
        tag="a"
        :href="`${githubRepo}${page.path}${page.extension}`"
        target="_blank"
      >
        <span class="font-bold">Editar</span>
      </b-button>
    </b-field>

    <!-- GitHub Comments -->
    <div>
      <script
        type="application/javascript"
        src="https://utteranc.es/client.js"
        repo="eleazarbr/eresendez"
        issue-term="pathname"
        theme="preferred-color-scheme"
        crossorigin="anonymous"
        async
      ></script>
    </div>

    <!-- Share this -->
    <b-field :label="$t('blog.share')">
      <add-to-any></add-to-any>
    </b-field>
  </div>
</template>
<script>
import AddToAny from "~/components/blog/AddToAny";
export default {
  name: "PostFooter",
  props: ["page"],
  components: {
    AddToAny,
  },

  data: () => ({
    githubRepo: "https://github.com/eleazarbr/eresendez/tree/master/content",
  }),

  computed: {
    twitterShareUrl() {
      var pageURL = document.URL;
      var text = "Thanks @eleazarbr!";
      return encodeURI(`http://twitter.com/share?url=${pageURL}&text=${text}`);
    },
  },
};
</script>
