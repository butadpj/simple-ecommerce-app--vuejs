const app = new Vue({
  el: "#app",
  data: {
    cartCount: 0,
    products: [
      {
        id: 0,
        name: "BRO Headphones 2400G",
        inventory: 5,
        image: "./images/headphone-red.jpg",
        variants: {
          colors: [
            {
              id: 0,
              name: "red",
              inventory: 5,
              variantImage: "./images/headphone-red.jpg",
            },
            {
              id: 1,
              name: "blue",
              inventory: 0,
              variantImage: "./images/headphone-blue.jpg",
            },
          ],
        },
      },
      {
        id: 1,
        name: "Sperry Boat Men Shoes",
        inventory: 5,
        image: "./images/shoes-red.jpg",
        variants: {
          colors: [
            {
              id: 0,
              name: "red",
              inventory: 10,
              variantImage: "./images/shoes-red.jpg",
            },
            {
              id: 1,
              name: "orange",
              inventory: 5,
              variantImage: "./images/shoes-orange.jpg",
            },
            {
              id: 2,
              name: "purple",
              inventory: 10,
              variantImage: "./images/shoes-purple.jpg",
            },
          ],
        },
      },
    ],
  },
  methods: {
    updateProduct(productId, variantColor, variantImage, variantInventory) {
      let product = this.products.filter((product) => product.id === productId);
      product[0].image = variantImage;
      product[0].inventory = variantInventory;
      console.log(variantColor);
    },
    addToCart() {
      this.cartCount += 1;
    },
  },
});
