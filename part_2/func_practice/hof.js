const array1 = [1, 2, 3, 4, 5, 6, 7];
const array2 = ["Bob", "Nick", "Michael", "Peter", "Jane", "Sara", "Nora"];
const shoppingCart = [
  { description: "Eggs", quantity: 1, price: 3, total: 3 },
  { description: "Cheese", quantity: 0.5, price: 5, total: 2.5 },
  { description: "Butter", quantity: 2, price: 6, total: 12 },
];

// Filter
const greaterThan2 = array1.filter((num) => num > 2);
const startsWithN = array2.filter((name) => name.startsWith("N"));
const endsWitha = array2.filter((name) => name.endsWith("a"));

console.log("Greater Than 2: " + greaterThan2);
console.log("Starts With N: " + startsWithN);
console.log("Ends With a: " + endsWitha);

// Map

const add1 = array1.map((num) => num + 1);
const multiplyBy3 = array1.map((num) => num * 3);
const makeSiblings = array2.map((name) => name + " Smith");
const printShoppingCart = shoppingCart.map((item) => item.description);
const makeReceipt = shoppingCart.map(
  (item) =>
    "Item: " +
    item.description +
    ", Quantity: " +
    item.quantity +
    ", Price: " +
    item.price
);

console.log("Multiply By 3: " + multiplyBy3);
console.log("Add 1: " + add1);
console.log("New Siblings: " + makeSiblings);
console.log("Items in the Cart: " + printShoppingCart);
console.log("Here is your receipt: " + makeReceipt);

// Reduce (Fold)

const sumArray = array1.reduce((prev, curr) => prev + curr);
const sumShoppingCart = shoppingCart.reduce((sum, cart) => sum + cart.total, 0);
const sumShoppingCart2 = shoppingCart
  .map((item) => item.total)
  .reduce((sum, total) => sum + total, 0);

console.log(sumShoppingCart);
console.log(sumShoppingCart2);
