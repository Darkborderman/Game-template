let Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Composite = Matter.Composite,
Composites = Matter.Composites,
Common = Matter.Common,
MouseConstraint = Matter.MouseConstraint,
Mouse = Matter.Mouse,
World = Matter.World,
Events = Matter.Events,
Bodies = Matter.Bodies;

// create a Matter.js engine
let engine = Engine.create();
world = engine.world;

//create world render
let render=null;

// run the engine
Engine.run(engine);

function Start() {
    if(render!=null) return;

    render = Render.create({
        element: document.getElementById('game'),
        engine: engine,
        options: {
            width: 800,
            height: 600,
            showAngleIndicator: false, //show each item's angle
            wireframes: false // this will set item can fill color or not,important
        }
    });
    Render.run(render);

    Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
    });

    //Add frame to world
    let frame={
    up:Bodies.rectangle(400, 0, 810, 60, { isStatic: true }),
    down:Bodies.rectangle(400, 610, 810, 60, { isStatic: true }),
    left:Bodies.rectangle(0,300,60,610,{isStatic:true}),
    right:Bodies.rectangle(800, 300, 60, 610, { isStatic: true }),
    }

    for(frameData in frame) World.add(world,frame[frameData]);

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80,{
    render: {
        strokeStyle: 'blue',
        fillStyle: 'transparent',
        lineWidth: 1,
    },
    });
    var boxB = Bodies.rectangle(450, 50, 80, 80,{
        render: {
            strokeStyle: 'yellow',
            fillStyle: 'transparent',
            lineWidth: 1,
        },
        label:'main',
    });

    // add rest of the bodies to the world
    World.add(world, [boxA, boxB]);

    //Add mouse controller
    let mouse = Mouse.create(render.canvas);
    let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 1,
        render: {
            visible: true
        }
    }
    });
    render.mouse = mouse;
    World.add(world, mouseConstraint);


    var collider = Bodies.rectangle(400, 300, 500, 50, {
    isSensor: true,
    isStatic: true,
    render: {
        strokeStyle: 'red',
        fillStyle: 'transparent',
        lineWidth: 1
    }
    });

    World.add(world,collider);

    Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs;

    for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

        if (pair.bodyA === collider) {
            pair.bodyA.render.strokeStyle = 'white';
        } else if (pair.bodyB === collider) {
            pair.bodyB.render.strokeStyle = 'white';
        }
    }
    });

    Events.on(mouseConstraint, "startdrag", function(event){
        if(event.body.label=="main"){
            event.body.isStatic=true;
        }
    });
    Events.on(mouseConstraint, "enddrag", function(event){
        console.log(event);
        if(event.body.label=="main"){
            event.body.isStatic=false;
        }
    });
}

function Stop(){
    if(render==null) return;
    Matter.Render.stop(render);
    render.canvas.remove();
    render.canvas = null;
    render.context = null;
    render.textures = {};
    render=null;

Matter.World.clear(engine.world);
Matter.Engine.clear(engine);
}