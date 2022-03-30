export const WINDS = {
  north: Symbol('north'),
  east: Symbol('east'),
  south: Symbol('south'),
  west: Symbol('west'),
};

export const ITEM_TYPES = {
  empty: Symbol('👻'),
  clover: Symbol('☘'),
  head: Symbol('🐸'),
  segment: Symbol('🐍'),
  tail: Symbol('🐍🐊'),
  heart: Symbol('🧡'),
  apple: Symbol('🍏'),
  bonus: Symbol('x2'),
  flower: Symbol('🌷'),
  shroom: Symbol('🍄'),
  alien: Symbol('🛸'),
  brick: Symbol('🧱'),
  wall: Symbol('🗿'),
};

export const BOARD_LIMITS = {
  cellSide: 30,
  height: 20, 
  width: 26,
};

export const BOARD_DIMENSIONS = {
  width: BOARD_LIMITS.cellSide * BOARD_LIMITS.width,
  height: BOARD_LIMITS.cellSide * BOARD_LIMITS.height,
}

export const BASE_ITEM = {
  type: ITEM_TYPES.empty,
  facing: WINDS.west,
  x: 0,
  y: 0,
}

export const EMPTY_BOARD = Array(BOARD_LIMITS.height).fill(
  Array(BOARD_LIMITS.width).fill({})
).map((row, yi) => row.map((cell, xi) => ({...BASE_ITEM, x: xi, y: yi}))); 

export const INITIAL_SNAKE = [
  { facing: WINDS.west, x: 10, y: 9 },  // head
  { facing: WINDS.west, x: 11, y: 9 },  // middle segments
  { facing: WINDS.west, x: 12, y: 9 },  
  { facing: WINDS.west, x: 13, y: 9 },  
  { facing: WINDS.west, x: 14, y: 9 },  
  { facing: WINDS.west, x: 15, y: 9 },  
  { facing: WINDS.west, x: 16, y: 9 },  
  { facing: WINDS.west, x: 17, y: 9 },  
  { facing: WINDS.west, x: 18, y: 9 },  // Tail
];