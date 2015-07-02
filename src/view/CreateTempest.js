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
        var createTempestForm = document.forms['Tempest'];
        var slots = { Type: createTempestForm.Type.value,
            difficulty: createTempestForm.difficulty.value,
            zone: createTempestForm.zone.value,
            duration: createTempestForm.Duration.value};
        Tempest.add(slots);
        Tempest.saveAll();
        createTempestForm.reset();
    }
};