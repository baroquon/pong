import Ember from 'ember';

export default Ember.Component.extend({
  gameState: Ember.inject.service(),
  classNames: 'game-ball',
  attributeBindings: ['style'],
  style: Ember.computed('gameState.ballPosition', function(){
    let ballPosition  = this.get('gameState.ballPosition');
    return Ember.String.htmlSafe(`top: ${ballPosition[1]}px;left: ${ballPosition[0]}px;`);
  }),
});
