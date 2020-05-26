import React, { useEffect, useRef } from 'react';
import Proton from 'proton-engine'
import RAF from 'raf-manager'
function Rasingen() {
  const proton = new Proton()
  const emitter = new Proton.Emitter()
  let rasengenEl = useRef(null)
  let context = null
  useEffect(() => {
    rasengenEl.current.width = window.innerWidth
    rasengenEl.current.height = window.innerHeight
    rasengenEl.current.color = 'rgba(0, 0, 0, 0.075)'
    context = rasengenEl.current.getContext('2d')
    window.onresize = function (e) {
      rasengenEl.current.width = window.innerWidth;
      rasengenEl.current.height = window.innerHeight;
      emitter.p.x = rasengenEl.current.width / 2;
      emitter.p.y = rasengenEl.current.height / 2;
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
    emitter.addBehaviour(new Proton.Color('#ffffff', '#ffffff', '#cccccc55', Infinity, Proton.easeOutQuart))
    emitter.addBehaviour(new Proton.Alpha(1, 0, Infinity, Proton.easeOutQuart))
    emitter.addBehaviour(new Proton.Scale(5, 0, Infinity, Proton.easeOutQuart))
    //set emitter position
    emitter.p.x = rasengenEl.current.width / 2;
    emitter.p.y = rasengenEl.current.height / 2;
    emitter.emit('once')
    //add emitter to the proton
    proton.addEmitter(emitter)
    // add canvas renderer
    const renderer = new Proton.CanvasRenderer(rasengenEl.current)
    renderer.onProtonUpdate = () => {
      context.fillStyle = "rgba(0, 0, 0, 0.1)";
      context.fillRect(0, 0, rasengenEl.current.width, rasengenEl.current.height);  
    }
   
    proton.addRenderer(renderer)
    RAF.add(() => {
      proton.update()
    }, 1000)
  }

  const particle = (event) => {
    console.log(123);
    
    emitter.p.x = event.clientX
    emitter.p.y = event.clientY
    emitter.emit('once')
    event.persist()
  }
  return (
    <>
      <div className="rasengen-box">
        <canvas onClick={particle} ref={rasengenEl}></canvas>
      </div>
    </>
  )
}

export default Rasingen