<script lang="ts">
  import Logo from "$lib/components/logo.svelte";
  import "../app.css";
  import "@fontsource-variable/arimo/wght";

  let { children } = $props();
</script>

{#snippet socials(classname?: string)}
  <li class={classname ?? ""}>
    <a href="https://github.com/LukasKarel" target="_blank"> GITHUB </a>
  </li>
  <li class={classname ?? ""}>
    <a href="https://www.instagram.com/karel_lu/" target="_blank">
      INSTAGRAM
    </a>
  </li>
  <li class={classname ?? ""}>
    <a href="https://bsky.app/profile/lukaskarel.bsky.social" target="_blank">
      BLUESKY
    </a>
  </li>
  <li class={classname ?? ""}>
    <a href="https://www.reddit.com/user/LukasjEEEH/" target="_blank">
      REDDIT
    </a>
  </li>
{/snippet}

<div class="drawer">
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <nav class="navbar bg-base-300 w-full sticky top-0 z-50">
      <div class="mx-2 flex-1 px-2 font-extrabold">
        <a href="/"><div class="w-10"><Logo /></div></a>
      </div>
      <div class="flex-none block">
        <ul class="menu menu-horizontal font-bold">
          <li><a href="/blog/">BLOG</a></li>
          <li class="sm:hidden">
            <details>
              <summary>SOCIALS</summary>
              <ul class="bg-base-100 rounded-t-none p-2">
                {@render socials()}
              </ul>
            </details>
          </li>
          {@render socials("hidden sm:inline")}
        </ul>
      </div>
    </nav>
    <main class="flex flex-col">
      {@render children()}
    </main>
  </div>
</div>
