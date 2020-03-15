import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';




function ReactHome() {
  return (
    <div className="search_home">

            <form  noValidate autoComplete="off" action="/search" >
                <TextField id="outlined-basic" label="Search" variant="outlined" />
                <Button  type="submit" variant="outlined" color="primary"> Search </Button>
            </form>

    </div>
  );
}

export default ReactHome;
