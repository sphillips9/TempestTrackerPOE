/** @jsx React.DOM */

var React = require('react');
var Dropdown = require('./Dropdown');
var TempestList = require('./TempestList');
var TempestSearch = require('./TempestSearch')


module.exports = React.createClass({
  getInitialState: function() {

    var prefixRatings = [];
    var suffixRatings = [];

    for(var i = 0;i<40;i++){
      prefixRatings[i]={Upvotes:0,Votes:0};
    }

    for(var i = 0;i<19;i++){
      suffixRatings[i]={Upvotes:0,Votes:0};
    }

    return {
      NEXTID:0,
      data: [],
      selectedDifficulty: { value: 'merciless', label: 'merciless'},
      selectedMap:'',
      isAddOpen:false,
      isFiltersOpen:false,
      selectedSuffix:'',
      selectedPrefix:'',
      selectedDuration:60,
      prefixRatings:prefixRatings,
      suffixRatings:suffixRatings
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

    es.addEventListener("INITRATING",function(e){
      var ratings = JSON.parse(e.data);

      self.setState({
        prefixRatings:ratings.PrefixRatings,
        suffixRatings:ratings.SuffixRatings
      });

    });

    es.addEventListener("RATING",function(e){
      var ratings = JSON.parse(e.data);

      var suffixRatings = self.state.suffixRatings;
      var prefixRatings = self.state.prefixRatings;

      [].concat(ratings).forEach(function(rating){
        suffixRatings[rating.Suffix].Upvotes+=rating.Rating;
        suffixRatings[rating.Suffix].Votes++;
        prefixRatings[rating.Prefix].Upvotes+=rating.Rating;
        prefixRatings[rating.Prefix].Votes++;
      });

      self.setState({prefixRatings:prefixRatings, suffixRatings:suffixRatings});
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
  setPrefix:function(e,o){
    this.setState({selectedPrefix:e|0});
    console.log(e,o);
  },
  setSuffix:function(e,o){
    this.setState({selectedSuffix:e|0});
    console.log(e,o);
  },
  setDuration:function(e){
    this.setState({selectedDuration:e.target.value});
    console.log(e);
  },
  toggleAddOpen:function(e){
    console.log("toggle open");
    this.setState({isAddOpen:!this.state.isAddOpen});
  },
  toggleFiltersOpen:function(e){
    console.log("toggle filters");
    this.setState({isFiltersOpen:!this.state.isFiltersOpen});
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

    console.log(tempest,json);
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

    var isFiltersOpen = 'hidden';

    if (self.state.isFiltersOpen){
      isFiltersOpen='';
    }

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

          <button className="ui tiny compact basic button"  onClick={this.toggleFiltersOpen}>
            <i className="dropdown icon"></i>
            Filters
          </button>

          <div className={isFiltersOpen}>
            sort by
          </div>

          <div className="ui divider"></div>

          <TempestList
            data={filtered}
            prefixRatings={this.state.prefixRatings}
            suffixRatings={this.state.suffixRatings}
          />
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
