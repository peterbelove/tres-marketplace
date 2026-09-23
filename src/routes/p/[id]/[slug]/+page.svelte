<script lang="ts">
  import { cart } from '$lib/stores/cart';

  function addToCart() {
    if (!data.product) return;
    cart.add(
      {
        id: data.product.id,
        name: data.product.name,
        slug: data.product.slug,
        price_kobo: data.product.price_kobo
      },
      1
    );
  }
  export let data: {
    product: null | {
      id: number;
      name: string;
      slug: string;
      brand: string | null;
      description: string | null;
      price_kobo: number;
      stock_qty: number;
      category_id: number;
      subcategory_id: number | null;
    };
    specs: Record<string, unknown> | null;
  };

  const ngn = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' });
  const price = (k: number) => ngn.format(k / 100);
</script>

<div class="p-6">
  {#if !data.product}
    <h1 class="text-2xl font-bold text-tresNavy">Product</h1>
    <p class="mt-2 text-slate-700">DB not available (local dev). Check the live site.</p>
  {:else}
    <a class="text-tresGreen hover:underline" href={"/c/" + (data.product.subcategory_id ?? data.product.category_id)}>
      ← Back to category
    </a>

    <h1 class="mt-4 text-3xl font-bold text-tresNavy">{data.product.name}</h1>

    {#if data.product.brand}
      <p class="mt-1 text-slate-700">Brand: {data.product.brand}</p>
    {/if}

    <p class="mt-3 text-2xl font-semibold">{price(data.product.price_kobo)}</p>

    {#if data.product.stock_qty > 0}
      <p class="mt-2 text-green-700">In stock: {data.product.stock_qty}</p>
    {:else}
      <p class="mt-2 text-red-700">Out of stock</p>
    {/if}
    <div class="mt-4">
      <button
        class="rounded bg-tresGreen px-4 py-2 font-semibold text-white hover:bg-tresGreenHover disabled:opacity-50"
        on:click={addToCart}
        disabled={data.product.stock_qty <= 0}
      >
        Add to cart
      </button>
    </div>

    {#if data.product.description}
      <h2 class="mt-8 text-xl font-semibold">Description</h2>
      <p class="mt-2 whitespace-pre-wrap text-slate-800">{data.product.description}</p>
    {/if}

    {#if data.specs}
      <h2 class="mt-8 text-xl font-semibold">Specs</h2>
      <div class="mt-2 rounded border bg-white p-4">
        {#each Object.entries(data.specs) as [k, v]}
          <div class="flex justify-between gap-4 border-b py-2 last:border-b-0">
            <div class="font-medium text-slate-700">{k}</div>
            <div class="text-slate-900">{String(v)}</div>
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</div>