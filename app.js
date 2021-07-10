Vue.component("navbar", {
  props: ["cartCount"],
  template: `
    <div class="navbar">
      <h2 class="title">Simple Ecommerce App</h2>
      <div class="cart-info">
        <span class="material-icons-outlined"> shopping_cart </span>
        <div class="cart-count">{{cartCount}}</div>
      </div>
    </div>
  `,
});

Vue.component("product", {
  props: ["product", "cart", "stockStatus", "updateProduct"],
  template: `
    <div class="product">
      <img class="product-img" :src="product.image" alt="Sdas" :alt="[product.name] + ' image'"/>
      <div class="product-info">
        <h2 class="name">{{ product.name }}</h2>
        <div
          v-if="product.inventory >= 10"
          class="stock-status in-stock"
        >
          <p>In Stock</p>
        </div>

        <p
          v-else-if="product.inventory <= 5 && product.inventory > 0"
          class="stock-status almost-sold-out"
        >
          Almost Sold Out
        </p>
        <p v-else class="stock-status out-of-stock">Out of Stock</p>

        <ul class="details">
          <li>Original</li>
          <li>Good Quality</li>
          <li>Durable</li>
        </ul>

        <div class="variants">
          <div class="color-variant">
            <h3>Colors:</h3>
            <div class="colors">
              <div
                v-for="color in product.variants.colors"
                @mouseover="updateProduct(product.id, color.variantImage, color.inventory)"
                :style="{backgroundColor: color.name}"
              ></div>
            </div>
          </div>
        </div>

        <button
          @click="addToCart()"
          type="button"
          class="button"
          :class="{disabled: !stockStatus(product.id)}"
          :disabled="!stockStatus(product.id)"
        >
          Add To Cart
        </button>

        
        <button
          v-if="isProductInCart()"
          @click="deleteFromCart()"
          type="button"
          class="button"
        >
          Delete from Cart
        </button>

        <div class="reviews">
          <h3>Reviews: </h3>
          <h4 v-if="!product.reviews.length" style="color:red">There are no reviews yet</h4>
          <div class="review" v-for="review in product.reviews">
            <p>{{review.rating}} stars from {{review.name}}</p>
            <p style="font-style:italic;">"{{review.review}}"</p> 
            ------------------
          </div>
        </div>
        <hr />
        <product-review @review-submitted="addReview"></product-review>
      </div>  
    </div>
  `,
  methods: {
    // Component's methods (LOCAL)
    addReview(productReview) {
      console.log(this.product.reviews, productReview);
      this.product.reviews.push(productReview);
    },

    isProductInCart() {
      if (this.cart.includes(this.product.id)) return true;
      return false;
    },
    addToCart() {
      this.$emit("add-to-cart", this.product.id, "add");
    },
    deleteFromCart() {
      this.$emit("delete-from-cart", this.product.id, "remove");
    },
  },
});

Vue.component("product-review", {
  template: `
  <div>
    <h3>Add a Review</h3>
    <br>
    <form @submit.prevent="onSubmit()">
      <p>
        <label for="name">Name</label>
        <input v-model="name" required/>
      </p>

      <p>
        <label for="review">Review</label>
        <textarea id="review" v-model="review" required></textarea>
      </p>

      <p>
        <label for="rating">Rating</label>
        <select id="rating" v-model.number="rating" required>
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      
      <button type="submit" class="button">Submit</button>
    </form>
  </div>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
    };
  },
  methods: {
    onSubmit() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
      };
      this.$emit("review-submitted", productReview);
      this.name = null;
      this.review = null;
      this.rating = null;
    },
  },
});

const app = new Vue({
  el: "#app",
  data: {
    cart: [],
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
        reviews: [],
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
        reviews: [],
      },
    ],
  },
  methods: {
    updateProduct(productId, variantImage, variantInventory) {
      let product = this.products.filter((product) => product.id === productId);
      product[0].image = variantImage;
      product[0].inventory = variantInventory;
    },
    updateCart(productId, action) {
      if (action === "add") this.cart.push(productId);
      if (action === "remove") {
        this.cart = this.cart.filter((product) => product != productId);
      }
    },
    stockStatus(productId) {
      let product = this.products.filter((product) => product.id === productId);
      let productInventory = product[0].inventory;

      if (productInventory > 0) return true;

      return false;
    },
  },
  // beforeMount() {
  //   this.checkStock();
  // },
});
