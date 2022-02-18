import React from 'react';
import { Link ,Route,Router} from 'react-router-dom'
import Money from './workPlace/Money'
import Getup from './workPlace/Getup'

function Workplace (){
  return(
    <div>
      <div className="topNav">
         <ul>
           <li><Link to="/workplace/money">程序员加薪秘籍</Link></li>
           <li><Link to="/workplace/getup">程序员早起攻略</Link></li>
         </ul>
      </div>
      <div className="videoContent">
        <Route path="/workplace/money/" component={Money}></Route>
        <Route path="/workplace/getup/" component={Getup}></Route>
      </div>
    </div>
  )
}

export default  Workplace