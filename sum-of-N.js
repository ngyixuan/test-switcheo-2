var sum_to_n_a = function (n) {
  // your code here
  if (n == 0 || n == 1) {
    return 1;
  }
  return n + sum_to_n_a(n - 1);
};

console.log("a: ", sum_to_n_a(5));
var sum_to_n_b = function (n) {
  let algo = (n * (n + 1)) / 2;
  return algo;
};
console.log("b: ", sum_to_n_b(5));

var sum_to_n_c = function (n) {
  // your code here
  let total = 0;
  for (let i = 1; i < n + 1; i++) {
    total += i;
  }
  return total;
};
console.log("c: ", sum_to_n_c(5));
