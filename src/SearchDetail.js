import React from 'react';

import TopMenu from './components/TopMenu';


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


import './scss/search_detail.scss';



class  SearchDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      option:'female'
    }
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e){
    this.setState({
      option:e.target.value
    });
  }



  render(){
    return (
      <div className="search_app">
          <TopMenu />
  
  
          { /*  main data / left filter / right List */}
          <div className="search_detail">
  
            <div className="toolbar">
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" value={this.state.option} onChange={this.handleChange}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
                <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
              </RadioGroup>
            </FormControl>
            </div>
  
            <div className="main_article">            
              aaaa
            </div> { /*  inner  */  }
          </div>
      </div>
    );
  }

}

export default SearchDetail;
