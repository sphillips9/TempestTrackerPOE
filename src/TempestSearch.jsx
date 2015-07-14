/** @jsx React.DOM */

var React = require('react')
var Select = require('react-select');

module.exports = React.createClass({

  logChange: function(val) {
    console.log("Selected: " + val);
  },
  postTempest:function(){


  },

  render: function() {

    var addTempestClass = 'hidden';

    if (this.props.isAddOpen){
      addTempestClass = '';
    }

    var currentPrefix = {value:this.props.selectedPrefix, label:PREFIXMAP[this.props.selectedPrefix]};
    var currentSuffix = {value:this.props.selectedSuffix, label:SUFFIXMAP[this.props.selectedSuffix]};
    var currentMap = maps[this.props.selectedMap];

    return(
    <div className="tempestSearch">

    <div className="ui raised segment">
    <div>

      <div className="inline">

          <Select className="widthwidth"
            name="form-field-name"
            options={this.props.options}
            onChange={this.props.setMap}
            value={currentMap}
            placeholder={"select map..."}
          />
      </div>

        <div className="ui right floated header">
          <button className="ui basic button"  onClick={this.props.toggleAddOpen}>
            <i className="dropdown icon"></i>
            Add Tempest
          </button>
        </div>

      </div>


      <div className = {addTempestClass}>

        <h4 className ="ui horizontal divider header">
          <i className ="tag icon"></i>
          Description
        </h4>

        <label>Tempest Prefix</label>
        <Select
          name="tempest-prefix"
          options={this.props.prefixes}
          onChange={this.props.setPrefix}
          value={currentPrefix}
        />

        <label>Tempest Suffix</label>
        <Select
          name="tempest-suffix"
          options={this.props.suffixes}
          onChange={this.props.setSuffix}
          value={currentSuffix}
        />

        <div className="ui form">

        <div className="field">
          <label>Minutes Left</label>
          <input name="tempest-duration"
          placeholder="minutes left"
          value={this.props.selectedDuration}
          type="text"
          onChange={this.props.setDuration}
          />
        </div>

        <button className="ui basic button" onClick={this.props.postTempest}>
          <i className="icon user"></i>
          Submit
        </button>
        </div>
        </div>
      </div>

    </div>
    );

  }

});
