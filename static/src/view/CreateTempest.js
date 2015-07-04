tempestProjectNamespace.view.createTempest = {
    setupUserInterface: function () {
        var saveButton = document.forms['Tempest'].commit;
        // Set an event handler for the save/submit button
        saveButton.addEventListener("click", tempestProjectNamespace.view.createTempest.handleSaveButtonClickEvent);
    },

    handleSaveButtonClickEvent: function () {
        var createTempestForm = document.forms['Tempest'];

        var tempestObject = {
            type: createTempestForm.Type.value,
            difficulty: createTempestForm.Difficulty.value,
            zone: createTempestForm.Zone.value
        };

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://gdf3.com:555/tempest");
        xhr.send(JSON.stringify(tempestObject));

        createTempestForm.reset();
    }
};