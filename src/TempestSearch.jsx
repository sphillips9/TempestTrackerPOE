/** @jsx React.DOM */

var React = require('react')
var Select = require('react-select');

module.exports = React.createClass({

  logChange: function(val) {
    console.log("Selected: " + val);
  },

  render: function() {

    console.log("rendering");

    return(
    <div className="tempestSearch">

      <div className="ui menu">
      <div className="item">

        <Select className="widthwidth"
          name="form-field-name"
          options={this.props.options}
          onChange={this.props.setMap}
          value={this.props.selectedMap}
        />
        </div>
        <div className="right menu">
          <a className="item">
            <i className="add square icon"></i>
            Add Tempest
          </a>
        </div>

      </div>

    </div>
    );

  }

});
