/**
* @author Konstantin Kirillov
* @version 0.1
* Tool to find a neighbor (same digit) cells block in a matrix
*/
var NeighborFinder = (function () {
    /**
    * @constructor
    * @param [matrix] array of number[y][x] to analyze
    */
    function NeighborFinder(matrix) {
        this.matrix = [];
        this.found = [];
        this.foundIndex = {};
        if (matrix)
            this.matrix = matrix;
    }
    /**
    * Generates a random digit matrix
    * @param w matrix width
    * @param h matrix height
    * @return generated matrix (h lines, w columns)
    */
    NeighborFinder.generateRandomMatrix = function (w, h) {
        var res = [];
        for (var i = 0; i < h; i++) {
            res[i] = [];
            for (var j = 0; j < w; j++) {
                res[i][j] = Math.floor(Math.random() * 10);
            }
        }
        return res;
    };

    /*
    * matrix setter
    */
    NeighborFinder.prototype.setMatrix = function (matrix) {
        this.matrix = matrix;
    };

    /*
    * matrix getter
    */
    NeighborFinder.prototype.getMatrix = function () {
        return this.matrix;
    };

    /*
    * Formats matrix nicely
    * @param matrix matrix to format
    */
    NeighborFinder.printMatrix = function (matrix) {
        if (matrix.length < 1)
            return "";
        var res = [];
        var top = [];
        top[0] = " ";
        for (var i = 0; i < matrix[0].length; i++) {
            top[i + 1] = i;
        }
        res.push(top.join("| "));
        for (var i = 0; i < matrix.length; i++) {
            res.push(i + "| " + matrix[i].join("  "));
        }
        return res.join("\n");
    };

    /**
    * Returns a block of heighbors with same digit as in [x,y]
    * @param matrix array of number[y][x] to analyze
    * @param x column of start element
    * @param y row of start element
    * @return array of elements' coordinates of block [[x,y],...]
    */
    NeighborFinder.getNeighborsInMatrix = function (matrix, x, y) {
        var nf = new NeighborFinder(matrix);
        return nf.getNeighbors(x, y);
    };

    NeighborFinder.prototype.propagate = function (x, y) {
        if (this.addRes(x, y)) {
            this.propagate(x - 1, y);
            this.propagate(x + 1, y);
            this.propagate(x, y - 1);
            this.propagate(x, y + 1);
        }
    };

    NeighborFinder.prototype.addRes = function (x, y) {
        if (x < 0 || y < 0)
            return false;
        if (y >= this.matrix.length)
            return false;
        if (x >= this.matrix[y].length)
            return false;
        if (this.matrix[y][x] != this.digit)
            return false;
        if (!this.foundIndex[y])
            this.foundIndex[y] = {};
        var row = this.foundIndex[y];
        if (row[x])
            return false;

        //Adding
        row[x] = true;
        this.found.push([x, y]);
        return true;
    };

    /**
    * Returns a block of heighbors with same digit as in [x,y]
    * @param x column of start element
    * @param y row of start element
    * @return array of elements' coordinates of block [[x,y],...]
    */
    NeighborFinder.prototype.getNeighbors = function (x, y) {
        if (x < 0 || y < 0)
            return [];
        if (y >= this.matrix.length)
            return [];
        if (x >= this.matrix[y].length)
            return [];
        this.digit = this.matrix[y][x];
        this.found = [];
        this.foundIndex = {};
        this.propagate(x, y);

        //TODO: make sorting optional
        this.found.sort(function (a, b) {
            if (a[1] < b[1])
                return -1;
            if (a[1] > b[1])
                return 1;
            return a[0] - b[0];
        });
        return this.found.slice(0);
    };
    return NeighborFinder;
})();
