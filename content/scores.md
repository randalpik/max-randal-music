---
title: "Scores"
description: "Max's original compositions for sale"
images: []
draft: false
menu: main
weight: 2
---

<body class="main-page">
  <main>
    <div class="products"></div>
  </main>
  <template id="product">
    <div class="product">
      <img src="" alt="" />
      <h2>name</h2>
      <p class="description">description</p>
      <span class="price" style="font-style: italic;">price</span>
      <span style="float: left;">
        <form action="" method="post">
          <input type="hidden" name="sku" value="" />
          <button type="submit" style="min-width: 120px;">Buy Now</button>
        </form>
      </span>
    </div>
  </template>
  <script src="https://js.stripe.com/v3/"></script>
  <script type="module">
    import { loadProducts } from '../js/load-products.js';
    loadProducts();
  </script>
</body>