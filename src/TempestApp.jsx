/** @jsx React.DOM */

var React = require('react');
var Dropdown = require('./Dropdown');
var TempestList = require('./TempestList');


module.exports = React.createClass({
  getInitialState: function() {
    return {NEXTID:0, data: [],selectedDifficulty: { value: 'merciless', label: 'merciless'}};
  },
  loadCommentsFromServer: function() {

    var self = this;
    var es = new EventSource("http://gdf3.com/es");
    es.onerror=function(e){
      es.close();
    }

    es.addEventListener("TEMPEST",function(e){
      var t = JSON.parse(e.data);

      var toAdd=[].concat(t).map(function(x){
        var clone = JSON.parse(JSON.stringify(x));
        clone.expire = new Date(clone.expire);
        clone.id = self.state.NEXTID++;
        return clone;
      });

      var combined = self.state.data.concat(toAdd);
      console.log("toadd",combined);
      self.setState({data:combined});
    });

  },
  selectDifficulty:function(option){

    this.setState({selectedDifficulty:option});

  },
  refreshTempests:function(){
    var self=this;
    var now = Date.now();
    var temp = this.state.data.filter(function(t){
      return (t.expire > now);
    });

    this.setState({data:temp});

  },
  render: function() {
    var self=this;

    var filtered = this.state.data.filter(function(t){
      return (t.difficulty.toLowerCase()===self.state.selectedDifficulty.value);
    });

    return (
      <div className="tempestApp">
        <h1>Active Tempests</h1>
        <div className="ui grid">
          <div className="eight wide column">
            <Dropdown options={this.props.options} value={this.state.selectedDifficulty} onChange={this.selectDifficulty}/>
          </div>
          <div className="eight wide column">
            <Dropdown options={this.props.options2} />
          </div>
        </div>
        <TempestList data={filtered} />

      </div>
    );
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.refreshTempests, 5000);
  },
  pushComment:function(){

  }
});
