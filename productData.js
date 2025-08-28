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
    rating: "5",
    description:[` <p class="text-xl">🍁  TRADITIONAL BAGRU PRINT  🍁<p>
New collection of Bagru Hand Block Printed Cotton Frill One Piece Dress in multiple Beutiful Colour


<p>One piece  ≈ 1900 <p>
Fabric: Pure Cotton 60*60
Length: 45 inch
Puff sleeve length 10 inch


Size - 36(Xs) - 46 (Xxl)

💫 Bulk/wholesaler available
💫100% Pure Cotton fabric

      ` ] 
    
    
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
    rating: "5",
    discraption :[`🌸☘️Plain Cotton Linen Sarees With 1m extra Blouse 🥻

🌸🍁Saree:- 5.5m || Blouse:- 1m

 Note:- 1m extra Ajrakh blockprinted Cotton Blouse 

🍁🍁 Price:- 1299 `]
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
    rating: "5",
    discraption: [`New collection of Bagru hand block printed cotton one piece

🔺 Elastic in back 
🔺 Adjuster in Sleeves 
🔺 All Buttons are openable 

Length: 44
Size : 38-46 
All size available                                       
shirt price : 790
One pic Price : 1200
Book Now`]
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
    rating: "5",
    discraption : [
      `Beautiful Hand block Printed Cotton suits with mulmul cotton Dupatta

🍁💐Bagru block printed suits 

🍁💐Top size: 2.5 Mtr.
🍁💐Bottom size: 2.5 Mtr.
🍁💐 Dupatta size: 2.5 Mtr.

🍁🌼Price 1900 `
    ]

  });
}
console.log(products);

