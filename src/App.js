import React, { useEffect, useRef } from 'react';
import Proton from 'proton-engine'
import RAF from 'raf-manager'
import MenuBlock from '@/views/MenuBlock.jsx'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Rasingen from './views/rasingen/rasingen'
function App() {
  const proton = new Proton()
  const emitter = new Proton.Emitter()
  let canvasEL = useRef(null)
  let context = null
  useEffect(() => {
    canvasEL.current.width = window.innerWidth
    canvasEL.current.height = window.innerHeight
    canvasEL.current.color = 'rgba(0, 0, 0, 0.075)'
    context = canvasEL.current.getContext('2d')
    window.onresize = function (e) {
      canvasEL.current.width = window.innerWidth;
      canvasEL.current.height = window.innerHeight;
      emitter.p.x = canvasEL.current.width / 2;
      emitter.p.y = canvasEL.current.height / 2;
    };
    particleAnimation()
  })
  function particleAnimation() {
    //set Rate
    emitter.rate = new Proton.Rate(Proton.getSpan(20, 40))
    //add Initialize
    emitter.addInitialize(new Proton.Radius(0.5, 3))
    emitter.addInitialize(new Proton.Life(2.5))
    emitter.addInitialize(new Proton.Mass(1))
    emitter.addInitialize(new Proton.Velocity(new Proton.Span(1, 2),
      new Proton.Span(0, 360), 'polar'))
    let forceBehaviour = new Proton.Force(0, 0);
    emitter.addBehaviour(forceBehaviour, new Proton.Gravity(.9))
    emitter.addBehaviour(new Proton.Color('random', 'random', '#cccccc55', Infinity, Proton.easeOutQuart))
    emitter.addBehaviour(new Proton.Alpha(1, 0, Infinity, Proton.easeOutQuart))
    emitter.addBehaviour(new Proton.Scale(5, 0, Infinity, Proton.easeOutQuart))
    //set emitter position
    emitter.p.x = canvasEL.current.width / 2;
    emitter.p.y = canvasEL.current.height / 2;
    emitter.emit('once')
    //add emitter to the proton
    proton.addEmitter(emitter)
    // add canvas renderer
    const renderer = new Proton.CanvasRenderer(canvasEL.current)
    renderer.onProtonUpdate = () => {
      context.fillStyle = "rgba(0, 0, 0, 0.1)";
      context.fillRect(0, 0, canvasEL.current.width, canvasEL.current.height);  
    }
   
    proton.addRenderer(renderer)
    RAF.add(() => {
      proton.update()
    }, 1000)
  }

  const particle = (event) => {
    emitter.p.x = event.clientX
    emitter.p.y = event.clientY
    emitter.emit('once')
    event.persist()
  }
  return (
    <Router>
      <div className="container">
        <MenuBlock></MenuBlock>
        <canvas ref={canvasEL} onClick={particle} className="main-bg"></canvas>
        <ul className="menu-bar-box">
          <li><Link to="/rasingen"><i className="menu-bar-item iconfont icon-husky"></i></Link></li>
        </ul>
      </div>
      <Route path="/rasingen" component={Rasingen}/>
    </Router>
  );
}

export default App;
