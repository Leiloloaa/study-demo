import React from 'react';
import { Route , Link } from 'react-router-dom'
import  Angular from './videos/Angular'
import  ReactJs from './videos/ReactJs'
import  Vue from './videos/Vue'

function Video(){
  return (
    <div>
        <div className="topNav">
            <ul>
                <li><Link to="/videos/angular">Angular教程</Link></li>
                <li><Link to="/videos/vue">Vue教程</Link></li>
                <li><Link to="/videos/reactJs">React教程</Link></li>
            </ul>
        </div>
        <div className="videoContent">
            <div><h3>视频内容</h3></div>
            <Route path="/videos/angular/"   component={Angular} />
            <Route path="/videos/vue/"   component={Vue} />
            <Route path="/videos/reactJs/"   component={ReactJs} />
        </div>
    </div>
  )
}

export default  Video
