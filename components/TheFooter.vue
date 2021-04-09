<template>
  <footer class="hero is-small is-black">
    <div class="hero-body">
      <div class="container">
        <div class="content text-center">
          <!-- Copy -->
          <p class="is-size-6">Eleazar Reséndez - {{ $moment().year() }}</p>
          <!-- Social -->
          <div class="flex justify-center" style="gap: 0.75rem">
            <a target="_blank" href="https://twitter.com/eleazarbr"
              ><b-icon style="color: #00acee" size="is-medium" icon="twitter"></b-icon
            ></a>
            <a target="_blank" href="https://github.com/eleazarbr"
              ><b-icon size="is-medium" icon="github"></b-icon
            ></a>
            <b-tooltip label="Let's Connect!" type="is-info">
              <a target="_blank" href="https://linkedin.com/in/eleazarbr"
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
