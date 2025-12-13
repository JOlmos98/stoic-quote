<!-- src/routes/notes/+layout.svelte -->
<script lang="ts">
  import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
</script>

<div class="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
  <!-- Barra superior fija -->
  <header
    class="sticky top-0 z-40 border-b border-[var(--lines)]/30
           bg-[var(--bg)]/90 backdrop-blur"
  >
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
      <a
        href="/"
        class="text-lg font-semibold tracking-wide hover:text-[var(--accent)]"
      >
        StoicQuote
        <span class="text-[var(--accent)]">.md</span>
      </a>

      <!-- Reutilizas tu switcher de tema -->
      <ThemeSwitcher />
    </div>
  </header>

  <!-- Contenido mdsvex -->
  <main class="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 md:px-0">
    <!-- Pequeño subtítulo / migas -->
    <p class="text-sm tracking-[0.25em] text-[var(--muted)] uppercase">Notas & Ensayos Estoicos</p>

    <!-- Contenedor con tipografía agradable usando @tailwindcss/typography -->
    <article
      class="prose max-w-none
             prose-headings:font-semibold
             prose-headings:text-[var(--fg)]
             prose-p:text-[var(--fg)]
             prose-a:text-[var(--accent)]
             prose-a:no-underline
             hover:prose-a:underline
             prose-blockquote:border-l-[3px]
             prose-blockquote:border-[var(--accent)]
             prose-blockquote:text-[var(--fg)]
             prose-strong:text-[var(--fg)]
             prose-em:text-[var(--fg)]
             prose-code:rounded
             prose-code:bg-[color-mix(in_srgb,var(--bg)_85%,var(--fg)_15%)]
             prose-code:px-1.5 prose-code:py-0.5
             prose-code:text-[var(--fg)]
             prose-li:marker:text-[var(--accent)]
             prose-table:text-sm
             prose-thead:border-b-[1px]
             prose-thead:border-[var(--muted)]/40
             prose-th:text-[var(--fg)]
             prose-hr:border-[var(--muted)]/40"
    >
      <slot />
    </article>
  </main>
</div>
