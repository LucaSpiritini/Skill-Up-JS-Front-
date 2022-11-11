import React from 'react'

const Footer = () => {
  return (
    <footer class="p-4 bg-black text-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
    <div class="sm:flex sm:items-center sm:justify-between">
            <span class="self-center text-2xl ml-2 sm:mr-20 font-semibold whitespace-nowrap dark:text-white">Alkemy Bank</span>
        <ul class="flex flex-wrap items-center mb-6 text-sm sm:mb-0 dark:text-gray-400">
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
                <a href="#" class="mr-4 hover:underline md:mr-6 ">Licensing</a>
            </li>
            <li>
                <a href="#" class="hover:underline">Contact</a>
            </li>
        </ul>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span class="block text-sm sm:text-center dark:text-gray-400">© 2022 AlkemyBank™. All Rights Reserved.
    </span>
</footer>
  )
}

export default Footer