/** Tempest object used to store values associated with different tempests*/
function Tempest(slots) {
    this.type = slots.type;
    this.difficulty = slots.difficulty;
    this.zone = slots.zone;
    this.startTime = slots.startTime;
    this.endTime = slots.endTime;
}

var hourInMillis = 3600000;
var tempestInstances = [];

Tempest.convertRow2Obj = function(tempestRow) {
    return new Tempest(tempestRow);
};

Tempest.loadAll = function() {
    var i = 0, key = "", keys = [], tempestTableString = "", tempestTable = {};
    try {
        if (localStorage["tempestTable"]) {
            tempestTableString = localStorage["tempestTable"];
        }
    } catch (ex)
    {
        alert("Error when reading from Local Storage\n" + ex);
    }

    if (tempestTableString) {
        tempestTable = JSON.parse(tempestTableString);
        keys = Object.keys(tempestTable);
        console.log(keys.length + " tempests loaded.");
        tempestInstances = [];
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            tempestInstances.push(Tempest.convertRow2Obj(tempestTable[key]));
        }
    }
};

Tempest.saveAll = function() {
    var tempestTableString="", error=false, tempestCount = Object.keys(tempestInstances).length;
    try {
        tempestTableString = JSON.stringify(tempestInstances);
        localStorage["tempestTable"] = tempestTableString;
    } catch (ex) {
        alert("Error when writing to Local Storage\n" + ex);
        error = true;
    }
    if (!error) console.log(tempestCount + " tempests saved.");
};

Tempest.add = function(slots) {
    tempestInstances.push(new Tempest(slots));
    console.log("Tempest " + slots.type + " created!");
};

Tempest.destroyOldTempests = function() {
    Tempest.loadAll();

    tempestInstances = tempestInstances.filter(function (temp) {
        return temp.startTime > 0;
    });

    Tempest.saveAll();
};

Tempest.createTestData = function() {
    var tempStartTime = Date.now();
    var tempEndTime = tempStartTime + hourInMillis;
    Tempest.add(new Tempest({type:"Damage", difficulty: "Normal", zone: "Ledge", startTime:tempStartTime, endTime: tempEndTime}));
    Tempest.add(new Tempest({type:"Rarity", difficulty: "Cruel", zone: "Riverways", startTime:tempStartTime, endTime: tempEndTime}));
    Tempest.add(new Tempest({type:"Speed", difficulty: "Merciless", zone: "Docks", startTime:tempStartTime, endTime: tempEndTime}));
    Tempest.add(new Tempest({type:"Animate Weapons", difficulty: "Map", zone: "Tropical Island", startTime:tempStartTime, endTime: tempEndTime}));
    Tempest.saveAll();
};

Tempest.clearData = function() {
    if (confirm("Do you really want to delete all tempests?")) {
        localStorage["tempestTable"] = "{}";
    }
};