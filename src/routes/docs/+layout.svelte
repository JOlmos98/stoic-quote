<!-- src/routes/notes/+layout.svelte -->
<script lang="ts">
  import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
  import { goto } from '$app/navigation';
  import { PanelLeftClose, PanelLeftOpen } from 'lucide-svelte';

  type SidebarLink = { label: string; url: string };

  const links: SidebarLink[] = [
    { label: 'StoicQuote', url: '/' },
    { label: 'Docs', url: '/docs' },
    { label: 'FAQs', url: '/docs/faqs' },
    { label: 'The great stoics', url: '/docs/the_great_stoics' },
    { label: 'How to be stoic', url: '/docs/how_to_be_stoic' },
    { label: 'Key words', url: '/docs/key_words' },
    { label: 'This proyect', url: '/docs/this_project' },
    { label: 'Donation', url: 'https://www.paypal.com/es/home' },
    { label: 'J. Olmos', url: 'https://portfolio-4mh1rt9a0-jesus-projects-8116cd3a.vercel.app/en' }
  ];

  const handleClick = (url: string) => {
    goto(url);
  };

  let sidebarOpen = true;
</script>

<div class="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
  <!-- Barra superior fija -->
  <header
    class="sticky top-0 z-40 border-b border-[var(--lines)]/30
           bg-[var(--bg)]/90 backdrop-blur"
  >
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
      <div class="flex items-center gap-3">
        <!-- Toggle del sidebar (tipo shadcn) -->
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-md
                 text-[var(--fg)] transition-colors hover:bg-[var(--accent)]/10"
          aria-label={sidebarOpen ? 'Cerrar sidebar' : 'Abrir sidebar'}
          on:click={() => (sidebarOpen = !sidebarOpen)}
        >
          {#if sidebarOpen}
            <PanelLeftClose class="h-5 w-5" />
          {:else}
            <PanelLeftOpen class="h-5 w-5" />
          {/if}
        </button>

        <button
          type="button"
          class="text-lg font-semibold tracking-wide hover:text-[var(--accent)]"
          on:click={() => handleClick('/')}
        >
          StoicQuote
        </button>
      </div>

      <ThemeSwitcher />
    </div>
  </header>

  <!-- Wrapper: deja sitio a la izquierda según el ancho del sidebar -->
  <div
    class="w-full"
    style={`--sidebar-w: ${sidebarOpen ? '16rem' : '4rem'}`}
  >
    <!-- SIDEBAR fijo a la izquierda -->
    <aside
      class={`fixed top-14 left-0 z-30 hidden
              h-[calc(100vh-3.5rem)]
              overflow-hidden border-r border-[var(--lines)]/20 bg-[var(--bg)]/95
              backdrop-blur transition-[width]
              duration-300 md:flex md:flex-col
              ${sidebarOpen ? 'w-64' : 'w-16'}`}
    >
      <nav class={`flex flex-col gap-1 ${sidebarOpen ? 'p-3' : 'p-2'}`}>
        {#each links as link}
          <a
            href={link.url}
            title={link.label}
            class="flex w-full items-center justify-between rounded-md px-3 py-2
                   text-left font-medium
                   text-[var(--fg)] transition-colors
                   hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]
                   focus-visible:ring-2 focus-visible:ring-[var(--accent)]/40 focus-visible:outline-none"
            rel={link.url.startsWith('http') ? 'noreferrer noopener' : undefined}
            target={link.url.startsWith('http') ? '_blank' : undefined}
          >
            {#if sidebarOpen}
              <span class="truncate">{link.label}</span>
            {:else}
              <span class="mx-auto text-xs text-[var(--accent)]">
                {link.label.slice(0, 2).toUpperCase()}
              </span>
            {/if}
          </a>
        {/each}
      </nav>
    </aside>

    <!-- CONTENIDO a la derecha (tipo GitHub docs) -->
    <div class="transition-[padding] duration-300 md:pl-[var(--sidebar-w)]">
      <div class="mx-auto flex max-w-5xl gap-8 px-4 py-8 md:px-6">
        <main class="flex-1">
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
                   prose-thead:border-[var(--accent)]/40
                   prose-th:text-[var(--fg)]
                   prose-hr:border-[var(--accent)]/40"
          >
            <slot />
          </article>
        </main>
      </div>
    </div>
  </div>
</div>
