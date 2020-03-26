import React from 'react';
import TextField from '@material-ui/core/TextField';
import  axios from 'axios';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';


class SearchBox extends React.Component {

    render(){
        return(
      
              <form method="post"  className="main_search">
                <div className="search_box">    
                    <TextField id="outlined-basic"   className="main_search_input" label="" variant="outlined" />
                    <FormControl >
                        <Select >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                        </Select>                    
                    </FormControl>
                    <button type="submit" > <img src="/search.svg"/> </button>
                </div>
              </form>

        )
    }
}


export default SearchBox;