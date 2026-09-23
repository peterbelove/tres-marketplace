<script lang="ts">
  import Card from '$lib/ui/Card.svelte';
  import Badge from '$lib/ui/Badge.svelte';
  import Button from '$lib/ui/Button.svelte';
  import { cart } from '$lib/stores/cart';

  export let product: {
    id: number;
    name: string;
    slug: string;
    price_kobo: number;
    stock_qty: number;
  };

  const ngn = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' });
  const price = (k: number) => ngn.format(k / 100);

  function add() {
    cart.add(
      { id: product.id, name: product.name, slug: product.slug, price_kobo: product.price_kobo },
      1
    );
  }
</script>

<Card className="p-4 hover:border-slate-300 transition">
  <a class="block font-semibold text-slate-900 hover:underline line-clamp-2" href={"/p/" + product.id + "/" + product.slug}>
    {product.name}
  </a>

  <div class="mt-2 flex items-center gap-2">
    {#if product.stock_qty > 0}
      <Badge tone="success">In stock</Badge>
    {:else}
      <Badge tone="danger">Out of stock</Badge>
    {/if}
  </div>

  <div class="mt-3 text-lg font-bold text-slate-900">{price(product.price_kobo)}</div>

  <div class="mt-4 flex gap-2">
    <Button href={"/p/" + product.id + "/" + product.slug} variant="outline">View</Button>
    <Button on:click={add} disabled={product.stock_qty <= 0}>Add</Button>
  </div>
</Card>