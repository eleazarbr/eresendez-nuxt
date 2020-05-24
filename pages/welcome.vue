<template>
	<div>
		<div class="hero">
			<div class="hero-body">
				<div class="container">
					<!-- Title bar -->
					<div class="level">
						<div class="level-left">
							<div class="level-item">
								<h2 class="text-3xl font-bold has-text-black">
									{{ $t('blog.posts') }}
									<span>&#9997;&#65039;</span>
								</h2>
							</div>
						</div>
						<div class="level-right">
							<div class="level-item">
								<b-field expanded>
									<b-input
										:placeholder="$t('search')"
										type="search"
										icon="search-web"
										v-model="keyword"
										@input="search"
									></b-input>
								</b-field>
							</div>
						</div>
					</div>

					<!-- Blog posts -->
					<div class="columns is-multiline mt-5">
						<div class="column is-6" v-for="post in posts" :key="post.id">
							<post-card :post="post"></post-card>
						</div>
					</div>
					<div class="columns is-centered">
						<div class="column is-narrow">
							<b-pagination
								:total="total"
								:current.sync="currentPage"
								:per-page="perPage"
								range-before="3"
								range-after="1"
								@change="onPageChange"
							></b-pagination>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import PostCard from "~/components/blog/PostCard";

export default {
	components: {
		PostCard
	},

	head() {
		return { title: this.$t("home") };
	},

	data: () => ({
		title: process.env.appName,
		posts: [],
		keyword: "",
		currentPage: 1,
		nextPosts: 0,
		perPage: 6,
		total: 0
	}),

	mounted() {
		this.getPosts();
		this.$content("blog")
			.only("slug")
			.fetch()
			.then(r => {
				this.total = r.length;
			});
	},

	methods: {
		search: _.debounce(function() {
			this.keyword ? this.searchPost() : this.getPosts();
		}, 1000),

		async searchPost() {
			let posts = await this.queryPosts()
				.search("title", this.keyword)
				.fetch();

			this.posts = posts;
		},

		async getPosts() {
			let posts = await this.queryPosts()
				.limit(this.perPage)
				.skip(this.nextPosts)
				.fetch();

			this.posts = posts;
		},

		queryPosts() {
			return this.$content("blog")
				.only(["title", "summary", "image", "slug", "date", "tags", "author"])
				.sortBy("date", "desc");
		},

		onPageChange(page) {
			this.nextPosts =
				page > this.currentPage
					? this.nextPosts + this.perPage
					: this.nextPosts - this.perPage;
			this.getPosts();
			this.currentPage = page;
		}
	},

	computed: mapGetters({
		authenticated: "auth/check"
	})
};
</script>
