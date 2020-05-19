import React,{} from 'react'

function Main() {

  function MouseEnter () {
    alert(1)
  }
  return (
    <div className="menu-block-box">  
      <div className="menu-item bg1" onMouseEnter={MouseEnter.bind(this)}></div>
      <div className="menu-item bg2"></div>
      <div className="menu-item bg1"></div>
      <div className="menu-item bg1"></div>
      <div className="menu-item bg2"></div>
      <div className="menu-item bg2"></div>
      <div className="menu-item bg2"></div>
      <div className="menu-item bg1"></div>
      <div className="menu-item bg1"></div>
      <div className="menu-item bg2"></div>
    </div>
  )
}

export default Main