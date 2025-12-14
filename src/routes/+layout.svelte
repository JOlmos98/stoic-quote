<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.ico';
  import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
  import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';

  let { children } = $props();
</script>

<ThemeSwitcher />
<LocaleSwitcher />

<svelte:head>
  <link
    rel="icon"
    href={favicon}
  />
</svelte:head>

{@render children?.()}
