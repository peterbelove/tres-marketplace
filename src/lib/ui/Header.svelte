<script lang="ts">
  import { cartCount } from '$lib/stores/cart';
  import Button from '$lib/ui/Button.svelte';
  import Input from '$lib/ui/Input.svelte';
</script>

<nav class="border-b bg-white">
  <div class="mx-auto max-w-6xl px-4 py-3 flex items-center gap-2">
    <a href="/" class="mr-2 font-bold text-tresNavy text-lg">
      TRES Marketplace
    </a>

    <Button href="/" variant="ghost">Home</Button>
    <Button href="/search" variant="ghost">Search</Button>

    <Button href="/cart" variant="ghost">
      Cart
      {#if $cartCount > 0}
        <span class="ml-2 rounded bg-tresNavy px-2 py-0.5 text-xs font-semibold text-white">
          {$cartCount}
        </span>
      {/if}
    </Button>

    <div class="ml-auto">
      <form method="GET" action="/search" class="flex items-center gap-2">
        <div class="w-56 md:w-80">
          <Input name="q" placeholder="Search products..." />
        </div>
        <Button type="submit">Go</Button>
      </form>
    </div>
  </div>
</nav>