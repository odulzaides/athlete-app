// zones  object
var zonesData = {
    testResults: [
        {
            date: [
                '10-2016',
                230,
                152
            ]
        },
        {
            date: [
                '11-2016',
                235,
                152
            ]
        },
        {
            date: [
                '12-2016',
                239,
                153
            ]
        },
        {
            date: [
                '1-2017',
                242,
                154
            ]
        },
        {
            date: [
                '2-2017',
                250,
                158
            ]
        },
        {
            date: [
                '3-2017',
                255,
                160
            ]
        },
        {
            date: [
                '4-2017',
                355,
                175
            ]
        }
    ],
    powerZones: [],
    lthrZones: [],
    /* TODO: 1. setup the submit button to
                a. save ftp and lthr to 'testResults' localStorage
                b. assign Json.parse(localStorage) to the testResults: prop
                c. make a user ID localStorage you can use.


      */
    setZones: function (typeOfMetric) {
        return function (metric) {
            zones = [];
            if (typeOfMetric === 'ftp') {
                zonesData.powerZones = [0, .55, .56, .75, .76, .90, .91, 1.05, 1.06, 1.20, 1.21, 1.50, 1.51].map((item) => Math.floor(item * metric));
            } else {
                zonesData.lthrZones = [0, .85, .86, .90, .91, .95, .96, .99, 1, 1.02, 1.03, 1.06, 1.06].map((item) => Math.floor(item * metric));
            }
        }
    },
    // TODO: 2. refactor get methods to not repeat.
    //
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
var changePower = function () {
    var ftpinput = $('#ftp').val();
    var setZones = zonesData.setZones('ftp');
    setZones(ftpinput);
    zonesData.getPowerZoneTableData();
}

// display updated HR data
var changeHeartRate = function () {
    var lthrInput = $('#lthr').val();
    var setZones = zonesData.setZones('lthr')
    setZones(lthrInput);
    zonesData.getHeartRateZoneTableData();

}


///////////////////////////
///     Chart        /////
//////////////////////////

// Setup labels
var Labels = function () {

    var testDate = [],
        testFTP = [],
        testLTHR = [],
        result = zonesData['testResults'].map(function (a) {
            testDate.push(a.date[0]);
            testFTP.push(a.date[1]);
            testLTHR.push(a.date[2]);
            //return testDate, testFTP, testLTHR;
        });
    //console.log(testDate, testFTP, testLTHR);
    return {
        testDate: testDate,
        testFTP: testFTP,
        testLTHR: testLTHR
    }
}();

// canvas element
var ctx = document.querySelector('#progress-chart');

// Data for Chart

var data = {
    labels: Labels.testDate, // FIXME: get dates from zoneData.ftp/zoneData array of objects
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
            data: Labels.testFTP,
            spanGaps: false
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
            data: Labels.testLTHR,
            spanGaps: false
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



