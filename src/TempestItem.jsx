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
            <span>{this.props.prefix} Tempest of {this.props.suffix}</span>
          </div>
          <div className="description">
          <p>{timeRemaining}</p>

          </div>

          <div className="bottom aligned extra">

        <div className="ui right floated">
          <button className="tiny ui basic button" onClick={this.toggleParty}>
            <i className="icon user"></i>
            groups
          </button>
          <div className="floating tiny ui blue label">22</div>
        </div>

        <div>

          <div>

            <div className="ui">
            <button className="compact green ui icon basic button">
              <i className="smile icon"></i>
            </button>

            <button className="compact red ui icon basic button">
              <i className="frown icon"></i>
            </button>

            <span className="rating">80%</span>


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
