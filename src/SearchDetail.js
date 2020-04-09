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




  componentDidMount(){    
    this.props.initPageData(this.props.pid);
  }




  render(){
    
    const source = this.props.pageData;
    console.log(source);
   


    const maker_type = (source)?
                  <div className="">{source.data_type}</div>
                  :
                  '';

    let labels = [];                  
    if(source){
        source.labels.forEach(function(item){
        labels.push(<li><a href="#">{item.label}</a></li>);
      });
    }

    let rela_element = [];                  
    if(source){
        source.related_element.forEach(function(item){
          rela_element.push(<li>{item}</li>);
      });
    }


    const fact = (source)?
                  <div className="">{source.paragraphs.fact.text.substring(0,100)}</div>
                  :
                  '';
    const reason = (source)?
                  <div className="">{source.paragraphs.reason.text.substring(0,100)}</div>
                  :
                  '';                  



    let rela_law = [];                  
    if(source){
        source.related_law.forEach(function(item){
          rela_law.push(<li>{item}</li>);
      });
    }
    
    let rela_doc = [];                  
    if(this.props.initData){
        this.props.initData.related_doc.hits.hits.forEach(function(item){
          rela_doc.push(<li><a href={'/detail/'+item._id}>{item._source.title}</a></li>);
      });
    }
    

    
    return (
      <div className="search_app">
          <TopMenu />
  
  
          { /*  main data / left filter / right List */}
          <div className="search_detail">
  
            <div className="toolbar">

              <div className="maker_item">
                <label>標記方式</label>
                {maker_type }
              </div>

              <div className="maker_item">
                <label>要件標示</label>
                <ul>
                  {labels}
                </ul>
                <br/><br/>
                <ol>
                {
                  rela_element
                }
                </ol>
              </div>

              <div className="maker_item">
                <label>事實 / 理由段標示</label>
                {fact }
                <br/>
                {reason }
              </div>


              <div className="maker_item">
                <label>相關法條</label>
                <ol>
                  {rela_law}
                </ol>
              </div>              

              <div className="maker_item">
                <label>相似判決書連結</label>
                <ul>
                  {rela_doc}
                </ul>
              </div> 

              <br/>
              <br/>
              <br/>
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
                  <h3 className="title">{(source)? source.title : ''}</h3>
                  <div className="date">{(source)? source.time : ''}</div>
                  <div className="reason">
                    {(source)? source.judge_reason : ''}
                  </div>
                  <div className="main_text">
                    {(source)? source.text : ''}
                  </div>
            </div> { /*  inner  */  }
          </div>
      </div>
    );
  }

}

export default SearchDetail;
