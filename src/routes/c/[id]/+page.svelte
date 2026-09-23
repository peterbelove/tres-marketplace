<script lang="ts">
  import ProductCard from '$lib/ui/ProductCard.svelte';
  type Product = {
    id: number;
    name: string;
    slug: string;
    price_kobo: number;
    stock_qty: number;
    main_image_key: string | null;
  };

  export let data: {
    category: { id: number; name: string; icon: string | null; parent_id: number | null } | null;
    parent: { id: number; name: string; icon: string | null } | null;
    children: Array<{ id: number; name: string }>;
    products: Product[];
  };

  const ngn = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' });

  function price(ks: number) {
    return ngn.format(ks / 100);
  }
</script>

<div class="p-6">
  {#if !data.category}
    <h1 class="text-2xl font-bold text-tresNavy">Category</h1>
    <p class="mt-2 text-slate-700">
      DB not available (this can happen in local dev). Check the live site.
    </p>
  {:else}
    <h1 class="text-3xl font-bold text-tresNavy">
      {data.category.icon ? `${data.category.icon} ` : ''}{data.category.name}
    </h1>

    {#if data.parent}
      <p class="mt-2 text-slate-700">
        Parent:
        <a class="text-tresGreen hover:underline" href={"/c/" + data.parent.id}>{data.parent.name}</a>
      </p>
    {/if}

    <h2 class="mt-6 text-xl font-semibold">Subcategories</h2>
    {#if data.children.length === 0}
      <p class="mt-2 text-slate-700">No subcategories.</p>
    {:else}
  <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each data.products as p (p.id)}
      <ProductCard product={p} />
    {/each}
  </div>
{/if}

    <h2 class="mt-8 text-xl font-semibold">Products</h2>
{#if data.products.length === 0}
  ...
{:else}
  <div class="mt-4 grid ...">
    {#each data.products as p}
      <div class="rounded border bg-white p-4">
        ...
      </div>
    {/each}
  </div>
{/if}