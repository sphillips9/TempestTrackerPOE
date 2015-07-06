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

React.render(

  <TempestApp options={options} options2={options2}/>,
  document.getElementById('content')
);
