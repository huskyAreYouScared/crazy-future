import React,{useEffect, useRef} from 'react';
import Proton from 'proton-engine'
import RAF from 'raf-manager'
function App() {
  const proton = new Proton()
  const emitter = new Proton.Emitter()
  let canvasEL = useRef('')
  useEffect(()=>{
    canvasEL.current.width = window.innerWidth
    canvasEL.current.height = window.innerHeight
    particleAnimation()
  })
  function particleAnimation(){
    //set Rate
    emitter.rate = new Proton.Rate(Proton.getSpan(1, 20), 0.1)

    //add Initialize
    emitter.addInitialize(new Proton.Radius(0.01, 5))
    emitter.addInitialize(new Proton.Life(30))
    emitter.addInitialize(new Proton.Velocity(new Proton.Span(0.3, 0.6),
    new Proton.Span(0, 360), 'polar'))
    emitter.addInitialize(new Proton.Mass(1));

    //add Behaviour
    emitter.addBehaviour(new Proton.Color('random','0000ff', 'random'))
    emitter.addBehaviour(new Proton.Alpha(1, 0))

    //set emitter position
    emitter.p.x = canvasEL.current.width / 2;
    emitter.p.y = 0;
    emitter.emit('once')

    //add emitter to the proton
    proton.addEmitter(emitter)
    
    // add canvas renderer
    const renderer = new Proton.CanvasRenderer(canvasEL.current)
    proton.addRenderer(renderer)
    RAF.add(()=>{
      proton.update()
    },1000)
    
}

  const particle = (event) => {
    emitter.p.x = event.clientX
    emitter.p.y = event.clientY
    emitter.emit('once')
    event.persist()
      

  }
  return (
    <div className="container">
      <canvas ref={canvasEL} onClick={particle} className="main-bg"></canvas>
    </div>
  );
}

export default App;
