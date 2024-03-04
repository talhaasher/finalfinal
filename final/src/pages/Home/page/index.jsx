import Header from '../../genrelComps/Header';
import Section1 from '../comp/Home1';
import Section2 from '../comp/Home2';
import classes from './index.module.css';

import React from 'react'

function MainPage() {
  return (
    <>
   <Header id="header"/>
    <div className={classes.contain}>

      <section ><Section1/></section>
      <section>
      <Section2/>
      </section>
    </div>
    </>
  )
}

export default MainPage
