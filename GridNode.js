class GridNode{
  constructor(x, y, weight){
    this.x = x;
    this.y = y;
    this.weight = weight;
  }

  getCost(neighbour){
    if(neighbour && neighbour.x != this.x && neighbour.y != this.y){
      return this.weight * 1.41421; // Diagonal weight
    }

    return this.weight;
  }

  isWall(){
    return this.weight == 0;
  }
}
