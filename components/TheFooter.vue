<template>
  <footer class="hero is-small is-black">
    <div class="hero-body">
      <div class="container">
        <div class="content has-text-centered">
          <!-- Copy -->
          <p class="is-size-6">
            <span> 2016 – {{ $moment().year() }}. Eleazar Reséndez </span>
            <br />
            <span>
              The source code is licensed
              <a
                class="has-text-link"
                href="https://opensource.org/licenses/mit-license.php"
                target="_blank"
              >
                MIT.
              </a>
              The website content is licensed
              <a
                class="has-text-link"
                href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
              >
                CC BY NC SA 4.0.
              </a>
            </span>
          </p>

          <!-- Social Icons -->
          <div class="is-flex is-justify-content-center" style="gap: 0.75rem">
            <a
              class="has-text-twitter"
              target="_blank"
              href="https://twitter.com/eleazarbr"
              ><b-icon size="is-medium" icon="twitter"></b-icon
            ></a>
            <a class="has-text-github" target="_blank" href="https://github.com/eleazarbr"
              ><b-icon size="is-medium" icon="github"></b-icon
            ></a>
            <b-tooltip label="Currently hibernating!" type="is-linkedin">
              <a
                class="has-text-linkedin"
                target="_blank"
                href="https://linkedin.com/in/eleazarbr"
                ><b-icon size="is-medium" icon="linkedin"></b-icon
              ></a>
            </b-tooltip>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "TheFooter",
};
</script>
