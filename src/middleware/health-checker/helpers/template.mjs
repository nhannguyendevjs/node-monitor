import Handlebars from 'handlebars';

const getHealthCheckTemplate = () => {
  return Handlebars.compile(`
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Node monitor</title>
        <!-- Apexcharts -->
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        <!-- Socket.IO -->
        <script src="https://cdn.socket.io/4.7.5/socket.io.min.js" integrity="sha384-2huaZvOR9iDzHqslqwpR87isEmrfxqyWOF7hr7BY6KG0+hVKLoEXMPUJw3ynWuhO" crossorigin="anonymous"></script>
        <!-- Tailwindcss -->
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <main>
          <!-- OS Info -->
          <section class="p-4">
            <p class="text-xl font-bold text-gray-500">OS info</p>
            <section id="osInfo" class="p-4"></section>
          </section>

          <!-- CPU usage -->
          <section class="p-4 grid grid-cols-4 gap-4">
            <!-- Left -->
            <section>
              <p class="text-xl font-bold text-gray-500">CPU usage</p>
              <p class="text-4xl font-bold"><span id="cpuUsage">0</span>%</p>
            </section>
            <!-- Right -->
            <section class="col-span-3">
              <div id="cpuUsageChart" class="w-full h-full"></div>
            </section>
          </section>

          <!-- Memory usage -->
          <section class="p-4 grid grid-cols-4 gap-4">
            <!-- Left -->
            <section>
              <p class="text-xl font-bold text-gray-500">Memory usage</p>
              <p class="text-4xl font-bold"><span id="memoryUsage">0</span>MB</p>
            </section>
            <!-- Right -->
            <section class="col-span-3">
              <div id="memoryUsageChart" class="w-full h-full"></div>
            </section>
        </main>

        <script>
          // Real-time monitoring
          const socket = io('http://localhost:3000');
          socket.on('status', (message) => {
            console.log(message);
          });

          // Initial data
          const data = {{{data}}};
          const osInfoData = data.osInfo;
          const cpuUsage = data.cpuUsage;
          const memoryUsage = data.memoryUsage;

          // OS Info
          const osInfoElement = document.querySelector('#osInfo');
          const osInfoInnerHTML = Object.keys(osInfoData).reduce((acc, key) => {
            return acc + \`<p><span class="font-bold">\${key}</span>: \${osInfoData[key]}</p>\`;
          }, '');
          osInfoElement.innerHTML = osInfoInnerHTML;

          // CPU usage chart
          const cpuUsageChartOptions = {
            chart: {
              type: 'area',
              height: 350
            },
            stroke: {
              curve: 'smooth'
            },
            series: [{
              name: 'CPU usage',
              data: [[new Date().getTime(), cpuUsage]]
            }],
            xaxis: {
              type: 'datetime'
            }
          };
          const cpuUsageChart = new ApexCharts(document.querySelector('#cpuUsageChart'), cpuUsageChartOptions);
          cpuUsageChart.render();

          // Memory usage chart
          const memoryUsageChartOptions = {
            chart: {
              type: 'area',
              height: 350
            },
            stroke: {
              curve: 'smooth'
            },
            series: [{
              name: 'Memory usage',
              data: [[new Date().getTime(), memoryUsage]]
            }],
            xaxis: {
              type: 'datetime'
            }
          };
          const memoryUsageChart = new ApexCharts(document.querySelector('#memoryUsageChart'), memoryUsageChartOptions);
          memoryUsageChart.render();
        </script>
      </body>
    </html>
  `);
};

export { getHealthCheckTemplate };
