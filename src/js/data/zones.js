// zones  object
var zonesData = {
    ftp: 230,
    lthr: 152,
    powerZones: [],
    lthrZones: [],
    setPowerZones: function (ftp) {
        var mult = [0, .55, .56, .75, .76, .90, .91, 1.05, 1.06, 1.20, 1.21, 1.50, 1.51];

        function calculateZones() {

            for (var i = 0; i < mult.length; i++) {

                this.powerZones.push(Math.floor(this.ftp * mult[i]));
            }
        }

        calculateZones.call(this);
    },
    setHeartRaterZones: function (ftp) {
        var mult = [0, .55, .56, .75, .76, .85, .86, .95, .96, 1.05, 1.06, 1.20, 1.21, 1.50];

        function calculateZones() {

            for (var i = 0; i < mult.length; i++) {

                this.lthrZones.push(Math.floor(this.lthr * mult[i]));
            }
        }

        calculateZones.call(this);
    },
    getPowerZoneTableData: function () {
    // TODO:
        // Table cells where power goes
        var tableDataPower = Array.prototype.slice.call(document.querySelectorAll('[data-group-power]'));
        // set zoneData as context for this method
        var that = this;

        var tableDataHeartRate = document.querySelectorAll('[data-group-lthr]');

        // Display power zones on table
        var writePowerZones = function () {
//
            var powerArr = that.powerZones;
            //var powerCell = tableDataPower;
            for (var i = 0; i <= powerArr.length; i += 2) {
                var low = i;
                var high = i + 1;
                // Display zone data
                if (tableDataPower.length === 1) {
                    //console.log(typeof tableDataPower);
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
        console.log(tableDataHeartRate);

        // set zoneData as context for this method
        var that = this;
        // Display power zones on table
        var writeHeartRateZones = function () {
            var powerArr = that.lthrZones;
            //var powerCell = tableDataPower;
            for (var i = 0; i <= powerArr.length; i += 2) {
                console.log(tableDataHeartRate);
                var low = i;
                var high = i + 1;
                // Display zone data
                if (tableDataHeartRate.length === 1) {
                    //console.log(typeof tableDataPower);
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


zonesData.setPowerZones();
zonesData.setHeartRaterZones();
console.log(zonesData.powerZones.length);
zonesData.getPowerZoneTableData();
zonesData.getHeartRateZoneTableData();



//console.log("HEART", zonesData.lthrZones);
