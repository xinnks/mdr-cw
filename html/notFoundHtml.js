const { css } = require("./css");

export const NotFoundHtml = `
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>404 | My Daily Reads</title>
  <meta name="description" content="Page not found.">
  
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
        Page Not Found
      </p>

      <p class="p-4 mb-4 mt-40 width-full text-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="200" width="200"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linejoin:round;stroke-width:2px;}</style></defs><title>36-404 error</title><g id="_36-404_error" data-name="36-404 error"><polyline class="cls-1" points="12 25 1 25 1 21 1 1 31 1 31 21 31 25 20 25"/><line class="cls-1" x1="22" y1="31" x2="25" y2="31"/><line class="cls-1" x1="7" y1="31" x2="10" y2="31"/><polygon class="cls-1" points="22 31 10 31 12 25 20 25 22 31"/><line class="cls-1" x1="1" y1="21" x2="31" y2="21"/><polyline class="cls-1" points="6 8 6 12 9 12 11 12"/><polyline class="cls-1" points="9 8 9 12 9 15"/><polyline class="cls-1" points="21 8 21 12 24 12 26 12"/><polyline class="cls-1" points="24 8 24 12 24 15"/><rect class="cls-1" x="13" y="9" width="5" height="5"/></g></svg>
      </p>

    </main>

  </div>
</body>

</html>
`;