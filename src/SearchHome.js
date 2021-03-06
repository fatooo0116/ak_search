import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';




import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';



import { Redirect } from "react-router-dom"

class ReactHome extends React.Component {



  
    render() {

        const searchPath = "/search/"+this.props.input;
        const redirectGo = (this.props.isSearchAction)? <>aaa<Redirect to={searchPath} > test </Redirect></> : "";


        return (
          <div className="search_home">
            <div className="home_nav">
              <img src="/xlogo.png"/>
            </div>

                    <form     className="main_search"  onSubmit={(e)=> {e.preventDefault(); this.props.onHomeSearchSubmit(this.props.input, this.props.selectValue) }} >
                    <h1 className="main">裁判書搜尋系統</h1>
                      <div className="search_box">                              
                          <TextField id="outlined-basic"   value={this.props.input}   onChange={ (e) => this.props.onTextChange(e.target.value) }  className="main_search_input" label="" variant="outlined" />
                          <FormControl >
                              <Select  id="search_slk" value={this.props.selectValue}  onChange={(e) => this.props.onSelectChange(e.target.value) }>
                                <MenuItem  value="text">全文搜索</MenuItem >
                                <MenuItem value="element_text">要件搜索</MenuItem>              
                              </Select>                             
                          </FormControl>          
                          <button type="submit"  >
                            <svg height="32px" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg"  ><defs/><g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1"><g fill="#929292" id="icon-111-search"><path d="M19.4271164,20.4271164 C18.0372495,21.4174803 16.3366522,22 14.5,22 C9.80557939,22 6,18.1944206 6,13.5 C6,8.80557939 9.80557939,5 14.5,5 C19.1944206,5 23,8.80557939 23,13.5 C23,15.8472103 22.0486052,17.9722103 20.5104077,19.5104077 L26.5077736,25.5077736 C26.782828,25.782828 26.7761424,26.2238576 26.5,26.5 C26.2219324,26.7780676 25.7796227,26.7796227 25.5077736,26.5077736 L19.4271164,20.4271164 L19.4271164,20.4271164 Z M14.5,21 C18.6421358,21 22,17.6421358 22,13.5 C22,9.35786417 18.6421358,6 14.5,6 C10.3578642,6 7,9.35786417 7,13.5 C7,17.6421358 10.3578642,21 14.5,21 L14.5,21 Z" id="search"/></g></g>
                            </svg>
                          </button>                
                      </div>     
                    </form>
                    
                    {redirectGo}
          </div>
        );
    }
}

export default ReactHome;
