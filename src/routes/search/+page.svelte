<script lang="ts">
  import ProductCard from '$lib/ui/ProductCard.svelte';
  export let data: {
    q: string;
    results: Array<{ id: number; name: string; slug: string; price_kobo: number; stock_qty: number }>;
  };

  const ngn = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' });
  const price = (k: number) => ngn.format(k / 100);
</script>

<div class="p-6">
  <h1 class="text-3xl font-bold text-tresNavy">Search</h1>

  <form class="mt-4 flex gap-2" method="GET" action="/search">
    <input
      class="w-full rounded border bg-white px-3 py-2"
      name="q"
      placeholder="Search products (e.g. inverter, solar, CCTV)"
      value={data.q}
    />
    <button class="rounded bg-tresGreen px-4 py-2 font-semibold text-white hover:bg-tresGreenHover" type="submit">
      Search
    </button>
  </form>

  {#if !data.q || data.q.length < 2}
    <p class="mt-6 text-slate-700">Type at least 2 letters to search.</p>
  {:else}
    <p class="mt-6 text-slate-700">Results for: <span class="font-semibold">{data.q}</span></p>

    {#if data.results.length === 0}
      <p class="mt-3 text-slate-700">No results.</p>
    {:else}
      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {#each data.results as p (p.id)}
    <ProductCard product={p} />
  {/each}
</div>
            <div class="mt-1 text-slate-700">{price(p.price_kobo)}</div>
            {#if p.stock_qty > 0}
              <div class="mt-2 text-sm text-green-700">In stock</div>
            {:else}
              <div class="mt-2 text-sm text-red-700">Out of stock</div>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  {/if}
</div>
