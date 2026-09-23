<script lang="ts">
  import { cartCount } from '$lib/stores/cart';
</script>

<nav class="border-b bg-white">
  <div class="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
    <a href="/" class="font-bold text-tresNavy text-lg">
      TRES Marketplace
    </a>

    <a href="/" class="text-slate-700 hover:text-slate-900">Home</a>
    <a href="/search" class="text-slate-700 hover:text-slate-900">Search</a>

    <a href="/cart" class="text-slate-700 hover:text-slate-900">
      Cart
      {#if $cartCount > 0}
        <span class="ml-1 rounded bg-tresNavy px-2 py-0.5 text-xs font-semibold text-white">
          {$cartCount}
        </span>
      {/if}
    </a>

    <div class="ml-auto">
      <form method="GET" action="/search" class="flex gap-2">
        <input
          name="q"
          placeholder="Search products..."
          class="w-56 md:w-80 rounded border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          class="rounded bg-tresGreen px-3 py-2 text-sm font-semibold text-white hover:bg-tresGreenHover"
        >
          Go
        </button>
      </form>
    </div>
  </div>
</nav>