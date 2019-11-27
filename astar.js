class AStar{
  constructor(graph){
    this.graph = graph;
    this.heuristics = {
      manhattan: function(p0, p1){
        let d1 = Math.abs(p1.x - p0.x);
        let d2 = Math.abs(p1.y - p0.y);
        return d1 + d2;
      },
      diagonal: function(p0, p1){
        let D = 1;
        let D2 = Math.sqrt(2);
        let d1 = Math.abs(pos1.x - pos0.x);
        let d2 = Math.abs(pos1.y - pos0.y);
        return (D * (d1 + d2)) + ((D2 - (2 * D)) * Math.min(d1, d2));
      }
    }
  }

  search(start, end){
    this.graph.cleanAllNodes();
    let heuristic = this.heuristic.manhattan;
    let heap = new BinaryHeap(function(node){
      return node.f;
    })

    start.h = heuristic(start, end);
    graph.makeNodeDirty(start);

    heap.push(start);
    while(heap.size() > 0){
      //Using min-heap's property, we grab the lowest function to process
      let currNode = heap.pop();

      //end case of result being found
      if(currNode === end){
        return path(currNode);
      }

      //regular case: moving the current node from open to close, then process it's neighbours
      currNode.close = true;
      let neighbours = this.graph.neighbours(currNode);

      neighbours.forEach((neighbour) => {
        //Wall detection or closed neighbour I.E. has been processed
        if(neighbour.close || neighbour.isWall()){
          continue;
        } else {
          let gScore = currNode.g + neighbour.getCost(currNode);
          let visited = neighbour.visited;

          //G score is the shorted distance from current Node to start..
          // Check if the path we arrived at the neighbour is the shortest path yet encountered
          if(gScore < neighbour.g || !visited){
            neighbour.visited = true;
            neighbour.parent = currNode;

            neighbour.h = neighbour.h == 0 ? heuristic(neighbour, end) : neighbour.h
            neighbour.g = gScore;
            neighbour.f = neighbour.g + neighbour.h;

            graph.makeNodeDirty(neighbour);

            if(!visited){
              heap.push(neighbour);
            } else {
              heap.rescore(neighbour);
            }
          }
        }
      })
    }

    return []; //no path found
  }

  getHeap(){
    return new BinaryHeap(function(node){
      return node.f;
    })
  }

  path(node){
    let currNode = node;
    let result = [];
    while(currNode.parent){
      path.unshift(currNode);
      currNode = currNode.parent;
    }

    return result;
  }
}
