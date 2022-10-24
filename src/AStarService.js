const AStarService = {
    // Start location will be in the following format:
    // [distanceFromTop, distanceFromLeft]
    findShortestPath: function(startCoordinates,stopCoordinates, grid){

      let distanceFromTop = startCoordinates[0];
      let distanceFromLeft = startCoordinates[1];

      // Each "location" will store its coordinates
      // and the shortest path required to arrive there
      let location = {
        distanceFromTop: distanceFromTop,
        distanceFromLeft: distanceFromLeft,
        path: [],
        status: 'Start'
      };

      // Initialize the queue with the start location already inside
      let queue = [location];
      // Loop through the grid searching for the goal
      while (queue.length > 0) {
        // Take the first location off the queue
        let currentLocation = queue.shift();

        // Explore North
        let newLocation = this.exploreInDirection(currentLocation, 'North', grid);
        if (newLocation.status === 'Goal') {
          return newLocation.path;
        } else if (newLocation.status === 'Valid' && true) {
          queue.push(newLocation);
        }

        // Explore East
        newLocation = this.exploreInDirection(currentLocation, 'East', grid);
        if (newLocation.status === 'Goal') {
          return newLocation.path;
        } else if (newLocation.status === 'Valid') {
          queue.push(newLocation);
        }

        // Explore South
        newLocation = this.exploreInDirection(currentLocation, 'South', grid);
        if (newLocation.status === 'Goal') {
          return newLocation.path;
        } else if (newLocation.status === 'Valid') {
          queue.push(newLocation);
        }

        // Explore West
        newLocation = this.exploreInDirection(currentLocation, 'West', grid);
        if (newLocation.status === 'Goal') {
          return newLocation.path;
        } else if (newLocation.status === 'Valid') {
          queue.push(newLocation);
        }
      }

      // No valid path found
      return false;
    },
    // This function will check a location's status
    // (a location is "valid" if it is on the grid, is not an "obstacle",
    // and has not yet been visited by our algorithm)
    // Returns "Valid", "Invalid", "Blocked", or "Goal"
    locationStatus: function(location, grid){
      let gridSize = grid.length;
      let dft = location.distanceFromTop;
      let dfl = location.distanceFromLeft;

      if (location.distanceFromLeft < 0 ||
          location.distanceFromLeft >= gridSize ||
          location.distanceFromTop < 0 ||
          location.distanceFromTop >= gridSize) {

        // location is not on the grid--return false
        return 'Invalid';
      } else if (grid[dft][dfl].cellType === 'wayout') {
        return 'Goal';
      } else if (grid[dft][dfl].cellType !== 'empty') {
        // location is either an obstacle or has been visited
        return 'Blocked';
      } else {
        return 'Valid';
      }
    },
    // Explores the grid from the given location in the given
    // direction
    exploreInDirection:function(currentLocation, direction, grid){
      let newPath = currentLocation.path.slice();
      newPath.push(direction);

      let dft = currentLocation.distanceFromTop;
      let dfl = currentLocation.distanceFromLeft;

      if (direction === 'North') {
        dft -= 1;
      } else if (direction === 'East') {
        dfl += 1;
      } else if (direction === 'South') {
        dft += 1;
      } else if (direction === 'West') {
        dfl -= 1;
      }

      let newLocation = {
        distanceFromTop: dft,
        distanceFromLeft: dfl,
        path: newPath,
        status: 'Unknown'
      };
      newLocation.status = this.locationStatus(newLocation, grid);

      // If this new location is valid, mark it as 'Visited'
      if (newLocation.status === 'Valid') {
        grid[newLocation.distanceFromTop][newLocation.distanceFromLeft].status = 'visited';
      }

      return newLocation;
    },
    heuristic:function(p0,p1){
        //Manhattan
        return Math.abs(p1[0]-p0[0])+Math.abs(p1[1]-p0[1]);
    }

};

export default AStarService;
