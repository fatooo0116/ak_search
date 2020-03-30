import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import  axios from 'axios';

import SearchBoxContainer from './components/SearchBoxContainer';

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



  callSearchApi(e){ }  

  



  
    render() {
        return (
          <div className="search_home">
              <SearchBoxContainer />

          </div>
        );
    }
}

export default ReactHome;
