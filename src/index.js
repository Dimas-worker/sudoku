module.exports = function solveSudoku(matrix) {
  const size = matrix.length,
    boxSize = Math.sqrt(size);
  // search empty value
  function findZero(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        if (matrix[i][j] === 0) {
          return [i, j];
        }
      }
    }
    return null;
  }
  // check valid current num
  function isValid(num, pos, matrix) {
    let [c, r] = pos;
    for (let i = 0; i < matrix[c].length; i++) {
      if (num === matrix[c][i] && i !== r) {
        return false;
      }
    }
    for (let j = 0; j < matrix.length; j++) {
      if (num === matrix[j][r] && j !== c) {
        return false;
      }
    }
    let colBox = Math.floor(c / boxSize) * boxSize;
    let rowBox = Math.floor(r / boxSize) * boxSize;
    for (let k = colBox; k < colBox + boxSize; k++) {
      for (let l = rowBox; l < rowBox + boxSize; l++) {
        if (num === matrix[k][l] && l !== r && k !== c) {
          return false;
        }
      }
    }
    return true;
  }
  function getResult() {
    let curPos = findZero(matrix);
    if (!curPos) return true;
    // add number 1...9
    for (let i = 1; i <= size; i++) {
      let curNum = i;
      if (isValid(curNum, curPos, matrix)) {
        let [col, row] = curPos;
        matrix[col][row] = curNum;
        // check if add number valid
        if (getResult()) return true;
        matrix[col][row] = 0;
      }
    }
    return false;
  }
  getResult();
  return matrix;
};
