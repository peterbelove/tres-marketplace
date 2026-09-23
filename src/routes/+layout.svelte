<script lang="ts">
  import '../app.css';
  import Header from '$lib/ui/Header.svelte';
</script>

<Header />

<main class="min-h-screen">
  <slot />
</main>