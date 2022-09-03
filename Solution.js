
/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {boolean}
 */
var hasPath = function (maze, start, destination) {
    this.EMPTY_SPACES = 0;
    this.WALL = 1;
    this.MOVES = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    this.rows = maze.length;
    this.columns = maze[0].length;

    return breadthFirstSearchForPath(maze, start, destination);
};

/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {boolean}
 */
function breadthFirstSearchForPath(maze, start, destination) {
    const queue = new Queue();//Queue<Point>
    const visited = Array.from(new Array(this.rows), () => new Array(this.columns).fill(false));

    visited[start[0]][start[1]] = true;
    queue.enqueue(new Point(start[0], start[1]));

    while (!queue.isEmpty()) {

        const point = queue.dequeue();
        if (point.row === destination[0] && point.column === destination[1]) {
            return true;
        }

        for (let move of this.MOVES) {
            let nextRow = point.row + move[0];
            let nextColumn = point.column + move[1];
            let path = 0;

            if (!pointIsInMaze(nextRow, nextColumn) || maze[nextRow][nextColumn] !== this.EMPTY_SPACES) {
                continue;
            }

            while (pointIsInMaze(nextRow, nextColumn) && maze[nextRow][nextColumn] === this.EMPTY_SPACES) {
                nextRow += move[0];
                nextColumn += move[1];
                ++path;
            }
            nextRow -= move[0];
            nextColumn -= move[1];

            if (!visited[nextRow][nextColumn]) {
                visited[nextRow][nextColumn] = true;
                queue.enqueue(new Point(nextRow, nextColumn));
            }
        }
    }
    return false;
}

/**
 * @param {number} row
 * @param {number} column
 */
function Point(row, column) {
    this.row = row;
    this.column = column;
}

/**
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
function pointIsInMaze(row, column) {
    return row < this.rows && row >= 0 && column < this.columns && column >= 0;
}
