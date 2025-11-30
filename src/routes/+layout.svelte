<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.ico';
  import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

  let { children } = $props();
</script>

<ThemeSwitcher />

<svelte:head>
  <link
    rel="icon"
    href={favicon}
  />
</svelte:head>

{@render children?.()}
