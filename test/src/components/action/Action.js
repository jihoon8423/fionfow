import { SELECT_PLAYER } from '../Type';

export const selectPlayer = (id) => ({
  type: SELECT_PLAYER,
  payload: { id }
});

//redux 를 쓸 때 action으로 가 리듀서에서 스토어가 생성되고 
