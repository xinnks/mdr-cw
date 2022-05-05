const { css } = require("./css");

export const successHtml = `
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Congrats | My Daily Reads</title>
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
        Contrats! You have successfully subscribed to a daily dose of dev content.
      </p>

      <div
        class="flex flex-col p-4 m-4 max-w-lg mx-auto bg-white rounded-xl shadow-lg sm:py-4">
        <p class="p-4 max-w-lg text-4xl text-center">
          CONGRATS!!
        </p>
      </div>

    </main>

  </div>
</body>

</html>
`;