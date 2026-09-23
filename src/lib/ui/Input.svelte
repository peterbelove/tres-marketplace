<script lang="ts">
  export let name: string | undefined = undefined;
  export let type: string = 'text';
  export let value: string | number | undefined = undefined;
  export let placeholder: string | undefined = undefined;
  export let required: boolean = false;
  export let readonly: boolean = false;
  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;
</script>

<input
  class="w-full rounded border bg-white px-3 py-2 text-sm
         focus:outline-none focus:ring-2 focus:ring-tresGreen focus:ring-offset-2"
  {name}
  {type}
  {value}
  {placeholder}
  {required}
  {readonly}
  {min}
  {max}
/>