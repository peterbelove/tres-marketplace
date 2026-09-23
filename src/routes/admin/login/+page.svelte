<script lang="ts">
  export let data: { next: string };
</script>

<div class="p-6 max-w-md mx-auto">
  <h1 class="text-3xl font-bold text-tresNavy">Admin Login</h1>

  <form class="mt-6 grid gap-3" method="POST" action="/api/auth/login" enctype="multipart/form-data">
    <input type="hidden" name="next" value={data.next} />

    <label class="grid gap-1">
      <span class="text-sm text-slate-700">Email</span>
      <input class="rounded border px-3 py-2" name="email" type="email" required />
    </label>

    <label class="grid gap-1">
      <span class="text-sm text-slate-700">Password</span>
      <input class="rounded border px-3 py-2" name="password" type="password" required />
    </label>

    <button class="mt-2 rounded bg-tresGreen px-4 py-2 font-semibold text-white hover:bg-tresGreenHover" type="submit">
      Log in
    </button>
  </form>

  <p class="mt-4 text-sm text-slate-600">
    First time: use your Cloudflare environment variables
    <code class="px-1">ADMIN_BOOTSTRAP_EMAIL</code> and <code class="px-1">ADMIN_BOOTSTRAP_PASSWORD</code>.
  </p>
</div>