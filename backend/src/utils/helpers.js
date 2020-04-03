import crypto from 'crypto';

//random codes
export const genRandom = (charLength, chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuWwXxYyZz0123456789' ) => {
  let random = crypto.randomBytes(charLength),
    result = new Array(charLength),
    range = chars.length;
  for (let i = 0; i < charLength; i++) {
    result.push(chars[random[i] % range]);
  }
  return result.join('');
};

//add +234 to number
export const convertNumber = number => {
  const rawNumber = number.substring(number.length - 10, number.length);
  const convNum = `+234${rawNumber}`;
  return convNum;
};

// try..catch async wrapper
export const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

