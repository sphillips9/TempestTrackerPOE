/** @jsx React.DOM */

var React = require('react')
var TempestItem = require('./TempestItem');

module.exports = React.createClass({
  render: function() {
    var self = this;
    var prefixRatings = this.props.prefixRatings;
    var suffixRatings = this.props.suffixRatings;

    var tempestNodes = this.props.data.map(function (tempest) {

      var prefix=tempest.prefix;
      var suffix=tempest.suffix;

      var pr =0;
      var sr = 0;
      var rating = -1;
      var factor=0;

      if (prefixRatings[prefix].Votes > 0){
        pr = prefixRatings[prefix].Upvotes/prefixRatings[prefix].Votes;
        factor++;
      }

      if (suffixRatings[suffix].Votes>0){
        sr = suffixRatings[suffix].Upvotes/suffixRatings[suffix].Votes;
        factor++;
      }

      if (factor>0){
        rating= ((100*(pr + sr))/factor)|0;
      }

       return (
         <TempestItem
         type={tempest.type}
         difficulty={tempest.difficulty}
         zone={tempest.zone}
         expire={tempest.expire}
         key={tempest.Id}
         tempestId={tempest.Id}
         prefix={prefix}
         suffix={suffix}
         rating={rating}
         tempestParties={self.props.tempestParties}
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
