import React from "react";

import Header from '../Headers/Header'

import Template from '../Template';
import Mainbody from '../Mainbody';

function Home(){
    return(
        <div>
          <Header/>
          <Template />
          <Mainbody />
        </div>
    )
}

export default Home