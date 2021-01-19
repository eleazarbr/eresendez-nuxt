<template>
  <div class="hero is-small is-white is-light">
    <div class="hero-body">
      <div class="container">
        <div class="content text-center">
          <!-- Social -->
          <!-- Copy -->
          <p class="text-sm">Eleazar Reséndez - {{ $moment().year() }}</p>
          <div class="block">
            <a target="_blank" href="https://twitter.com/eleazarbr"
              ><b-icon size="is-medium" icon="twitter"></b-icon
            ></a>
            <a target="_blank" href="https://github.com/eleazarbr"
              ><b-icon size="is-medium" icon="github"></b-icon
            ></a>
            <a target="_blank" href="https://linkedin.com/in/eleazarbr"
              ><b-icon size="is-medium" icon="linkedin"></b-icon
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheFooter",
};
</script>
