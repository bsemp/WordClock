"use strict";

const panel = [
  ["I", "L", "N", "E", "S", "T", "O", "U", "N", "E", "R"],
  ["D", "E", "U", "X", "N", "U", "T", "R", "O", "I", "S"],
  ["Q", "U", "A", "T", "R", "E", "D", "O", "U", "Z", "E"],
  ["C", "I", "N", "Q", "S", "I", "X", "S", "E", "P", "T"],
  ["H", "U", "I", "T", "N", "E", "U", "F", "D", "I", "X"],
  ["O", "N", "Z", "E", "R", "H", "E", "U", "R", "E", "S"],
  ["M", "O", "I", "N", "S", "O", "L", "E", "D", "I", "X"],
  ["E", "T", "R", "Q", "U", "A", "R", "T", "R", "E", "D"],
  ["V", "I", "N", "G", "T", "-", "C", "I", "N", "Q", "U"],
  ["E", "T", "S", "D", "E", "M", "I", "E", "P", "A", "N"]
];

const mapping = {
  words: {
    it: [[0, 0], [0, 1]], // il
    is: [[0, 3], [0, 4], [0, 5]], // est
    hour: [[5, 5], [5, 6], [5, 7], [5, 8], [5, 9]], // heure
    hours: [[5, 5], [5, 6], [5, 7], [5, 8], [5, 9], [5, 10]],  // heures
    and: [[7, 0], [7, 1]], // et
    the: [[6, 6], [6, 7]], // le
    past: [], //
    to: [[6, 0], [6, 1], [6, 2], [6, 3], [6, 4]] // moins
  },
  time: {
    hours: {
      0: [[2, 6], [2, 7], [2, 8], [2, 9], [2, 10]], // douze
      1: [[0, 7], [0, 8], [0, 9]], // une
      2: [[1, 0], [1, 1], [1, 2], [1, 3]], // deux
      3: [[1, 6], [1, 7], [1, 8], [1, 9], [1, 10]], // trois
      4: [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5]], // quatre
      5: [[3, 0], [3, 1], [3, 2], [3, 3]], // cinq
      6: [[3, 4], [3, 5], [3, 6]], // six
      7: [[3, 7], [3, 8], [3, 9], [3, 10]], // sept
      8: [[4, 0], [4, 1], [4, 2], [4, 3]], // huit
      9: [[4, 4], [4, 5], [4, 6], [4, 7]], // neuf
      10: [[4, 8], [4, 9], [4, 10]], // dix
      11: [[5, 0], [5, 1], [5, 2], [5, 3]] // onze
    },
    minutes: {
      5: [[8, 6], [8, 7], [8, 8], [8, 9]], // cinq
      10: [[6, 8], [6, 9], [6, 10]], // dix
      15: [[7, 3], [7, 4], [7, 5], [7, 6], [7, 7]], // quart
      20: [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4]], // vingt
      25: [[8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9]], // vingt-cinq
      30: [[9, 3], [9, 4], [9, 5], [9, 6]] // demi
    }
  }
};

export { panel, mapping }
