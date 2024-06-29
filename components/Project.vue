<template>
  <div class="w-full border rounded-lg p-4 hover:shadow">
    <div class="flex flex-col gap-4 justify-center">
      <div class="w-10 rounded-full border p-1 h-10">
        <img
          style="background-size: contain"
          class="w-full cover rounded-lg"
          src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*j8Kc5PV3NBdW31fNCB5OJw.png"
          alt="How I Built My Tech Startup As a Solo Developer"
        />
      </div>

      <div class="flex items-center gap-5">
        <span
          class="rounded-md border p-1 text-secondary/90 bg-secondary/40 border-secondary/50"
          >Easy</span
        >
        <span class="text-4xl rounded-full border bg-gray-600 w-2 h-2"></span>
        <span class="text-sm text-gray-600">202 building</span>
      </div>

      <div class="flex w-ful gap-0">
        <h2 class="text-xl font-medium">Build FinPay: A FinTech Solution</h2>
      </div>
      <div class="w-full">
        <article class="w-full text-gray-600 text-sm">
          In this project, we’ll create a FinTech application using Node.js and
          FinTech API. The application will allow users to create invoices,
          generate virtual cards, create virtual accounts, and get paid in
          different currencies.
        </article>
      </div>

      <div>
        <p class="text-md uppercase font-bold text-gray-600 pb-2">Skills</p>
        <div
          class="items-center grid md:grid-cols-3 grid-cols-2 gap-2 text-center"
        >
          <span
            class="rounded-md border p-2 bg-green-300/40 border-green-400/50 text-green-900/90"
            >Intermediate</span
          >
          <span
            class="rounded-md border p-2 text-secondary/90 bg-secondary/40 border-secondary/50"
            >Fintech</span
          >
          <span
            class="rounded-md border p-2 text-red-600/90 bg-red-600/40 border-red-600/50"
            >Node.js</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style>
</style>