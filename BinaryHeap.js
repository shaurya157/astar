class BinaryHeap{
  constructor(scoreFunction){
    this.content = [];
    this.scoreFunction = scoreFunction;
  }

  push(el){
    this.content.push(el);
    this.sink(this.content.length - 1);
  }

  sink(num){
    let el = this.content[num];
    while(num > 0){
      let parentNum = ((num + 1) >> 1) - 1;
      let parent = this.content[parentN];

      if(this.scoreFunction(el) < this.scoreFunction(parent)){
        this.content[parentNum] = el;
        this.content[num] = parent;

        num = parentNum;
      } else {
        break;
      }
    }
  }

  pop(){
    let result = this.content[0];
    let end = this.content.pop();

    if (this.content.length > 0) {
      this.content[0] = end;
      this.bubble(0);
    }
    return result;
  }

  bubble(num){
    let len = this.content.length;
    let el = this.content[num];
    let elScore = thi.scoreFunction(el);

    while(true){
      let child2Num = (num + 1) << 1;
      let child1Num = child2Num - 1;
      let swap, child1Score, child2Score;

      if(child1Num < len){
        let child1 = this.content[child1Num];
        child1Score = this.scoreFunction(child1);

        if(child1Score < elScore){
          swap = child1Num;
        }
      }

      if(child2Num < len){
        let child2 = this.content[child2Num];
        child2Score = this.scoreFunction(child2);

        if(child2Score < (swap == null ? elScore : child1Score)){
          swap = child2Num;
        }
      }

      if(swap !== null){
        this.content[num] = this.content[swap];
        this.content[swap] = el;
        num = swap;
      } else {
        break;
      }
    }
  }

  remove(node){
    let i = this.content.indexOf(node);
    let end = this.content.pop();

    if (i !== this.content.length - 1){
      this.content[i] = end;

      if (this.scoreFunction(end) < this.scoreFunction(node)) {
        this.sink(i);
      } else {
        this.bubble(i);
      }
    }
  }

  size(){
    return this.content.length;
  }

  rescore(){
    return function(node){
      this.sink(this.content.indexOf(node));
    }
  }
}
