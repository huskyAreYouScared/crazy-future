import React,{useState} from 'react'

function Main() {
  let [isShow,setShow] = useState(false)
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
        className={isShow ? 'menu-ctrl-basic menu-ctrl-hidden iconfont icon-gougou':
                             'menu-ctrl-basic menu-ctrl-show iconfont icon-gougou'}
        onClick={ctrlShow}
        ></span>
      <div 
        className={!isShow?'menu-block-hidden':'menu-block-show'}
        onMouseDown={boxDownEvent}
        onMouseUp={boxUpEvent}>
        <div className='menu-block-box' >   
          <div className="menu-item-box" onMouseEnter={MouseEnter.bind(this)}>
            <div className="menu-item bg1"> </div>
          </div>
          <div className="menu-item-box" onMouseEnter={MouseEnter.bind(this)}>
            <div className="menu-item bg2"> </div>
          </div>
          <div className="menu-item-box" onMouseEnter={MouseEnter.bind(this)}>
            <div className="menu-item bg2"> </div>
          </div>
          <div className="menu-item-box" onMouseEnter={MouseEnter.bind(this)}>
            <div className="menu-item bg1"> </div>
          </div>
          <div className="menu-item-box" onMouseEnter={MouseEnter.bind(this)}>
            <div className="menu-item bg2"> </div>
          </div>
          <div className="menu-item-box" onMouseEnter={MouseEnter.bind(this)}>
            <div className="menu-item bg2"> </div>
          </div>
          <div className="menu-item-box" onMouseEnter={MouseEnter.bind(this)}>
            <div className="menu-item bg2"> </div>
          </div>
          <div className="menu-item-box" onMouseEnter={MouseEnter.bind(this)}>
            <div className="menu-item bg1"> </div>
          </div>
          <div className="menu-item-box" onMouseEnter={MouseEnter.bind(this)}>
            <div className="menu-item bg1"> </div>
          </div>
          <div className="menu-item-box" onMouseEnter={MouseEnter.bind(this)}>
            <div className="menu-item bg2"> </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main