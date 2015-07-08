/** @jsx React.DOM */

var React = require('react');
var Dropdown = require('./Dropdown');
var TempestList = require('./TempestList');
var TempestSearch = require('./TempestSearch')


module.exports = React.createClass({
  getInitialState: function() {
    return {
      NEXTID:0,
      data: [],
      selectedDifficulty: { value: 'merciless', label: 'merciless'},
      selectedMap:'',
      isAddOpen:false,
      selectedSuffix:'',
      selectedPrefix:'',
      selectedDuration:60
      };
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
  setMap:function(e){
    this.setState({selectedMap:e});
    console.log(e,e.length);
  },
  setPrefix:function(e){
    this.setState({selectedPrefix:e});
    console.log(e);
  },
  setSuffix:function(e){
    this.setState({selectedSuffix:e});
    console.log(e);
  },
  setDuration:function(e){
    this.setState({selectedDuration:e.target.value});
    console.log(e);
  },
  toggleAddOpen:function(e){
    console.log("toggle open");
    this.setState({isAddOpen:!this.state.isAddOpen});
  },
  postTempest:function(e){
    var tempest = {};
    tempest.zone = this.state.selectedMap;
    tempest.minutes = this.state.selectedDuration;
    tempest.prefix = this.state.selectedPrefix;
    tempest.suffix = this.state.selectedSuffix;

    this.setState({
      isAddOpen:false,
      selectedPrefix:'',
      selectedSuffix:'',
      selectedDuration:60
    });

    var client = new XMLHttpRequest();
    var json = JSON.stringify(tempest);

    console.log(json);
		client.open("POST","http://tempesttrackers.com/tempest");
		client.send(json);


  },
  render: function() {
    var self=this;

    var filtered = this.state.data.filter(function(t){
      if (self.state.selectedMap === ''){
        return true;
      }else{
        return (t.zone.toLowerCase()==self.state.selectedMap.toLowerCase());
      }
    });

    return (
      <div className="tempestApp">

        <TempestSearch
          options={this.props.mapOptions}
          prefixes={this.props.prefixes}
          suffixes={this.props.suffixes}
          setMap={this.setMap}
          setPrefix={this.setPrefix}
          setSuffix={this.setSuffix}
          setDuration={this.setDuration}
          selectedMap={this.state.selectedMap}
          toggleAddOpen={this.toggleAddOpen}
          isAddOpen={this.state.isAddOpen}
          selectedSuffix={this.state.selectedSuffix}
          selectedPrefix={this.state.selectedPrefix}
          selectedDuration={this.state.selectedDuration}
          postTempest={this.postTempest}
        />

        <div className="ui raised segment">
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
