import AStarService from './AStarService';

test('AStarService Test with standard grid', () => {
    // Create a 4x4 grid
    // Represent the grid as a 2-dimensional array
    var gridSize = 4;
    var grid = [];
    for (var i=0; i<gridSize; i++) {
      grid[i] = [];
      for (var j=0; j<gridSize; j++) {
        grid[i][j] = 'Empty';
      }
    }

    // Think of the first index as "distance from the top row"
    // Think of the second index as "distance from the left-most column"

    // This is how we would represent the grid with obstacles above
    grid[0][0] = "Start";
    grid[2][2] = "Goal";

    grid[1][1] = "Obstacle";
    grid[1][2] = "Obstacle";
    grid[1][3] = "Obstacle";
    grid[2][1] = "Obstacle";

    console.log(AStarService.findShortestPath([0,0], grid));

    expect(true);
});