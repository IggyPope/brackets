module.exports = function check(str, bracketsConfig) {
  const openingBrackets = bracketsConfig.map((bracket) => bracket[0]);
  const closingBrackets = bracketsConfig.map((bracket) => bracket[1]);

  let bracketsMap = new Map();

  for (let i = 0; i < openingBrackets.length; i++) {
    bracketsMap.set(openingBrackets[i], closingBrackets[i]);
  }

  const stack = [];

  const input = str.split('');

  for (const bracket of input) {
    if (openingBrackets.includes(bracket)) {
      if (
        closingBrackets.includes(bracket) &&
        stack[stack.length - 1] === bracket
      ) {
        stack.pop();
      } else {
        stack.push(bracket);
      }
    } else if (closingBrackets.includes(bracket)) {
      const lastBracket = stack.pop();

      if (!lastBracket || bracketsMap.get(lastBracket) !== bracket) {
        return false;
      }
    }
  }

  return stack.length === 0;
};
