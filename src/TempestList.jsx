/** @jsx React.DOM */

var React = require('react')
var TempestItem = require('./TempestItem');

module.exports = React.createClass({
  render: function() {

    var tempestNodes = this.props.data.map(function (tempest) {
     return (
       <TempestItem
       type={tempest.type}
       difficulty={tempest.difficulty}
       zone={tempest.zone}
       expire={tempest.expire}
       key={tempest.id}
       prefix={tempest.prefix}
       suffix={tempest.suffix}
       />

     );
   });

    return (
      <div className="tempestList ui divided items">
        {tempestNodes}
      </div>
    );
  }
});
