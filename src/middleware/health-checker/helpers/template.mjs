import Handlebars from 'handlebars';

const getHealthCheckTemplate = () => {
  return Handlebars.compile(`
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Node monitor</title>
        <!-- Chart.js -->
        <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.min.js" integrity="sha512-L0Shl7nXXzIlBSUUPpxrokqq4ojqgZFQczTYlGjzONGTDAcLremjwaWv5A+EDLnxhQzY5xUZPWLOLqYRkY0Cbw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->
        <!-- Socket.IO -->
        <script src="https://cdn.socket.io/4.7.5/socket.io.min.js" integrity="sha384-2huaZvOR9iDzHqslqwpR87isEmrfxqyWOF7hr7BY6KG0+hVKLoEXMPUJw3ynWuhO" crossorigin="anonymous"></script>
        <!-- tailwindcss -->
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <header>
          <h1 class="h-14 text-2xl font-bold p-4">Node monitor</h1>
        </header>
        <main class="p-4">
          <pre>{{data}}</pre>
        </main>

        <script>
          const socket = io('http://localhost:3000');
          socket.on('status', (message) => {
            console.log(message);
          });
        </script>
      </body>
    </html>
  `);
};

export { getHealthCheckTemplate };
