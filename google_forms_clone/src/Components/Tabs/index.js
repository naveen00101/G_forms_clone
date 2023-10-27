import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import './index.css'

import QuestionFrom from "../QuestionFrom";

function CenteredTabs(){
    const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    
    return(
        <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext className="main-tab-con" value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="primary" indicatecolor="primary" centered className="tabs">
            
          <Tab label="Questions" className="tab" value="1"/>
                <Tab label="responses" className="tab" value="2" />
          </TabList>
        </Box>
        <TabPanel className='panel' value="1"><QuestionFrom value="1"/>
        </TabPanel>
        <TabPanel value="2"><h2 value="2">Hello this is response page</h2></TabPanel>
        
      </TabContext>
    </Box>
    )
}

export default CenteredTabs