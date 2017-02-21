// zones  object
var zonesData = {
    ftp: 0,
    lthr: 0,
    powerZones: [],
    lthrZones: [],
    setPowerZones: function (ftp) {
        this.ftp = ftp;
        var mult = [0, .55, .56, .75, .76, .90, .91, 1.05, 1.06, 1.20, 1.21, 1.50, 1.51];
        function calculateZones() {
            for (var i = 0; i < mult.length; i++) {
                this.powerZones.push(Math.floor(this.ftp * mult[i]));
            }
        }
        calculateZones.call(this);
    },
    setHeartRaterZones: function (lthr) {
        this.lthr = lthr;
        var mult = [0, .85, .86, .90, .91, .95, .96,.99, 1, 1.02, 1.03, 1.06, 1.06];
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
            var powerArr = that.powerZones;
            //var powerCell = tableDataPower;
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
zonesData.setPowerZones(230);
zonesData.setHeartRaterZones(152);

// display data
zonesData.getPowerZoneTableData();
zonesData.getHeartRateZoneTableData();


