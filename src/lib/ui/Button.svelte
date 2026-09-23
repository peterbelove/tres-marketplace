<script lang="ts">
  export let href: string | null = null;
  export let variant: 'primary' | 'outline' | 'ghost' = 'primary';
  export let type: 'button' | 'submit' = 'button';
  export let disabled = false;

  const base =
    'inline-flex items-center justify-center rounded px-4 py-2 text-sm font-semibold ' +
    'focus:outline-none focus:ring-2 focus:ring-tresGreen focus:ring-offset-2 ' +
    'disabled:opacity-50 disabled:pointer-events-none';

  $: cls =
    variant === 'primary'
      ? `${base} bg-tresGreen text-white hover:bg-tresGreenHover`
      : variant === 'outline'
        ? `${base} border bg-white hover:bg-slate-50`
        : `${base} hover:bg-slate-100`;
</script>

{#if href}
  <a class={cls} href={href} aria-disabled={disabled}>
    <slot />
  </a>
{:else}
  <button class={cls} {type} {disabled}>
    <slot />
  </button>
{/if}
