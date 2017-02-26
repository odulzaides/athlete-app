// zones  object
var zonesData = {
    ftp: [230,232,240,250],
    lthr: [144,145,148,152],// TODO: fix this array so that it is pushed from the set methods
    powerZones: [],
    lthrZones: [],
    // TODO: set this as a single DNR method
    setPowerZones: function (ftp) {
        this.ftp = ftp;
        var mult = [0, .55, .56, .75, .76, .90, .91, 1.05, 1.06, 1.20, 1.21, 1.50, 1.51];
        this.powerZones = [];

        function calculateZones() {
            for (var i = 0; i < mult.length; i++) {
                this.powerZones.push(Math.floor(this.ftp * mult[i]));
            }
        }

        calculateZones.call(this);
    },
    setHeartRaterZones: function (lthr) {
        this.lthr = lthr;
        var mult = [0, .85, .86, .90, .91, .95, .96, .99, 1, 1.02, 1.03, 1.06, 1.06];
        this.lthrZones = [];
        function calculateZones() {
            for (var i = 0; i < mult.length; i++) {

                this.lthrZones.push(Math.floor(this.lthr * mult[i]));
            }
        }

        calculateZones.call(this);
    },
    // todo: DNR the get methods
    getPowerZoneTableData: function () {
        // Table cells where power goes
        var tableDataPower = Array.prototype.slice.call(document.querySelectorAll('[data-group-power]'));
        // set zoneData as context for this method
        var that = this;

        // Display power zones on table
        var writePowerZones = function () {
            //var powerCell = tableDataPower;
            var powerArr = that.powerZones;
            for (var i = 0; i <= powerArr.length; i += 2) {
                var low = i;
                var high = i + 1;
                // Display zone data
                if (tableDataPower.length === 1) {
                    // NP zone
                    tableDataPower.shift().innerHTML = "Above - " + powerArr[low];
                } else {
                    tableDataPower.shift().innerHTML = powerArr[low] + " - " + powerArr[high];
                }
            }
        }
        writePowerZones();
    },
    getHeartRateZoneTableData: function () {
        // Table cells where power goes
        var tableDataHeartRate = Array.prototype.slice.call(document.querySelectorAll('[data-group-lthr]'));
        // set zoneData as context for this method
        var that = this;
        // Display power zones on table
        var writeHeartRateZones = function () {
            var powerArr = that.lthrZones;
            //var powerCell = tableDataPower;
            for (var i = 0; i <= powerArr.length; i += 2) {
                var low = i;
                var high = i + 1;
                // Display zone data
                if (tableDataHeartRate.length === 1) {
                    // NP zone
                    tableDataHeartRate.shift().innerHTML = "Above - " + powerArr[low];
                } else {
                    tableDataHeartRate.shift().innerHTML = powerArr[low] + " - " + powerArr[high];
                }
            }
        }
        writeHeartRateZones();
    }
}

//Helpers


// set data
//zonesData.setPowerZones(2130);

//Display updated power data
changePower = function (powerInput) {
    var powerInput = document.querySelector('#ftp').value;
    zonesData.setPowerZones(powerInput);
    zonesData.getPowerZoneTableData();

}

// display updated HR data
changeHeartRate = function (powerInput) {
    var lthrInput = $('#lthr').val();
    console.log(lthrInput);
    zonesData.setHeartRaterZones(lthrInput);
    zonesData.getHeartRateZoneTableData();

}


//Chart
// canvas element
var ctx = document.querySelector('#progress-chart');

// Data for Chart
var ftpOverTime = zonesData.ftp;
var lthrOverTime = zonesData.lthr;

var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "FTP",
            fill: false,
            lineTension: 0.1,
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
            data: ftpOverTime,
            spanGaps: false,
        },
        {
            label: "LTHR",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(255,0,0,0.4)",
            borderColor: "rgba(255,0,0,0.4)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(255,0,0,0.4)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,0,0,0.4)",
            pointHoverBorderColor: "rgba(255,0,0,0.4)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: lthrOverTime,
            spanGaps: false,
        }

    ]
};

//create chart
var progressChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'FTP and LTHR Porgress Chart'
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    }
});



