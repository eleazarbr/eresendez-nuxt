<template>
  <div class="section">
    <div class="container">
      <div class="columns is-centered">
        <!-- Latest Tweets -->
        <div class="column is-5-desktop">
          <div class="content">
            <div class="columns is-mobile is-vcentered">
              <div class="column is-narrow">
                <b class="has-text-black is-size-3">
                  {{ $t("microblog.latest_tweets") }}
                </b>
              </div>
              <div class="column is-auto">
                <b-button
                  tag="a"
                  href="https://twitter.com/eleazarbr"
                  target="_blank"
                  icon-left="twitter"
                  type="is-twitter"
                >
                  @eleazarbr
                </b-button>
              </div>
            </div>
            <Tweet v-for="tweet in tweets" :key="tweet.id" :tweet="tweet"> </Tweet>
          </div>
        </div>

        <!-- Microposts -->
        <div class="column is-5-desktop">
          <div class="content">
            <h2 class="title">Old microposts stuff</h2>
            <p class="subtitle">This will be migrated to Xardin soon.</p>
            <MicroPost
              v-for="(post, index) in posts"
              :key="index"
              :post="post"
            ></MicroPost>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MicroPost from "@/components/microblog/MicroPost.vue";
import Tweet from "@/components/microblog/Tweet.vue";
import tweets from "~/tweets/tweets.json";
export default {
  name: "index",
  components: {
    MicroPost,
    Tweet,
  },

  data: () => ({
    posts: [],
  }),

  async asyncData({ $content }) {
    const posts = await $content("microblog")
      .only(["title", "slug", "description", "tags", "createdAt", "updatedAt"])
      .sortBy("createdAt", "desc")
      .fetch();

    return {
      posts,
      tweets,
    };
  },
};
</script>
