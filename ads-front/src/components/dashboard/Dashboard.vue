<template>
  <div class="w-full bg-gray-200 p-0">
    <div class="flex flex-wrap sm:flex-wrap md:flex-nowrap p-5 gap-4 w-full">
      <div class="flex flex-col w-full md:w-1/3 bg-white p-3 rounded-md">
        <div class="flex justify-between items-center w-full">
          <h3>今日の消化金額</h3>
          <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            支払い
          </button>
        </div>

        <div class="pl-10">
          <div class="flex items-end mt-3">
            <p class="text-2xl">129129843</p>
            <span class="text-xs pl-0.5">JPY</span>
          </div>
          <p class="text-xs mt-5">使用可能 0 JPY</p>
        </div>
      </div>

      <div class="flex flex-col w-full md:w-2/3 bg-white p-3 rounded-md">
        <h3 class="py-2">広告セットのステータス</h3>

        <div class="flex">
          <div
            class="flex flex-col w-1/3 items-align justify-center text-center"
          >
            <p class="text-blue-600 text-3xl">80</p>
            <p>配信中</p>
          </div>

          <div
            class="flex flex-col w-1/3 items-align justify-center text-center"
          >
            <p class="text-red-500 text-3xl">80</p>
            <p>不ぬ迅</p>
          </div>

          <div
            class="flex flex-col w-1/3 items-align justify-center text-center"
          >
            <p class="text-3xl">80</p>
            <p>配信中</p>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full px-5 pb-5">
      <p class="text-2xl pb-5">概要</p>

      <div class="bg-white rounded-md">
        <div class="flex justify-between w-full p-3">
          <h2>トレンド</h2>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </div>

        <div class="w-full p-5">
          <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <li
              class="border-solid border-l-4 border-blue-500 p-2 bg-gray-200 rounded-sm"
            >
              <h3 class="flex">
                費用

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </h3>

              <p class="flex text-blue-500">
                5488790
                <span class="text-black pl-1">JPY</span>
              </p>
            </li>
            <li
              class="border-solid border-l-4 border-green-500 p-2 bg-gray-200 rounded-sm"
            >
              <h3 class="flex">
                インプレッション

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </h3>

              <p class="flex text-green-500">
                5488790
                <span class="text-black pl-1">JPY</span>
              </p>
            </li>
            <li
              class="border-solid border-l-4 border-yellow-500 p-2 bg-gray-200 rounded-sm"
            >
              <h3 class="flex">
                クリック

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </h3>

              <p class="flex text-yellow-500">
                5488790
                <span class="text-black pl-1">JPY</span>
              </p>
            </li>
            <li
              class="border-solid border-l-4 border-red-500 p-2 bg-gray-200 rounded-sm"
            >
              <h3 class="flex">
                コンバージョン

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </h3>

              <p class="flex text-red-500">
                5488790
                <span class="text-black pl-1">JPY</span>
              </p>
            </li>
          </ul>
        </div>

        <div class="w-full h-auto p-10">
          <Chart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from './Chart.vue'
</script>
