// import redux, react
import React from 'react';
import { Link } from 'react-router';
import Helmet from "react-helmet";
import {StepsFlatButton} from '../material-style';


// -=-=-=-=-=-= COMPONENT =-=-=-=-=-=-

export default ()=>{
  let pageNotFound = window.location.href;
  let response= ["This is embarrassing, isnt it?", "Oh boy, this is awkward.", "Something must have broke :(", " Oh Snap! We couldn't find the page", " Looks like you made a wrong turn.\n Dont worry! it happens to the best of us!"];

  let index = Math.floor(Math.random() * (response.length - 1) + 1);

  let count = 0;

  let onclickHandler =()=> {

    if (count < 30){
      let turtle = document.createElement("img");
      turtle.setAttribute('src', require("../../../src/images/404/turtle.png"));
      turtle.setAttribute('class','turtle');

      let parent = document.getElementById("tank");
      parent.appendChild(turtle);
      count++;
    }

  };

  return(
  <div className="not-found">
    <Helmet title="404 NOT FOUND"/>
    <title>404 NOT FOUND </title>
    <div className="header">
      <img className="img-responsive" id="404" src={require('../../../src/images/404/404.png')}/>
    </div>

      <h3> {response[index]}</h3>
      <p>{pageNotFound} was not available.</p>


      <h2>{"Let's get back on track!"}</h2>
    <div className="buttons">
        <Link to="/">
          <StepsFlatButton label="Home" />
        </Link>
          <StepsFlatButton label=" A Turtle" onTouchTap={onclickHandler}/>

    </div>

    <div className="bottom">
    {   /*  <div className='logo'>
   <svg  width="10em" height="10em" viewBox="0 0 204 137">
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none">
          <g id="Group" transform="translate(0.000000, -0.362180)" fill="#FFFFFF">
          <path d="M0,108.36218 L204,108.36218 L204,137.36218 L0,137.36218 L0,108.36218 Z M2,110.36218 L202,110.36218 L202,135.36218 L2,135.36218 L2,110.36218 Z" id="Shape"></path>
          <path d="M50,54.36218 L204,54.36218 L204,83.36218 L50,83.36218 L50,54.36218 Z M52,56.36218 L202,56.36218 L202,81.36218 L52,81.36218 L52,56.36218 Z" id="Shape"></path>
          <path d="M100,0.36218 L204,0.36218 L204,29.36218 L100,29.36218 L100,0.36218 Z M102,2.36218 L202,2.36218 L202,27.36218 L102,27.36218 L102,2.36218 Z" id="Shape"></path>
          </g>
        </g>
      </svg>
      </div>*/}
      <div className="tank" id="tank" />

    </div>

  </div>
  );
};
