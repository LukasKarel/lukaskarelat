<script lang="ts">
  import { onMount } from "svelte";
  import { z } from "zod";
  import { PUBLIC_HOST } from "$env/static/public";

  const emailSchema = z.email();

  let address = $state("");
  let mail = $state("");
  let token = $state("");
  let subscribe_triggered = $state(false);
  let subscribe_failed = $state(false);
  let subscribe_success = $state(false);

  let toast_timeout: NodeJS.Timeout;

  const loadToken = async () => {
    let retryTime = 8 * 60 * 1000;
    try {
      const response = await fetch(
        new URL("/api/newsletter/formToken", PUBLIC_HOST).toString(),
      );
      if (response.ok) {
        const body = await response.json();
        token = body.formToken;
      } else {
        retryTime = 5 * 1000;
      }
    } finally {
      setTimeout(loadToken, retryTime);
    }
  };

  onMount(async () => {
    await loadToken();
  });

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    await subscribe();
  };

  const subscribe = async () => {
    if (subscribe_triggered) {
      return;
    }
    subscribe_triggered = true;
    const currentMail = mail;
    mail = "";
    const response = await fetch(
      new URL("/api/newsletter/subscribe", PUBLIC_HOST).toString(),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          honeypot: address,
          email: currentMail,
          formToken: token,
        }),
      },
    );

    toast_timeout = setTimeout(() => {
      subscribe_failed = false;
      subscribe_triggered = false;
      subscribe_success = false;
    }, 7 * 1000);
    if (!response.ok) {
      subscribe_failed = true;
    } else {
      subscribe_success = true;
    }
  };
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class="hero bg-base-200 min-h-[calc(100vh-5rem)]">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">HEY! I'm Lukas</h1>
      <p class="py-6 font-bold">
        curious mind with a passion for open-source and learning
      </p>
      <div class="flex justify-center gap-4">
        <!-- <button class="btn btn-primary uppercase">Blog</button> -->
        <form
          class="flex flex-col lg:flex-row gap-1 lg:gap-0"
          onsubmit={handleSubmit}
        >
          <label class="input focus-within:outline-0">
            <span class="label text-primary-content">Newsletter</span>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              bind:value={mail}
              autocomplete="email"
              id="email"
            />
          </label>
          <input type="text" class="hidden" name="name" bind:value={address} />
          <button
            class="btn btn-secondary uppercase"
            disabled={!emailSchema.safeParse(mail).success ||
              subscribe_triggered}>Subscribe</button
          >
        </form>
      </div>
    </div>
  </div>
</div>

<div class="toast toast-bottom toast-end">
  {#if subscribe_triggered}
    {#if subscribe_failed}
      <div class="alert alert-error">
        <p>Unable to add your mail for the newsletter.</p>
        <p>Please contact us to fix the problem.</p>
      </div>
    {/if}
    {#if subscribe_success}
      <div class="alert alert-success">
        <p>We registered your email.</p>
        <p>Please check your inbox for confirmation!</p>
      </div>
    {/if}
  {/if}
</div>
