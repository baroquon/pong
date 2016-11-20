import Ember from 'ember';

export default Ember.Service.extend({
  // Properties
  leftScore: 0,
  rightScore: 0,
  boardWidth: null,
  boardHeight: null,
  leftPaddle: null,
  rightPaddle: null,
  ballPosition: [0, 0],
  previousDirection: ['right', 'down'],

  initializeGame(boardWidth, boardHeight){
    let paddleHeight = boardHeight/2-30;
    console.log(paddleHeight);
    this.setPaddlePosition('leftPaddle', paddleHeight);
    this.setPaddlePosition('rightPaddle', paddleHeight);
    this.setScore('rightScore', 0);
    this.setScore('leftScore', 0);

    Ember.set(this, 'boardWidth', boardWidth);
    Ember.set(this, 'boardHeight', boardHeight);
    this.startBall();
    return {
      leftPosition: paddleHeight,
      rightPosition: paddleHeight,
      ballPosition: this.get('ballPosition'),
      score: { rightScore: 0, leftScore: 0 }
    };
  },
  startBall(){
    let ballPosition = this.get('ballPosition');
    let previousDirection = this.get('previousDirection');
    let xPos               = ballPosition[0];
    let yPos               = ballPosition[1];
    let previousXdirection = previousDirection[0];
    let previousYdirection = previousDirection[1];
    if(yPos < this.get('boardHeight')){
      yPos = yPos + 50;
    } else if(yPos > 0){
      yPos = yPos - 50;
    }
    if(xPos < this.get('boardWidth')){
      xPos = xPos + 50;
    } else if(xPos > 0){
      xPos = xPos - 50;
    }
    this.setBallPosition(xPos, yPos);
    Ember.run.later(()=>{
      this.startBall();
    }, 500);
  },
  setBallPosition(xPos, yPos){
    // document.getElementById('game-ball').style.top=`${yPos}px`;
    // document.getElementById('game-ball').style.left=`${xPos}px`;
    if(Ember.isPresent(...arguments)){
      return Ember.set(this, 'ballPosition', [xPos, yPos]);
    } else {
      return Ember.get(this, 'ballPosition');
    }
  },
  setScore(side, score){
    if(Ember.isPresent(score)){
      Ember.set(this, side, score);
    }
    return { rightScore: Ember.get(this, 'rightScore'), leftScore: Ember.get(this, 'leftScore') };
  },
  setPaddlePosition(paddle, position){
    //document.getElementById(paddle).style.top=`${position}px`;
    if(Ember.isPresent(position)){
      return this.set(paddle, position);
    } else {
      return this.get(paddle);
    }
  },
  incrementPaddlePosition(paddle){
    return this.set(paddle, (this.get(paddle)+50));
  },
  decrementPaddlePosition(paddle){
    return this.set(paddle, (this.get(paddle)-50));
  }

});
