import Ember from 'ember';

export default Ember.Component.extend({
  gameState: Ember.inject.service(),
  attributeBindings: ['tabindex'],
  tabindex: 1,
  keyPress(e){
    switch(e.keyCode){
      case 106:
        this.get('gameState').incrementPaddlePosition('rightPaddle');
        break;
      case 107:
        this.get('gameState').decrementPaddlePosition('rightPaddle');
        break;
      case 102:
        this.get('gameState').incrementPaddlePosition('leftPaddle');
        break;
      case 100:
        this.get('gameState').decrementPaddlePosition('leftPaddle');
        break;
      default:
        return;
    }
  },
  init(){
    this._super(...arguments);
    let state  = this.get('gameState');
    let width  = document.body.clientWidth;
    let height = document.body.clientHeight;
    state.initializeGame(width, height);
  },
  didInsertElement(){
    this.$().focus();
  }
});
