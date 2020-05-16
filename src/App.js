import React,{useEffect, useRef} from 'react';
import Proton from 'proton-engine'
import RAF from 'raf-manager'
function App() {
  const proton = new Proton()
  const emitter = new Proton.Emitter()
  let canvasEL = useRef('')
  let context = null
  useEffect(()=>{
    canvasEL.current.width = window.innerWidth
    canvasEL.current.height = window.innerHeight
    context = canvasEL.current.getContext('2d')
    window.onresize = function(e) {
      canvasEL.current.width = window.innerWidth;
      canvasEL.current.height = window.innerHeight;
      emitter.p.x = canvasEL.current.width / 2;
      emitter.p.y = canvasEL.current.height / 2;
    };
    particleAnimation()
  })
  function particleAnimation(){
    //set Rate
    emitter.rate = new Proton.Rate(Proton.getSpan(30, 100), 0.1)

    //add Initialize
    emitter.addInitialize(new Proton.Radius(0.01, 10))
    emitter.addInitialize(new Proton.Life(10))
    // emitter.addInitialize(new Proton.Velocity(new Proton.Span(0.3, 5),
    // new Proton.Span(0, 360), 'polar'))
    emitter.addInitialize(new Proton.Velocity(new Proton.Span(1, 3),
    new Proton.Span(360, 10), 'polar'))
    emitter.addInitialize(new Proton.Mass(110));
    // emitter.addBehaviour(new Proton.RandomDrift(30, 10, 0.05))

    //add Behaviour
    emitter.addBehaviour(new Proton.Color('random','#cccccc55', Infinity, Proton.easeOutQuart))
    emitter.addBehaviour(new Proton.Alpha(1, 0))
    emitter.addBehaviour(new Proton.Collision(emitter));

    //set emitter position
    emitter.p.x = canvasEL.current.width / 2;
    emitter.p.y = 0;
    emitter.emit('once')
    //add emitter to the proton
    proton.addEmitter(emitter)

    
    // add canvas renderer
    const renderer = new Proton.CanvasRenderer(canvasEL.current)
    renderer.onProtonUpdate = () => {
      context.fillStyle = "rgba(0, 0, 0, 0.1)";
      context.fillRect(0, 0, canvasEL.current.width, canvasEL.current.height);
    };
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
