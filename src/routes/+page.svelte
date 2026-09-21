<script lang="ts">
  export let data: {
    categories: Array<{
      parent: { id: number; name: string; icon: string | null };
      subs: Array<{ id: number; name: string }>;
    }>;
  };
</script>

<div class="p-6">
  <h1 class="text-3xl font-bold text-tresNavy">TRES Marketplace</h1>
  <p class="mt-2 text-slate-700">Browse categories (loaded from D1 database).</p>

  {#if data.categories.length === 0}
    <div class="mt-6 rounded bg-white p-4 border">
      <p class="text-slate-700">
        No categories found.
      </p>
    </div>
  {:else}
    <div class="mt-6 grid gap-4 md:grid-cols-2">
      {#each data.categories as group}
        <section class="rounded bg-white p-4 border">
          <h2 class="text-xl font-semibold text-slate-900">
            {group.parent.icon ? `${group.parent.icon} ` : ''}{group.parent.name}
          </h2>

          {#if group.subs.length > 0}
            <ul class="mt-3 grid gap-2 sm:grid-cols-2">
              {#each group.subs as sub}
                <li class="text-slate-700">• {sub.name}</li>
              {/each}
            </ul>
          {:else}
            <p class="mt-2 text-slate-600">No subcategories.</p>
          {/if}
        </section>
      {/each}
    </div>
  {/if}
</div>