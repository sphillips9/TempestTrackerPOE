/** @jsx React.DOM */

var React = require('react')
var TempestItem = require('./TempestItem');

module.exports = React.createClass({
  render: function() {
    var prefixRatings = this.props.prefixRatings;
    var suffixRatings = this.props.suffixRatings;

    var tempestNodes = this.props.data.map(function (tempest) {

    var prefix=tempest.prefix;
    var suffix=tempest.suffix;

    var pr =0;
    var sr = 0;

    if (prefixRatings[prefix].Votes > 0){
      pr = prefixRatings[prefix].Upvotes/prefixRatings[prefix].Votes;
    }

    if (suffixRatings[suffix].Votes>0){
      sr = suffixRatings[suffix].Upvotes/suffixRatings[suffix].Votes;
    }

    var rating = (50*(pr + sr))|0;

     return (
       <TempestItem
       type={tempest.type}
       difficulty={tempest.difficulty}
       zone={tempest.zone}
       expire={tempest.expire}
       key={tempest.id}
       prefix={prefix}
       suffix={suffix}
       rating={rating}
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
