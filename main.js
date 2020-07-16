const diameter = 80;
const fontSize = 45;
const Vertexs = [];
let mouseIsDragged = false;
let currentVertex = null;

let buttonAddVertex;
let buttonAddEdge;
let buttonShowHideId;
let buttonSelectVertexA;
let buttonSelectVertexB;
let selectedVertexA = null;
let selectedVertexB = null;
let selectingVertexA = false;
let selectingVertexB = false;
let weightInput;
let buttonSave;
let buttonImport;
let inputTextArea;
const graph = new Graph(diameter, fontSize);

function setup() {
	width = windowWidth - 30;
	height = windowHeight - 30;
	createCanvas(width, height);

	buttonAddVertex = createButton('Thêm Vertex');
	buttonAddVertex.position(15, 20);
	buttonAddVertex.mousePressed(addVertex);

	buttonShowHideId = createButton('Show Hide Id');
	buttonShowHideId.position(15, 50);
	buttonShowHideId.mousePressed(showHideId);

	buttonSelectVertexA = createButton('Chọn Vertex 1: ?');
	buttonSelectVertexA.id('buttonSelectVertexA');
	buttonSelectVertexA.position(15, 80);
	buttonSelectVertexA.mousePressed(selectVertexA);

	weightInput = createInput('100');
	weightInput.size(70);
	weightInput.position(15, 110);

	buttonSelectVertexB = createButton('Chọn Vertex 2: ?');
	buttonSelectVertexB.id('buttonSelectVertexB');
	buttonSelectVertexB.position(15, 140);
	buttonSelectVertexB.mousePressed(selectVertexB);

	buttonAddEdge = createButton('Thêm Edge');
	buttonAddEdge.position(15, 170);
	buttonAddEdge.mousePressed(addEdge);

	buttonSave = createButton('Save Image');
	buttonSave.position(15, 220);
	buttonSave.mousePressed(saveImage);

	buttonImport = createButton('Import Graph');
	buttonImport.position(110, 220);
	buttonImport.mousePressed(importGraph);

	inputTextArea = createElement('TextArea');
	inputTextArea.id('inputTextArea');
	inputTextArea.position(15, 250); 
	inputTextArea.size(100, 200);
	document.getElementById('inputTextArea').innerText =
		'[{"id":0,"name":"A","x":221,"y":761,"edges":[{"vertexBId":1,"weight":3},{"vertexBId":5,"weight":9},{"vertexBId":3,"weight":6}]},{"id":1,"name":"B","x":399,"y":651,"edges":[{"vertexBId":0,"weight":3},{"vertexBId":2,"weight":2},{"vertexBId":4,"weight":9},{"vertexBId":5,"weight":9},{"vertexBId":3,"weight":4}]},{"id":2,"name":"C","x":488,"y":465,"edges":[{"vertexBId":1,"weight":2},{"vertexBId":3,"weight":2},{"vertexBId":6,"weight":9},{"vertexBId":4,"weight":8}]},{"id":3,"name":"D","x":416,"y":304,"edges":[{"vertexBId":0,"weight":6},{"vertexBId":1,"weight":4},{"vertexBId":2,"weight":2},{"vertexBId":6,"weight":9}]},{"id":4,"name":"E","x":885,"y":620,"edges":[{"vertexBId":1,"weight":9},{"vertexBId":2,"weight":8},{"vertexBId":5,"weight":8},{"vertexBId":6,"weight":7},{"vertexBId":8,"weight":9},{"vertexBId":9,"weight":10}]},{"id":5,"name":"F","x":768,"y":1005,"edges":[{"vertexBId":0,"weight":9},{"vertexBId":1,"weight":9},{"vertexBId":4,"weight":8},{"vertexBId":9,"weight":18}]},{"id":6,"name":"G","x":881,"y":166,"edges":[{"vertexBId":2,"weight":9},{"vertexBId":3,"weight":9},{"vertexBId":4,"weight":7},{"vertexBId":7,"weight":4},{"vertexBId":8,"weight":5}]},{"id":7,"name":"H","x":1142,"y":108,"edges":[{"vertexBId":6,"weight":4},{"vertexBId":8,"weight":1},{"vertexBId":9,"weight":4}]},{"id":8,"name":"I","x":1263,"y":234,"edges":[{"vertexBId":4,"weight":9},{"vertexBId":6,"weight":5},{"vertexBId":7,"weight":1},{"vertexBId":9,"weight":3}]},{"id":9,"name":"J","x":1520,"y":243,"edges":[{"vertexBId":4,"weight":10},{"vertexBId":5,"weight":18},{"vertexBId":7,"weight":4},{"vertexBId":8,"weight":3}]}]';
}
}

function draw() {
	background(255);
	graph.draw();
	noLoop();
}

function addVertex() {
	graph.addVertex();
	loop();
}

function addEdge() {
	if (
		selectedVertexA &&
		selectedVertexB &&
		selectedVertexA.id !== selectedVertexB.id &&
		+weightInput.value() >= 0
	) {
		graph.connect(
			selectedVertexA.id,
			selectedVertexB.id,
			+weightInput.value()
		);
		selectingVertexA = false;
		selectingVertexB = false;
		document.getElementById('buttonSelectVertexA').style.background =
			'white';
		document.getElementById('buttonSelectVertexB').style.background =
			'white';
		document.getElementById('buttonSelectVertexA').innerText =
			'Click Vertex 1';
		document.getElementById('buttonSelectVertexB').innerText =
			'Click Vertex2';
		loop();
	}
}

function selectVertexA() {
	selectingVertexA = true;
	document.getElementById('buttonSelectVertexA').style.background = 'yellow';
	document.getElementById('buttonSelectVertexA').innerText =
		'Click 1 vertex để chọn';
	selectingVertexB = false;
	document.getElementById('buttonSelectVertexB').style.background = 'white';
}

function selectVertexB() {
	selectingVertexA = false;
	document.getElementById('buttonSelectVertexA').style.background = 'white';
	selectingVertexB = true;
	document.getElementById('buttonSelectVertexB').style.background = 'yellow';
	document.getElementById('buttonSelectVertexB').innerText =
		'Click 1 vertex để chọn';
}

function showHideId() {
	Vertex.showHideId();
	loop();
}

function importGraph() {
	const data = inputTextArea.value();
	if (data) {
		const obj = JSON.parse(data);
		graph.reset();
		obj.forEach((vertex) => {
			graph.importVertex(
				new Vertex(vertex.x, vertex.y, diameter, fontSize)
			);
		});
		obj.forEach((vertex) => {
			for (let edge of vertex.edges) {
				graph.connect(vertex.id, edge.vertexBId, edge.weight);
			}
		});
		loop();
	}
}

function saveImage() {
	inputTextArea.value(graph.export());
	saveCanvas('MyGraph', 'png');
	console.log('save', inputTextArea.value());
	saveStrings(inputTextArea.value().split('\n'), 'MyGraph.txt');
}

function findSelectVertex() {
	currentVertex = graph.findSelectedVertex();
	loop();
}

function mousePressed() {
	mouseIsDragged = false;
	findSelectVertex();
}

function mouseClicked() {
	mouseIsDragged = false;
	findSelectVertex();
	if (currentVertex) {
		if (selectingVertexA) {
			selectedVertexA = currentVertex;
			document.getElementById('buttonSelectVertexA').innerText =
				'Chọn Vertex 1 => ' + selectedVertexA.name;
			document.getElementById('buttonSelectVertexA').style.background =
				'white';
		} else if (selectingVertexB) {
			selectedVertexB = currentVertex;
			document.getElementById('buttonSelectVertexB').innerText =
				'Chọn Vertex 2 => ' + selectedVertexB.name;
			document.getElementById('buttonSelectVertexB').style.background =
				'white';
		}
	}
}

function mouseDragged() {
	mouseIsDragged = true;
	if (currentVertex) {
		currentVertex.x = mouseX;
		currentVertex.y = mouseY;
		loop();
	}
	return false;
}

function mouseReleased() {
	if (mouseIsDragged && currentVertex) {
		currentVertex.x = mouseX;
		currentVertex.y = mouseY;
		currentVertex = null;
		loop();
	}
	mouseIsDragged = false;
	return false;
}
