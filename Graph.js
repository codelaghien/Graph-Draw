class Graph {
	constructor(diameter, fontSize) {
		this.diameter = diameter;
		this.fontSize = fontSize;
		this.vertices = [];
	}
 
	draw() {
		for (let vertex of this.vertices) {
			vertex.draw();
		}
	}

	addVertex() {
		let vertex = new Vertex(0, 0, this.diameter, this.fontSize);
		if (this.vertices.length === 0) {
			vertex.x = 300;
			vertex.y = 100;
		} else {
			const lastVertex = this.vertices[this.vertices.length - 1];
			vertex.x = lastVertex.x + lastVertex.diameter * 1.5;
			vertex.y = lastVertex.y;
		}
		this.vertices.push(vertex);
	}

	importVertex(vertex) {
		this.vertices.push(vertex);
	}

	connect(aIndex, bIndex, weight) {
		const vertexA = this.findVertex(aIndex);
		const vertexB = this.findVertex(bIndex);
		if (vertexA && vertexB && vertexA.id !== vertexB.id) {
			vertexA.add(vertexB, weight, 'black');
			vertexB.add(vertexA, weight, 'black');
		}
	}

	showAdjacency(id) {
		const vertex = this.findVertex(id);
		if (vertex) {
			vertex.showAdjacency();
		}
	}

	findVertex(id) {
		for (let vertex of this.vertices) {
			if (vertex.id === id) {
				return vertex;
			}
		}
		return null;
	}

	findSelectedVertex() {
		let v = null;
		for (let vertex of this.vertices) {
			if (dist(vertex.x, vertex.y, mouseX, mouseY) < diameter / 2) {
				v = vertex;
			}
			vertex.resetColor();
		}
		if (v) {
			v.showAdjacency();
		}
		return v;
	}

	export() {
		let outputArray = [];
		for (let vertex of this.vertices) {
			outputArray.push(vertex.export());
		}
		return JSON.stringify(outputArray);
	}

	reset() {
		this.vertices = [];
		Vertex.setId(0);
	}
}
