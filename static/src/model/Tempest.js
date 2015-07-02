/** Tempest object used to store values associated with different tempests*/
function Tempest(slots) {
    this.Type = slots.Type;
    this.difficulty = slots.difficulty;
    this.zone = slots.zone;
    this.duration = slots.duration;
}

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
    console.log("Tempest " + slots.Type + " created!");
};

Tempest.destroyOldTempests = function() {
    Tempest.loadAll();
    for(i = 0; i < tempestInstances.length; i++) {
        if (tempestInstances[i].duration <= 0) {
            delete tempestInstances[i];
        }
    }
    Tempest.saveAll();
};

Tempest.createTestData = function() {
    Tempest.add(new Tempest({Type:"Damage", difficulty: "Normal", zone: "Ledge", duration:60}));
    Tempest.add(new Tempest({Type:"Rarity", difficulty: "Cruel", zone: "Riverways", duration:60}));
    Tempest.add(new Tempest({Type:"Speed", difficulty: "Merciless", zone: "Docks", duration:60}));
    Tempest.add(new Tempest({Type:"Animate Weapons", difficulty: "Map", zone: "Tropical Island", duration:0}));
    Tempest.saveAll();
};

Tempest.clearData = function() {
    if (confirm("Do you really want to delete all tempests?")) {
        localStorage["tempestTable"] = "{}";
    }
};