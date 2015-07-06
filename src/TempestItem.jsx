/** @jsx React.DOM */

var React = require('react')

module.exports =React.createClass({
  getInitialState: function() {
    return {isPartyOpen:false};
  },
  toggleParty: function(){
    var cur = this.state.isPartyOpen;
    this.setState({isPartyOpen:!cur});
  },
  render: function() {

    var dif = this.props.expire - Date.now();
    var remain = new Date(dif);
    var mins = remain.getMinutes();
    var timeRemaining;

    if (mins){
      timeRemaining = mins + " minutes remaining ";
    }else{
      timeRemaining = " < 1 minute remaining"
    }

    var partyName = 'hidden';

    if (this.state.isPartyOpen){
      partyName = '';
    }

    return (
      <div className="tempestItem item">
        <div className="ui tiny image">
          <img src="map.png"/>
        </div>
        <div className="content">
          <a className="header">
            {this.props.zone}
          </a>
          <div className="meta">
            <span>{timeRemaining}</span>
          </div>
          <div className="description">
          <p>
              Description Of Tempest
          </p>

          </div>

          <div className="bottom aligned extra">

        <div className="ui right floated"><span onClick={this.toggleParty}>Party</span></div>

        <div>

          <div>
            <div className="ui label">{this.props.difficulty}</div>
            <div className="ui label">{this.props.type}</div>
            <div className="ui right floated">
              <img src="blue.png"/>
              <img src="blue.png"/>
              <img src="blue.png"/>
              <img src="blue.png" className="grayscale"/>
              <img src="blue.png" className="grayscale"/>
            </div>
          </div>

        </div>

        <div className={partyName}>
        <ul>
        <li>Party1</li>
        <li>party2</li>
        <li>party3</li>
        </ul>

        </div>



          </div>

        </div>
      </div>


    );
  }
});
