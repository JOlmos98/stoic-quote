<script lang="ts">
  // 1. Reactive State: Define a variable that Svelte will track.
  let count = 0;

  // 2. Reactive Declaration: A label that automatically updates when 'count' changes.
  $: doubled = count * 2;

  // 3. Function to update state.
  const increment = () => {
    count += 1;
  };
</script>

<div class="flex min-h-screen flex-col items-center justify-center bg-amber-100 p-8">
  <h1 class="mb-4 text-4xl font-bold text-gray-800">Carla te quiero ❤️</h1>

  <div class="prose mb-10 max-w-lg text-center">
    <img
      src="/carla.PNG"
      alt="carla"
      class="h-100 justify-center rounded-4xl transition duration-700 hover:scale-140"
    />
  </div>
  <p class="text-xl font-semibold text-pink-400">Carla te quiero te amo te deseo te idolatro quiero diez hijos tuyos</p>

  <p class="mt-20">This is a paragraph.</p>
  <p>This is another paragraph.</p>
  <p>This is a third paragraph.</p>

  <div class="flex flex-col items-center rounded-lg border border-gray-300 bg-white p-6 shadow-xl">
    <h2 class="mb-4 text-2xl font-semibold text-sky-700">Svelte Reactivity</h2>

    <p class="mb-2 text-lg">
      The current count is: <span class="font-bold text-red-500">{count}</span>
    </p>
    <p class="mb-4 text-lg">
      Count doubled is: <span class="font-bold text-red-500">{doubled}</span>
    </p>

    <button
      on:click={increment}
      class="rounded-md bg-green-600 px-4 py-2 text-white transition duration-150 hover:bg-green-700"
    >
      Click to Increment
    </button>
  </div>

  <div class="mt-8 text-center">
    <h1 class="mb-2 text-xl font-medium text-gray-700">Welcome to SvelteKit %paraglide.lang%</h1>
    <p class="text-gray-600">
      Visit <a
        href="https://svelte.dev/docs/kit"
        class="text-sky-600 underline hover:text-sky-800"
      >
        svelte.dev/docs/kit
      </a>
      to read the documentation
    </p>
  </div>
  <a
    href="/demo/paraglide"
    class="mt-8 border-4 border-amber-600 bg-amber-900 text-center text-amber-50 hover:bg-amber-700"
  >
    Demo lenguajes
  </a>
</div>
