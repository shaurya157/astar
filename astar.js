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
      if(currNode === end){
        return path(currNode)
      }
    }
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
