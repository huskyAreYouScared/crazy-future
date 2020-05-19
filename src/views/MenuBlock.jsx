import React,{useState} from 'react'

function Main() {
  let [isShow,setShow] = useState(true)
  function MouseEnter () {
    // alert(1)
  }
  let lastX=0
  let boxDownEvent = (event)=>{
    lastX = event.clientX
    event.persist()
  }
  let boxUpEvent = (event)=>{
    if(Math.abs(event.clientX - lastX) > 200){
      setShow(false)
    }
    event.persist()
  }
  let ctrlShow = () => {
    setShow(true)
  }
  return (
    <>
      <span 
        style={{display:!isShow?'inline-block':'none'}}
        className="iconfont icon-gougou menu-ctrl-show"
        onClick={ctrlShow}
        ></span>
      <div 
        className={!isShow?'menu-block-hidden':'menu-block-show'}
        onMouseDown={boxDownEvent}
        onMouseUp={boxUpEvent}>
        <div className='menu-block-box' >   
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
      </div>
    </>
  )
}

export default Main