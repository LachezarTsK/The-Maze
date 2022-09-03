
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    private record Point(int row, int column) {}
    private static final int EMPTY_SPACES = 0;
    private static final int WALL = 1;
    private static final int[][] MOVES = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    private int rows;
    private int columns;

    public boolean hasPath(int[][] maze, int[] start, int[] destination) {
        rows = maze.length;
        columns = maze[0].length;
        return breadthFirstSearchForPath(maze, start, destination);
    }

    private boolean breadthFirstSearchForPath(int[][] maze, int[] start, int[] destination) {
        Queue<Point> queue = new LinkedList<>();
        boolean[][] visited = new boolean[maze.length][maze[0].length];

        visited[start[0]][start[1]] = true;
        queue.add(new Point(start[0], start[1]));

        while (!queue.isEmpty()) {

            Point point = queue.poll();
            if (point.row == destination[0] && point.column == destination[1]) {
                return true;
            }

            for (int[] move : MOVES) {
                int nextRow = point.row + move[0];
                int nextColumn = point.column + move[1];
                int path = 0;

                if (!pointIsInMaze(nextRow, nextColumn) || maze[nextRow][nextColumn] != EMPTY_SPACES) {
                    continue;
                }

                while (pointIsInMaze(nextRow, nextColumn) && maze[nextRow][nextColumn] == EMPTY_SPACES) {
                    nextRow += move[0];
                    nextColumn += move[1];
                    ++path;
                }
                nextRow -= move[0];
                nextColumn -= move[1];

                if (!visited[nextRow][nextColumn]) {
                    visited[nextRow][nextColumn] = true;
                    queue.add(new Point(nextRow, nextColumn));
                }
            }
        }
        return false;
    }

    private boolean pointIsInMaze(int row, int column) {
        return row < rows && row >= 0 && column < columns && column >= 0;
    }
}
