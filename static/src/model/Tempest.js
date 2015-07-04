/** Tempest object used to store values associated with different tempests*/
function Tempest(slots) {
    this.type = slots.type;
    this.difficulty = slots.difficulty;
    this.zone = slots.zone;
    this.startTime = slots.startTime;
    this.endTime = slots.endTime;
}

Tempest.add = function(slots) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://gdf3.com:555/tempest");
    xhr.send(JSON.stringify(slots));
};

Tempest.createTestData = function() {
    Tempest.add(new Tempest({type:"Damage", difficulty: "Normal", zone: "Ledge"}));
    Tempest.add(new Tempest({type:"Rarity", difficulty: "Cruel", zone: "Riverways"}));
    Tempest.add(new Tempest({type:"Speed", difficulty: "Merciless", zone: "Docks"}));
    Tempest.add(new Tempest({type:"Animate Weapons", difficulty: "Map", zone: "Tropical Island"}));
};