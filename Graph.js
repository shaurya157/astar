class Graph {
  constructor(grid, options){
    this.nodes = [];
    this.grid = [];
    this.diagonal = options.diagonal;
    grid.forEach((el, col) => {
      this.grid[col] = [];

      el.forEach((item, row) => {
        let node = new GridNode(col, row, item);
        this.grid[col][row] = node;
        this.nodes.push(node);
      });
    });

    this.dirtyNodes = [];
    this.cleanAllNodes();
  }

  cleanAllNodes(){
    this.dirtyNodes.forEach(node => {
      defaultNode(node);
    })

    this.dirtyNodes = [];
  }

  defaultNode(node){
    node.f = 0;
    node.g = 0;
    node.h = 0;
    node.visited = false;
    node.closed = false;
    node.parent = null;
  }

  makeNodeDirty(node){
    this.dirtyNodes.push(node);
  }


  neighbors(node) {
    var result = [];
    var x = node.x;
    var y = node.y;
    var grid = this.grid;
    let xWest = x - 1;
    let xEast = x + 1;
    let yNorth = y + 1;
    let ySouth = y - 1;

    // West
    if (grid[xWest] && grid[xWest][y]) {
      result.push(grid[xWest][y]);
    }

    // East
    if (grid[xEast] && grid[xEast][y]) {
      result.push(grid[xEast][y]);
    }

    // South
    if (grid[x] && grid[x][ySouth]) {
      result.push(grid[x][ySouth]);
    }

    // North
    if (grid[x] && grid[x][yNorth]) {
      result.push(grid[x][yNorth]);
    }

    if (this.diagonal) {
      // Southwest
      if (grid[xWest] && grid[xWest][ySouth]) {
        result.push(grid[xWest][ySouth]);
      }

      // Southeast
      if (grid[xEast] && grid[xEast][ySouth]) {
        result.push(grid[xEast][ySouth]);
      }

      // Northwest
      if (grid[xWest] && grid[xWest][yNorth]) {
        result.push(grid[xWest][yNorth]);
      }

      // Northeast
      if (grid[xEast] && grid[xEast][yNorth]) {
        result.push(grid[xEast][yNorth]);
      }
    }

    return result;
  };
}
