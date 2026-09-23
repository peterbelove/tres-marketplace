<script lang="ts">
  import { cart, cartCount, cartSubtotalKobo } from '$lib/stores/cart';

  const ngn = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' });
  const price = (k: number) => ngn.format(k / 100);

  function toNumber(v: string) {
    const n = Number(v);
    return Number.isFinite(n) ? n : 1;
  }
</script>

<div class="p-6 max-w-5xl mx-auto">
  <h1 class="text-3xl font-bold text-tresNavy">Cart</h1>

  {#if $cartCount === 0}
    <p class="mt-4 text-slate-700">Your cart is empty.</p>
    <a class="mt-4 inline-block text-tresGreen hover:underline" href="/">Go shopping →</a>
  {:else}
    <div class="mt-6 grid gap-4">
      {#each $cart as item (item.id)}
        <div class="rounded border bg-white p-4 flex items-center gap-4">
          <div class="flex-1">
            <a class="font-semibold hover:underline" href={"/p/" + item.id + "/" + item.slug}>
              {item.name}
            </a>
            <div class="text-slate-700">{price(item.price_kobo)}</div>
          </div>

          <div class="flex items-center gap-2">
            <label class="text-sm text-slate-600">Qty</label>
            <input
              class="w-20 rounded border px-2 py-1"
              type="number"
              min="1"
              value={item.qty}
              on:input={(e) => cart.setQty(item.id, toNumber((e.target as HTMLInputElement).value))}
            />
          </div>

          <div class="w-32 text-right font-semibold">
            {price(item.price_kobo * item.qty)}
          </div>

          <button
            class="rounded border px-3 py-2 text-sm hover:bg-slate-50"
            on:click={() => cart.remove(item.id)}
          >
            Remove
          </button>
        </div>
      {/each}
    </div>

    <div class="mt-6 rounded border bg-white p-4 flex items-center">
      <div class="text-lg font-semibold">Subtotal</div>
      <div class="ml-auto text-xl font-bold">{price($cartSubtotalKobo)}</div>
    </div>

    <div class="mt-4 flex gap-3">
      <button class="rounded border px-4 py-2 hover:bg-slate-50" on:click={() => cart.clear()}>
        Clear cart
      </button>

      <!-- Checkout comes later -->
      <a class="rounded bg-tresGreen px-4 py-2 font-semibold text-white hover:bg-tresGreenHover" href="/checkout">
        Checkout
      </a>
    </div>
  {/if}
</div>