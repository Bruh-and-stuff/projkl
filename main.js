quick_draw_data_set = ["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant","envelope","eraser","eye","eyeglasses","face","fan","feather","fence","finger","fire hydrant","fireplace","firetruck","fish","flamingo","flashlight","flip flops","floor lamp","flower","flying saucer","foot","fork","frog","frying pan","garden","garden hose","giraffe","goatee","golf club","grapes","grass","guitar","hamburger","hammer","hand","harp","hat","headphones","hedgehog","helicopter","helmet","hexagon","hockey puck","hockey stick","horse","hospital","hot air balloon","hot dog","hot tub","hourglass","house","house plant","hurricane","ice cream","jacket","jail","kangaroo","key","keyboard","knee","knife","ladder","lantern","laptop","leaf","leg","light bulb","lighter","lighthouse","lightning","line","lion","lipstick","lobster","lollipop","mailbox","map","marker","matches","megaphone","mermaid","microphone","microwave","monkey","moon","mosquito","motorbike","mountain","mouse","moustache","mouth","mug","mushroom","nail","necklace","nose","ocean","octagon","octopus","onion","oven","owl","paintbrush","paint can","palm tree","panda","pants","paper clip","parachute","parrot","passport","peanut","pear","peas","pencil","penguin","piano","pickup truck","picture frame","pig","pillow","pineapple","pizza","pliers","police car","pond","pool","popsicle","postcard","potato","power outlet","purse","rabbit","raccoon","radio","rain","rainbow","rake","remote control","rhinoceros","rifle","river","roller coaster","rollerskates","sailboat","sandwich","saw","saxophone","school bus","scissors","scorpion","screwdriver","sea turtle","see-saw","shark","sheep","shoe","shorts","shovel","sink","skateboard","skull","skyscraper","sleeping bag","smiley face","snail","snake","snorkel","snowflake","snowman","soccer ball","sock","speedboat","spider","spoon","spreadsheet","square","squiggle","squirrel","stairs","star","steak","stereo","stethoscope","stitches","stop sign","stove","strawberry","streetlight","string bean","submarine","suitcase","sun","swan","sweater","swingset","sword","syringe","table","teapot","teddy-bear","telephone","television","tennis racquet","tent","Eiffel Tower","Great Wall of China","Mona Lisa","tiger","toaster","toe","toilet","tooth","toothbrush","toothpaste","tornado","tractor","traffic light","train","tree","triangle","trombone","truck","trumpet","tshirt","umbrella","underwear","van","vase","violin","washing machine","watermelon","waterslide","whale","wheel","windmill","wine bottle","wine glass","wristwatch","yoga","zebra","zigzag"]
randNum = Math.floor((Math.random()*quick_draw_data_set.length))
EOA = quick_draw_data_set[randNum]

console.log(EOA)

sketch = "YOU MUST DRAW: a " + EOA
document.getElementById("prompt").innerHTML = sketch

timer = 0
timerCheck = ""
drawing = ""
wantedDrawing = ""
score = 0

fullScore = ""
fullTimer = ""

function preload(){
    classifier = ml5.imageClassifier(quick_draw_data_set)
}
function setup(){
    canva = createCanvas(280, 280)
    canva.center()
    background("white")

    canva.mouseReleased(classifydacanvas)
}
function draw(){
    checkSketch()
    if(drawing == wantedDrawing){
        wantedDrawing = "set"
        score = score+1
        fullScore = "Score: " + score
        document.getElementById("score").innerHTML = fullScore
    }

    strokeWeight(5)
    stroke(0)
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
}

function checkSketch(){
    timer = timer+1
    fullTimer = "Time taken: " + timer
    document.getElementById("timer").innerHTML = fullTimer
    console.log(timer)
    if(timer >= 500){
        timer = 0
        timerCheck = "completed"
    }
    if(timerCheck == "completed" || wantedDrawing == "set"){
        timerCheck = ""
        wantedDrawing = ""
        updateCanvas()
    }
}
function updateCanvas(){
    background("white")
}
function classifydacanvas(){
    classifier.classify(canvas, gotResult)
}
function gotResult(error, results){
    if(error){
        console.error(error)
    }
    console.log(results)

    drawing = results[0].label

    document.getElementById("drawing").innerHTML = "AI Prediction: " + results[0].label
    document.getElementById("confidence").innerHTML = "AI Confidence: " + Math.round(results[0].confidence*100)
}
