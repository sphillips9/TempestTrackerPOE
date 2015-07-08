/** @jsx React.DOM */
'use strict'
var React = require('react')
var TempestApp = require('./TempestApp')

var options = [
  { value: 'merciless', label: 'merciless' },
  { value: 'cruel', label: 'cruel' },
  { value: 'normal', label: 'normal' }
];


var options2 = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' }
];


var mapOptions = [ { value: 'Crypt', label: 'Crypt' },
  { value: 'Dried Lake', label: 'Dried Lake' },
  { value: 'Grotto', label: 'Grotto' },
  { value: 'Tropical Island', label: 'Tropical Island'},
  { value: 'Dunes', label: 'Dunes' },
  { value: 'Dungeon', label: 'Dungeon' },
  { value: 'Orchard', label: 'Orchard' },
  { value: 'Overgrown Ruin', label: 'Overgrown Ruin'},
  { value: 'Cemetery', label: 'Cemetery' },
  { value: 'Thicket', label: 'Thicket' },
  { value: 'Mountain Ledge', label: 'Mountain Ledge'},
  { value: 'Arcade', label: 'Arcade' },
  { value: 'Wharf', label: 'Wharf' },
  { value: 'Arsenal', label: 'Arsenal' },
  { value: 'Sewer', label: 'Sewer' },
  { value: 'Reef', label: 'Reef' },
  { value: 'Spider Lair', label: 'Spider Lair' },
  { value: 'Museum', label: 'Museum' },
  { value: 'Ghetto', label: 'Ghetto' },
  { value: 'Vaal Pyramid', label: 'Vaal Pyramid'},
  { value: 'Springs', label: 'Springs' },
  { value: 'Mud Geyser', label: 'Mud Geyser' },
  { value: 'Promenade', label: 'Promenade' },
  { value: 'Spider Forest', label: 'Spider Forest'},
  { value: 'Catacombs', label: 'Catacombs' },
  { value: 'Tunnel', label: 'Tunnel' },
  { value: 'Overgrown Shrine', label: 'Overgrown Shrine'},
  { value: 'Shore', label: 'Shore' },
  { value: 'Villa', label: 'Villa' },
  { value: 'Graveyard', label: 'Graveyard' },
  { value: 'Pier', label: 'Pier' },
  { value: 'Underground Sea', label: 'Underground Sea'},
  { value: 'Bog', label: 'Bog' },
  { value: 'Coves', label: 'Coves' },
  { value: 'Dry Woods', label: 'Dry Woods' },
  { value: 'Arachnid Nest', label: 'Arachnid Nest'},
  { value: 'Temple', label: 'Temple' },
  { value: 'Strand', label: 'Strand' },
  { value: 'Colonnade', label: 'Colonnade' },
  { value: 'Jungle Valley', label: 'Jungle Valley'},
  { value: 'Torture Chamber', label: 'Torture Chamber'},
  { value: 'Waste Pool', label: 'Waste Pool' },
  { value: 'Mine', label: 'Mine' },
  { value: 'Labyrinth', label: 'Labyrinth' },
  { value: 'Dry Peninsula', label: 'Dry Peninsula'},
  { value: 'Canyon', label: 'Canyon' },
  { value: 'Cells', label: 'Cells' },
  { value: 'Dark Forest', label: 'Dark Forest' },
  { value: 'Maze', label: 'Maze' },
  { value: 'Gorge', label: 'Gorge' },
  { value: 'Underground River', label: 'Underground River'},
  { value: 'Residence', label: 'Residence' },
  { value: 'Necropolis', label: 'Necropolis' },
  { value: 'Bazaar', label: 'Bazaar' },
  { value: 'Plateau', label: 'Plateau' },
  { value: 'Precinct', label: 'Precinct' },
  { value: 'Academy', label: 'Academy' },
  { value: 'Crematorium', label: 'Crematorium' },
  { value: 'Shipyard', label: 'Shipyard' },
  { value: 'Shrine', label: 'Shrine' },
  { value: 'Palace', label: 'Palace' },
  { value: 'Courtyard', label: 'Courtyard' } ];


React.render(

  <TempestApp
  options={options}
  options2={options2}
  mapOptions={mapOptions}
  prefixes = {prefixes}
  suffixes = {suffixes}
  />,
  document.getElementById('content')
);
