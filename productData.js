const products = [];

for (let i = 1; i <= 77; i++) {
  products.push({
    id: i,
    name: "Bagru Hand Block Printed Cotton Frill One Piece Dress",
    price: 1090,
    originalPrice: 1900,
    discount: "40",
    image: `assets/image/copal/onepice (${i}).jpeg`,
    category: "onePiece",
    rating: "5"
  });
}

for (let i = 1; i <= 85; i++) {
  products.push({
    id: i,
    name: "Bagru Hand Block Printed Cotton Saree",
    price: 1299,
    originalPrice: 1900,
    discount: "25",
    image: `assets/image/Sarees/Sarees (${i}).jpeg`,
    category: "sarees",
    rating: "5"
  });
}

for (let i = 1; i <= 77; i++) {
  products.push({
    id: i,
    name: "Bagru Hand Block Printed Cotton One Pice and Shirt Combo",
    price: 1990,
    originalPrice: 2999,
    discount: "30",
    image: `assets\\image\\copal\\copal02 (${i}).jpeg`,
    category: "onePiece",
    rating: "5"
  });
}


for (let i = 1; i <= 85; i++) {
  products.push({
    id: i,
    name: "Bagru Hand Block Printed Cotton Shuit",
    price: 1090,
    originalPrice: 1900,
    discount: "40",
    image: `assets/image/shuit/fab (${i}).jpeg`,
    category: "fabric",
    rating: "5"
  });
}
console.log(products);

