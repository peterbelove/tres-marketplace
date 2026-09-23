<script lang="ts">
  export let className = '';
</script>

<div class={"rounded-lg border bg-white " + className}>
  <slot />
</div>