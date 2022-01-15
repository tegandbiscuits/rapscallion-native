import reducer, { addHealth, PlayerState } from '../playerSlice';

describe('playerSlice', () => {
  let initialState: PlayerState;

  beforeEach(() => {
    initialState = {
      progress: 0,
      hp: 0,
      shield: 0,
      shieldRank: 0,
      xp: 0,
      potionSickness: 0,
    };
  });

  describe('addHealth', () => {
    it('adds the payload to current HP', () => {
      initialState.hp = 10;
      const newState = reducer(initialState, addHealth(5));
      expect(newState).toEqual(expect.objectContaining({ hp: 15 }));
    });

    it('prevents the HP from going above 21', () => {
      initialState.hp = 20;
      const newState = reducer(initialState, addHealth(10));
      expect(newState).toEqual(expect.objectContaining({ hp: 21 }));
    });

    it('prevents the HP from going below 0', () => {
      initialState.hp = 0.1;
      const newState = reducer(initialState, addHealth(-10));
      expect(newState).toEqual(expect.objectContaining({ hp: 0 }));
    });
  });
});
