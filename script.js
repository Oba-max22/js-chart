const multiplyAll = (...numbers) => {
  if (numbers.length === 0) return 0;

  return numbers.reduce((acc, current) => acc * current, 1);
};

console.log(multiplyAll(2, 3, 4));
console.log(multiplyAll(5, 10));

async function renderUserCityDistributionChart() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        const cityCounts = users.reduce((acc, user) => {
            const city = user.address.city;
            acc[city] = (acc[city] || 0) + 1;
            return acc;
        }, {});

        const chartData = Object.keys(cityCounts).map(city => ({
            index: city,
            value: cityCounts[city]
        }));

        const container = document.getElementById('city-canvas');
        
        const surface = { 
            name: 'Users by City', 
            tab: 'Charts', 
            styles: { height: '400px' } 
        };

        const opts = {
            xLabel: 'City Name',
            yLabel: 'Number of Residents',
            height: 400
        };

        tfvis.render.barchart(container, chartData, opts);

    } catch (error) {
        console.error("Failed to render chart:", error);
    }
}

renderUserCityDistributionChart();

async function renderDateChart() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        const timeData = users.map((user, index) => {
            return {
                x: new Date(2025, index, 1), 
                y: index + 1
            };
        });

        const container = document.getElementById('date-canvas');

        const surface = { name: 'User Registration Growth', parent: container };
        
        const opts = {
            xLabel: 'Registration Date',
            yLabel: 'Total Users',
            height: 400,
            zoomToFit: true 
        };

        tfvis.render.linechart(surface, { values: timeData }, opts);

        console.log("Time-series plot rendered using synthesized dates.");

    } catch (error) {
        console.error("Error rendering date chart:", error);
    }
}

renderDateChart();