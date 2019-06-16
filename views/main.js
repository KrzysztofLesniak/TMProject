'use strict';
Pusher.logToConsole = true;
var ctx = document.getElementById("myChart").getContext("2d");
var options = {};
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Bearing 1 Channel 2',
            fill: false,
            lineTension: 0.2,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
            spanGaps: false,
        }]
    },
    options: {

    }
});


function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
        if (Object.keys(dataset.data).length > 5) {
            dataset.data.splice(0, 1);
            chart.data.labels.splice(0, 1);
        }

    });
}



fetch("http://localhost:3000/getnumber")
    //  .then(res => res.json())
    .then(res => {
        var pusher = new Pusher('6f7f9a1e1b63ae36b3c4', {
            cluster: 'eu',
            forceTLS: true
        });
        var channel = pusher.subscribe("myChannel");
        channel.bind('myEvent', function(data) {
            addData(myChart, data.id, {
                x: data.id,
                y: data.value
            })
            myChart.update();
        });
    });