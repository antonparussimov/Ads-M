<template>
  <div class="w-full bg-gray-200 p-5">
    <div class="w-full px-4 py-4 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-between">
        <div class="flex gap-4">
          <span class="text-lg bg-gray-200 rounded-md py-1 px-3 my-auto">+フィルター</span>

          <div class="relative flex items-center">
            <span class="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mx-3 text-gray-400">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </span>

            <input
              type="text"
              placeholder="名称またはIDで検索する"
              class="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
        </div>

        <div class="flex justify-center">
          <input
            type="date"
            placeholder=""
            class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          />
					<span class="text-lg font-extrabold my-auto px-2">~</span>
					<input
            type="date"
            placeholder=""
            class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          />
        </div>
      </div>

      <div class="flex mt-2">
        <span>選択済み:</span>

				<div class="ml-5 flex flex-wrap bg-gray-200">
					広告セットのステータス:
					<select class="px-3 ml-3 w-52 bg-gray-200" data-te-select-init data-te-select-clear-button="true">
						<option value="1">One</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
						<option value="4">Four</option>
						<option value="5">Five</option>
					</select>
				</div>
      </div>
    </div>
  </div>
</template>
