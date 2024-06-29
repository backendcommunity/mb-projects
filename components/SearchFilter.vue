<template>
  <div class="flex bg-white rounded shadow">
    <div class="w-full p-4">
      <div
        class="flex justify-between py-2 px-2 border-solid border-b border-gray-200"
      >
        <h5>Filter By</h5>
        <h5>Clear All</h5>
      </div>
      <div class="flex flex-col gap-5 py-4 px-5">
        <!-- Type -->
        <div class="flex border-solid border-b border-gray-200">
          <fieldset>
            <div class="flex flex-col gap-x-2 justify-center px-">
              <legend
                class="text-sm font-light uppercase leading-6 text-gray-900"
              >
                Skill Level
              </legend>

              <div class="relative flex flex-col gap-x-3">
                <div class="flex items-center gap-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="beginners"
                      name="level"
                      @change="onSkillFilter"
                      v-model="skill"
                      value="beginners"
                      type="radio"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="beginners" class="font-medium text-gray-900"
                      >Beginners</label
                    >
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="intermediate"
                      name="level"
                      @change="onSkillFilter"
                      v-model="skill"
                      value="intermediate"
                      type="radio"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="intermediate" class="font-medium text-gray-900"
                      >Intermediate</label
                    >
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="advanced"
                      value="advanced"
                      name="level"
                      @change="onSkillFilter"
                      v-model="skill"
                      type="radio"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="advanced" class="font-medium text-gray-900"
                      >Advanced</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="flex border-solid border-b border-gray-200">
          <!-- Primium -->
          <div class="flex">
            <fieldset>
              <div class="flex flex-col gap-2 items-center">
                <legend
                  class="text-sm font-light uppercase leading-6 text-gray-900"
                >
                  Premium
                </legend>

                <div class="relative flex flex-col flex">
                  <div class="flex gap-3 py-2">
                    <div class="flex h-6 items-center">
                      <input
                        id="free"
                        value="free"
                        name="premium"
                        v-model="free"
                        @change="onFreeFilter"
                        type="checkbox"
                        class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="free" class="font-medium text-gray-900"
                        >Free</label
                      >
                    </div>
                  </div>
                  <div class="relative flex gap-3 py-2">
                    <div class="flex h-6 items-center">
                      <input
                        id="paid"
                        value="paid"
                        name="premium"
                        @change="onPaidFilter"
                        v-model="premium"
                        type="checkbox"
                        class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="paid" class="font-medium text-gray-900"
                        >Paid</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="flex border-solid border-b border-gray-200">
          <!-- Language -->
          <div class="flex">
            <fieldset>
              <div class="flex flex-col gap-2 items-center">
                <legend
                  class="text-sm font-light uppercase leading-6 text-gray-900"
                >
                  Language
                </legend>

                <div class="relative flex flex-col flex">
                  <div class="flex gap-3 py-2">
                    <div class="flex h-6 items-center">
                      <input
                        id="free"
                        value="free"
                        name="premium"
                        v-model="free"
                        @change="onFreeFilter"
                        type="checkbox"
                        class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="free" class="font-medium text-gray-900"
                        >PHP</label
                      >
                    </div>
                  </div>
                  <div class="relative flex gap-3 py-2">
                    <div class="flex h-6 items-center">
                      <input
                        id="paid"
                        value="paid"
                        name="premium"
                        @change="onPaidFilter"
                        v-model="premium"
                        type="checkbox"
                        class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="paid" class="font-medium text-gray-900"
                        >Python</label
                      >
                    </div>
                  </div>

                  <div class="flex gap-3 py-2">
                    <div class="flex h-6 items-center">
                      <input
                        id="free"
                        value="free"
                        name="premium"
                        v-model="free"
                        @change="onFreeFilter"
                        type="checkbox"
                        class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="free" class="font-medium text-gray-900"
                        >Rust</label
                      >
                    </div>
                  </div>
                  <div class="relative flex gap-3 py-2">
                    <div class="flex h-6 items-center">
                      <input
                        id="paid"
                        value="paid"
                        name="premium"
                        @change="onPaidFilter"
                        v-model="premium"
                        type="checkbox"
                        class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="paid" class="font-medium text-gray-900"
                        >Java</label
                      >
                    </div>
                  </div>

                  <div class="flex gap-3 py-2">
                    <div class="flex h-6 items-center">
                      <input
                        id="free"
                        value="free"
                        name="premium"
                        v-model="free"
                        @change="onFreeFilter"
                        type="checkbox"
                        class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="free" class="font-medium text-gray-900"
                        >Ruby</label
                      >
                    </div>
                  </div>
                  <div class="relative flex gap-3 py-2">
                    <div class="flex h-6 items-center">
                      <input
                        id="paid"
                        value="paid"
                        name="premium"
                        @change="onPaidFilter"
                        v-model="premium"
                        type="checkbox"
                        class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="paid" class="font-medium text-gray-900"
                        >.Net</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <!-- Tags -->
        <div class="flex border-solid border-b border-gray-200">
          <div class="flex">
            <fieldset>
              <div class="flex flex-col gap-2 items-center">
                <legend
                  class="text-sm font-light uppercase leading-6 text-gray-900"
                >
                  Tags
                </legend>

                <div class="relative flex flex-col flex">
                  <div class="flex gap-3 py-2">
                    <div class="flex h-6 items-center">
                      <input
                        id="free"
                        value="free"
                        name="premium"
                        v-model="free"
                        @change="onFreeFilter"
                        type="checkbox"
                        class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="free" class="font-medium text-gray-900"
                        >PHP</label
                      >
                    </div>
                  </div>
                  <div class="relative flex gap-3 py-2">
                    <div class="flex h-6 items-center">
                      <input
                        id="paid"
                        value="paid"
                        name="premium"
                        @change="onPaidFilter"
                        v-model="premium"
                        type="checkbox"
                        class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="paid" class="font-medium text-gray-900"
                        >Python</label
                      >
                    </div>
                  </div>

                  <div class="flex gap-3 py-2">
                    <div class="flex h-6 items-center">
                      <input
                        id="free"
                        value="free"
                        name="premium"
                        v-model="free"
                        @change="onFreeFilter"
                        type="checkbox"
                        class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="free" class="font-medium text-gray-900"
                        >Rust</label
                      >
                    </div>
                  </div>
                  <div class="relative flex gap-3 py-2">
                    <div class="flex h-6 items-center">
                      <input
                        id="paid"
                        value="paid"
                        name="premium"
                        @change="onPaidFilter"
                        v-model="premium"
                        type="checkbox"
                        class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="paid" class="font-medium text-gray-900"
                        >Java</label
                      >
                    </div>
                  </div>

                  <div class="flex gap-3 py-2">
                    <div class="flex h-6 items-center">
                      <input
                        id="free"
                        value="free"
                        name="premium"
                        v-model="free"
                        @change="onFreeFilter"
                        type="checkbox"
                        class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="free" class="font-medium text-gray-900"
                        >Ruby</label
                      >
                    </div>
                  </div>
                  <div class="relative flex gap-3 py-2">
                    <div class="flex h-6 items-center">
                      <input
                        id="paid"
                        value="paid"
                        name="premium"
                        @change="onPaidFilter"
                        v-model="premium"
                        type="checkbox"
                        class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div class="text-sm leading-6">
                      <label for="paid" class="font-medium text-gray-900"
                        >.Net</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style>
</style>