<script lang="ts">
  export let data: {
    category: { id: number; name: string; icon: string | null; parent_id: number | null } | null;
    parent: { id: number; name: string; icon: string | null } | null;
    children: Array<{ id: number; name: string }>;
  };
</script>

<div class="p-6">
  {#if !data.category}
    <h1 class="text-2xl font-bold text-tresNavy">Category</h1>
    <p class="mt-2 text-slate-700">
      DB not available (this can happen in local dev). Check the live site.
    </p>
  {:else}
    <div class="flex items-center gap-2">
      <h1 class="text-3xl font-bold text-tresNavy">
        {data.category.icon ? `${data.category.icon} ` : ''}{data.category.name}
      </h1>
    </div>

    {#if data.parent}
      <p class="mt-2 text-slate-700">
        Parent: <a class="text-tresGreen hover:underline" href={"/c/" + data.parent.id}>{data.parent.name}</a>
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

    <p class="mt-8 text-slate-600">
      Next step: we will show products in this category.
    </p>
  {/if}
</div>