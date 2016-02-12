# 2d-neighbor-finder
Tool to find a neighbor (same digit) cells block in a matrix

# Usage

//Generate the source matrix
var sampleArray = NeighborFinder.generateRandomMatrix(10, 10);
console.log(NeighborFinder.printMatrix(sampleArray));

//Result
var block = NeighborFinder.getNeighborsInMatrix(sampleArray, 5, 5);
console.log("result:", block.join("\n"));

//OR
var nf = new NeighborFinder(sampleArray);
var block = nf.getNeighbors(2, 2);
var anotherBlock = nf.getNeighbors(8, 8);
//# sourceMappingURL=app.js.map
