<script lang="ts">
  import Logo from "$lib/components/logo.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<div class="drawer">
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="navbar bg-base-300 w-full sticky top-0">
      <div class="flex-none"></div>
      <div class="mx-2 flex-1 px-2 font-extrabold">
        <a href="/"><div class="w-10 h-10"><Logo /></div></a>
      </div>
      <div class="flex-none block">
        <ul class="menu menu-horizontal font-bold">
          <!-- Navbar menu content here -->
          <li>
            <a href="https://github.com/LukasKarel" target="_blank">
              <!-- <SiGithub title={""} /> -->
              GITHUB
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/karel_lu/" target="_blank">
              <!-- <SiInstagram title={""} /> -->
              INSTAGRAM
            </a>
          </li>

          <li>
            <a href="https://www.reddit.com/user/LukasjEEEH/" target="_blank">
              <!-- <SiInstagram title={""} /> -->
              REDDIT
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col">
      {@render children()}
    </div>
  </div>
</div>
