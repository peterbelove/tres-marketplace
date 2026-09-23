<h1 class="text-3xl font-bold text-tresNavy p-6">Admin Dashboard</h1>

<div class="px-6">
  <p class="text-slate-700">You are logged in as admin.</p>

  <form class="mt-4" method="POST" action="/api/auth/logout">
    <button class="rounded border px-4 py-2 hover:bg-slate-50" type="submit">
      Log out
    </button>
  </form>

  <p class="mt-8 text-slate-600">
    Next: we will add product CRUD here.
  </p>
</div>