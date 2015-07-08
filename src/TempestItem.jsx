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
  rateUp:function(){
    this.postRating(1);
  },
  rateDown:function(){
    this.postRating(0);
  },
  postRating:function(vote){
    var client = new XMLHttpRequest();
    var rating = {};
    rating.Prefix = this.props.prefix;
    rating.Suffix = this.props.suffix;
    rating.Rating = vote;

    var json = JSON.stringify(rating);
    client.open("POST","http://tempesttrackers.com/vote");
    client.send(json);

  },
  render: function() {

    var dif = this.props.expire - Date.now();
    var remain = new Date(dif);
    var mins = remain.getMinutes();
    var timeRemaining;

    var prefix = PREFIXMAP[this.props.prefix];
    var suffix = SUFFIXMAP[this.props.suffix];

    if (mins){
      timeRemaining = mins + " minutes remaining ";
    }else{
      timeRemaining = " < 1 minute remaining"
    }

    var partyName = 'hidden';

    if (this.state.isPartyOpen){
      partyName = '';
    }

    var ratingClass = '';
    var rating = this.props.rating + '%';

    if (this.props.rating>=50){
      ratingClass = 'rating';
    }else if (this.props.rating>=0){
      ratingClass = 'rating bad';
    }else{
      rating = "";
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
            <span>{prefix} Tempest of {suffix}</span>
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
            <button className="compact green ui icon basic button" onClick={this.rateUp}>
              <i className="smile icon"></i>
            </button>

            <button className="compact red ui icon basic button" onClick={this.rateDown}>
              <i className="frown icon"></i>
            </button>

            <span className={ratingClass}>{rating}</span>


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
