import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import  axios from 'axios';

import SearchBox from './SearchBox';

class ReactHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText:''
    }
    this.callSearchApi = this.callSearchApi.bind(this);
    this.onChangeSearchText = this.onChangeSearchText.bind(this);
  }


  onChangeSearchText(e){
    this.setState({
      searchText:e.target.value
    });
  }



  callSearchApi(e){

    let searchText = this.state.searchText;    
    const headers = {
      'Content-Type': 'application/json',     
    }    

    if(searchText !=''){
      axios.post('http://127.0.0.1:3000/api/search',{
        query:'賠償',
        option:"text",
        page:0
      },{
         headers: headers
       }).then(function(res){
        console.log(res);
      }).catch(function (error) {
        console.log(error);
      });
    }

  }



  
    render() {
        return (
          <div className="search_home">
              <SearchBox />

          </div>
        );
    }
}

export default ReactHome;
