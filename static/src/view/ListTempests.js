var minutesInMillis = 60000;

tempestProjectNamespace.view.listTempests = {
    setupUserInterface: function () {
        var tableBodyEl = document.querySelector("table#Tempest>tbody");
        var i=0, keys=[], key="", row={};
        // load all tempests objects
        Tempest.loadAll();
        keys = Object.keys(tempestInstances);
        // for each tempest, create a table row with a cell for each attribute
        for (i=0; i < keys.length; i++) {
            key = keys[i];
            row = tableBodyEl.insertRow();
            var diff = tempestInstances[key].endTime - Date.now();

            row.insertCell(-1).textContent = tempestInstances[key].type;
            row.insertCell(-1).textContent = tempestInstances[key].difficulty;
            row.insertCell(-1).textContent = tempestInstances[key].zone;
            row.insertCell(-1).textContent = (diff/minutesInMillis | 0);
        }
    }
};