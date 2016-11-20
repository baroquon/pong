import Ember from 'ember';

export default Ember.Component.extend({
  gameState: Ember.inject.service(),
  classNames: 'game-paddle',
  attributeBindings: ['style'],
  style: Ember.computed('gameState.leftPaddle', 'gameState.rightPaddle', function(){
    let state  = this.get('gameState');
    let paddle = Ember.String.camelize(this.get('id'));
    return Ember.String.htmlSafe(`top: ${state.get(paddle)}px;`);
  }),
});
