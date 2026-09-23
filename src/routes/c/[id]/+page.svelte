<script lang="ts">
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
      <ul class="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {#each data.children as child}
          <li>
            <a class="block rounded border bg-white p-3 hover:border-tresGreen" href={"/c/" + child.id}>
              {child.name}
            </a>
          </li>
        {/each}
      </ul>
    {/if}

    <h2 class="mt-8 text-xl font-semibold">Products</h2>
    {#if data.products.length === 0}
      <p class="mt-2 text-slate-700">No products in this category yet.</p>
    {:else}
      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {#each data.products as p}
          <div class="rounded border bg-white p-4">
            <a class="font-semibold text-slate-900 hover:underline" href={"/p/" + p.id + "/" + p.slug}>
  {p.name}
</a>
            <div class="mt-1 text-slate-700">{price(p.price_kobo)}</div>

            {#if p.stock_qty > 0}
              <div class="mt-2 text-sm text-green-700">In stock: {p.stock_qty}</div>
            {:else}
              <div class="mt-2 text-sm text-red-700">Out of stock</div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</div>