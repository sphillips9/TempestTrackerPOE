var maps = [];

maps[66]=[
"Crypt",
"Dried Lake",
"Grotto",
"Tropical Island",
"Dunes",
"Dungeon",
"Orchard",
"Overgrown Ruin"];
maps[67]=[
"Cemetery",
"Thicket",
"Mountain Ledge",
"Arcade",
"Wharf",
"Arsenal",
"Sewer"]
maps[68]=[
"Reef",
"Spider Lair",
"Museum",
"Ghetto",
"Vaal Pyramid",
"Springs",
"Mud Geyser"]
maps[69]=[
"Promenade",
"Spider Forest",
"Catacombs",
"Tunnel",
"Overgrown Shrine",
"Shore"]
maps[70]=[
"Villa",
"Graveyard",
"Pier",
"Underground Sea",
"Bog",
"Coves"]
maps[71]=[
"Dry Woods",
"Arachnid Nest",
"Temple",
"Strand",
"Colonnade"]
maps[72]=[
"Jungle Valley",
"Torture Chamber",
"Waste Pool",
"Mine",
"Labyrinth"];
maps[73]=[
"Dry Peninsula",
"Canyon",
"Cells",
"Dark Forest"];
maps[74]=[
"Maze",
"Gorge",
"Underground River",
"Residence"];
maps[75]=[
"Necropolis",
"Bazaar",
"Plateau"];
maps[76]=[
"Precinct",
"Academy",
"Crematorium"];
maps[77]=[
"Shipyard",
"Shrine"];
maps[78]=[
"Palace",
"Courtyard"];

var options = [];

for(var i = 66; i<=78;i++){

  maps[i].forEach(function(map){
    options.push({value:map, label:map});
  });

}

console.log(options);
