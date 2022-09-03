
#include <array>
#include <queue>
#include <vector>
using namespace std;

class Solution {

    struct Point {
        int row;
        int column;
        Point(int row, int column) : row{row}, column{column}{}
    };
    inline static const int EMPTY_SPACES = 0;
    inline static const int WALL = 1;
    inline static const array<array<int, 2>, 4> MOVES {{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}};
    int rows;
    int columns;

public:
    bool hasPath(vector<vector<int>>&maze, vector<int>& start, vector<int>& destination) {
        rows = maze.size();
        columns = maze[0].size();
        return breadthFirstSearchForPath(maze, start, destination);
    }

private:
    bool breadthFirstSearchForPath(const vector<vector<int>>& maze, const vector<int>& start, const vector<int>& destination) {
        queue<Point> queue;
        vector < vector<bool>> visited(rows, vector<bool>(columns));

        visited[start[0]][start[1]] = true;
        queue.push(Point(start[0], start[1]));

        while (!queue.empty()) {

            Point point = queue.front();
            queue.pop();

            if (point.row == destination[0] && point.column == destination[1]) {
                return true;
            }

            for (const auto& move : MOVES) {
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
                    queue.push(Point(nextRow, nextColumn));
                }
            }
        }
        return false;
    }

    bool pointIsInMaze(int row, int column) {
        return row < rows && row >= 0 && column < columns && column >= 0;
    }
};
