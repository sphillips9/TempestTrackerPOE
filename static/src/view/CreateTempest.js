var hourInMillis = 3600000;

tempestProjectNamespace.view.createTempest = {
    setupUserInterface: function () {
        var saveButton = document.forms['Tempest'].commit;
        // load all tempest objects
        Tempest.loadAll();
        // Set an event handler for the save/submit button
        saveButton.addEventListener("click", tempestProjectNamespace.view.createTempest.handleSaveButtonClickEvent);
        window.addEventListener("before unload", function () {
            Tempest.saveAll();
        });
    },
    handleSaveButtonClickEvent: function () {
        var tempStartTime = Date.now();
        var tempEndTime = tempStartTime + hourInMillis;

        var createTempestForm = document.forms['Tempest'];
        var slots = {type: createTempestForm.Type.value,
            difficulty: createTempestForm.Difficulty.value,
            zone: createTempestForm.Zone.value,
            startTime: tempStartTime.value,
            endTime: tempEndTime.value};
        Tempest.add(slots);
        Tempest.saveAll();
        createTempestForm.reset();
    }
};