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

export const YUMMY_STUFF = [ // food that grow the snake
  ITEM_TYPES.clover,
  ITEM_TYPES.heart,
  ITEM_TYPES.apple,
  ITEM_TYPES.bonus,
  ITEM_TYPES.flower,
  ITEM_TYPES.shroom,
  ITEM_TYPES.alien,
]

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

export const EMPTY_BOARD = Array(BOARD_LIMITS.width).fill(
  Array(BOARD_LIMITS.height).fill({})
).map((column, xi) => column.map((cell, yi) => ({...BASE_ITEM, x: xi, y: yi}))); 

export const INITIAL_SNAKE = [
  { x: 10, y: 9, facing: WINDS.west, type: ITEM_TYPES.head },  // head
  { x: 11, y: 9, facing: WINDS.west, type: ITEM_TYPES.segment },  // middle segments
  { x: 12, y: 9, facing: WINDS.west, type: ITEM_TYPES.segment },  
  { x: 13, y: 9, facing: WINDS.west, type: ITEM_TYPES.segment },  
  { x: 14, y: 9, facing: WINDS.west, type: ITEM_TYPES.segment },  
  { x: 15, y: 9, facing: WINDS.west, type: ITEM_TYPES.segment },  
  { x: 16, y: 9, facing: WINDS.west, type: ITEM_TYPES.segment },  
  { x: 17, y: 9, facing: WINDS.west, type: ITEM_TYPES.segment },  
  { x: 18, y: 9, facing: WINDS.west, type: ITEM_TYPES.tail },  // Tail
];

export const symbolToStr = (s) => s.toString().replace(/^Symbol\((.+)\)$/gi, '$1');