const { css } = require("./css");

export const messageHtml = (title, message) => `
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title} | My Daily Reads</title>
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

      <p class="p-4 mb-4 m-4 width-full text-3xl">
        ${title}
      </p>

      <p class="p-4 mb-4 mt-10 width-full text-2xl">
        ${message}
      </p>

    </main>

  </div>
</body>

</html>
`;