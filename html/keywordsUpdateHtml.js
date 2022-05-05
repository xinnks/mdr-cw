const { css } = require("./css");

export const KeywordsUpdateHtml = `
<!DOCTYPE html>
<html>

<head>
  <title>Update Content Keywords | My Daily Reads</title>
  <meta name="description" content="Get customized dev content for your reading delivered to your inbox daily.">
  
  <style>
    ${css}
  </style>
</head>

<body>
  <div style="min-height: 100vh;" class="p-0 m-0 w-full bg-gray-200">

    <main class="flex flex-col items-center justify-around py-8 px-8">

      <h1 class="p-8 m-6 text-4xl font-bold">
        My Daily Reads
      </h1>

      <p class="p-4 m-4 width-full text-xl">
        Update your daily reads content keywords.
      </p>

      <div
        class="flex flex-col p-4 m-4 max-w-lg mx-auto bg-white rounded-xl shadow-lg sm:py-4">
        <p class="p-4 max-w-lg">
          Add the OTP from the email we sent you and fill in the new keywords to your My Daily Reads content.
        </p>

        <form action="/update-keywords" method="post" class="grid grid-cols-4 grid-rows-auto gap-3 place-content-around p-4 m-4">

          <label for="otp" class="col-start-1">OTP: </label>
          <input type="text" name="otp" class="col-start-2 col-span-3 h-8 p-4 rounded-sm border-sm ring-2 ring-gray-500" required>

          <label for="keywords" class="col-start-1">Keywords: </label>
          <input type="text" name="keywords" class="col-start-2 col-span-3 h-8 p-4 rounded-sm border-sm ring-2 ring-gray-500" required>

          <button type="submit" class="col-start-2 col-span-2 h-10 p-2 rounded-md border-gray-700 bg-gray-700 hover:bg-gray-800 text-white ring-2 ring-gray-500 mt-4">VERIFY</button>
        
        </form>
      </div>

    </main>

  </div>
</body>

</html>
`;