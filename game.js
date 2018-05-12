function Start() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create a Matter.js engine
    var engine = Engine.create();
    world = engine.world;
    var render = Render.create({
        element: document.getElementById('game'),
        engine: engine,
        options: {
            width: 800,
            height: 600,
            showAngleIndicator: false
        }
    });

    Render.run(render);

    // create runner
    //var runner = Runner.create();
    //Runner.run(runner, engine);

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    // add all of the bodies to the world
    World.add(engine.world, [boxA, boxB, ground]);

    var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: true
            }
        }
    });
    render.mouse = mouse;
    World.add(world, mouseConstraint);

    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // run the engine
    Engine.run(engine);
}