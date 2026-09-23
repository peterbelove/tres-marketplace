<script lang="ts">
  export let tone: 'neutral' | 'success' | 'warning' | 'danger' | 'info' = 'neutral';

  const base = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold';

  $: cls =
    tone === 'success'
      ? `${base} bg-green-50 text-green-700 border border-green-200`
      : tone === 'warning'
        ? `${base} bg-yellow-50 text-yellow-800 border border-yellow-200`
        : tone === 'danger'
          ? `${base} bg-red-50 text-red-700 border border-red-200`
          : tone === 'info'
            ? `${base} bg-blue-50 text-blue-700 border border-blue-200`
            : `${base} bg-slate-50 text-slate-700 border border-slate-200`;
</script>

<span class={cls}>
  <slot />
</span>