tempestProjectNamespace.view.DeleteTempest = {
    setupUserInterface: function () {
        var deleteButton = document.forms['Tempest'].commit;
        var selectEl = document.forms['Tempest'].selectTempest;
        var i=0, key="", keys=[], tempest=null, optionEl=null;
        // load all tempest objects
        Tempest.loadAll();
        keys = Object.keys(Tempest.instances);
        // populate the selection list with Tempests
        for (i=0; i < keys.length; i++) {
            key = keys[i];
            tempest = Tempest.instances[key];
            optionEl = document.createElement("option");
            optionEl.text = tempest.Type;
            optionEl.value = tempest.Type;
            console.log("added: " + tempest.Type + " to the drop down list");
            selectEl.add(optionEl, null);
        }
        deleteButton.addEventListener("click", tempestProjectNamespace.view.DeleteTempest.handleDeleteButtonClickEvent);
        window.addEventListener("before unload", function () {
            Tempest.saveAll();
        });
    },
    handleDeleteButtonClickEvent: function () {
        var selectEl = document.forms['Tempest'].selectTempest;
        var type = selectEl.value;
        if (type) {
            Tempest.destroy(type);
            selectEl.remove(selectEl.selectedIndex);
        }
    }
};