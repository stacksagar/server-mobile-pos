// all password input type toggle [type='text'/'password']
(() => {
  const all_password = document.querySelectorAll("input[type=password]");
  const all_password_toggle_btns =
    document.querySelectorAll(".toggle-password");
  all_password_toggle_btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const btn_target = btn?.dataset?.target;

      all_password.forEach((input) => {
        const input_target = input?.dataset?.target;
        if (btn_target === input_target) {
          if (input?.type === "password") {
            input.type = "text";
            btn.innerHTML = `<i class="fa-regular fa-eye"></i>`;
          } else {
            input.type = "password";
            btn.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
          }
        }
      });
    });
  });
})();

// error_message hidden
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const all_error_messages = document.querySelectorAll(".error_message");
    all_error_messages.forEach((m) => (m.style.display = "none"));
  }, 20000);
});

// :: Cart & Favorites
// Favorite
const allFavoriteBtns = document.querySelectorAll(".favoriteBtn");
const getFavorites = () =>
  JSON.parse(localStorage.getItem("favorites") || "[]");
const checkFavoriteExist = (id) => getFavorites()?.some((fID) => fID == id);
function syncFavoriteButtons() {
  allFavoriteBtns.forEach((btn) => {
    const id = btn?.dataset?.id;
    if (checkFavoriteExist(id)) {
      btn.setAttribute("title", "Remove from favorite");
      btn.innerHTML = `<i class="fa fa-heart"></i>`;
    } else {
      btn.setAttribute("title", "Add to favorite");
      btn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    }
  });
}

syncFavoriteButtons();
function toggleFavoriteItem(id) {
  if (!id) return;
  let currentFavorites = getFavorites();
  const exist = checkFavoriteExist(id);

  if (exist) currentFavorites = currentFavorites.filter((fID) => fID != id);
  else currentFavorites.push(id);

  updateFavorites(currentFavorites);
  syncFavoriteButtons();
}

function updateFavorites(ids = []) {
  localStorage.setItem("favorites", JSON.stringify(ids));
  const all_totalFavoriteItems = document.querySelectorAll(
    ".totalFavoriteItems"
  );
  all_totalFavoriteItems?.forEach((ele) => {
    ele.innerHTML = ids?.length;
  });

  fetch("/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }), // Convert the data to JSON string
  });
}

updateFavorites(getFavorites());

// Cart
const allCartBtns = document.querySelectorAll(".cartBtn");
const getCurrentCart = () => JSON.parse(localStorage.getItem("cart") || "[]");
const checkCartExist = (id) =>
  getCurrentCart()?.some((d) => d?.product?.id == id);

function syncCartButtons() {
  allCartBtns.forEach((btn) => {
    const id = btn?.dataset?.id;
    const icononly = btn?.dataset?.icononly;
    if (checkCartExist(id)) {
      btn.setAttribute("title", "Remove from cart");
      btn.innerHTML = icononly
        ? `<i class="fa-solid fa-times"></i>`
        : `<span class="hidden sm:block text-sm">Remove from cart</span> <span class="sm:hidden"><i class="fa-solid fa-times"></i></span>`;
    } else {
      btn.setAttribute("title", "Add to cart");
      btn.innerHTML = icononly
        ? `<i class="fa-solid fa-cart-plus"></i>`
        : `<span class="hidden sm:inline-block"> Add To Cart </span> <i class="fa fa-shopping-cart"></i>`;
    }
  });
}

function toggleCartItem(stringifyProduct, action = "") {
  const product = JSON.parse(stringifyProduct || "{}");
  const id = product?.id;

  if (!product || !id) return;

  let currentCart = getCurrentCart();
  const exist = checkCartExist(id);
  if (exist) {
    if (action !== "buynow") {
      currentCart = currentCart.filter(
        (cartItem) => cartItem?.product?.id != id
      );
    }
  } else {
    currentCart.push({
      quantity: 1,
      product: {
        images: product?.images,
        name: product?.name,
        sale_price: product?.sale_price,
        purchase_price: product?.purchase_price,
        slug: product?.slug,
        in_stock: product?.in_stock,
        id: product?.id,
      },
    });
  }

  localStorage.setItem("cart", JSON.stringify(currentCart));
  syncCartButtons();

  updateCart(currentCart);
}

function handleQuantity(input, index) {
  const quantity = Number(input?.value || 0);
  const in_stock = getCurrentCart()?.find((_, i) => i === index)?.product
    ?.in_stock;

  if (quantity > in_stock || quantity < 1) return;

  const cart = getCurrentCart()?.map((item, i) =>
    i === index ? { ...item, quantity } : item
  );

  updateCart(cart);
}

function updateCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));

  const cartProductIDs = document.getElementById("cartProductIDs");
  const cartItemsIDs = document.getElementById("cartItemsIDs");

  const quantitiesByProductInput = document.getElementById(
    "quantitiesByProduct"
  );

  const all_totalCartItems = document.querySelectorAll(".totalCartItems");
  const all_cartQuantity = document.querySelectorAll(".cartQuantity");
  const all_cartSubTotal = document.querySelectorAll(".cartSubTotal");
  const all_cartSubTotalInput = document.querySelectorAll(".cartSubTotalInput");
  const all_cartPurchaseSubTotalInput = document.querySelectorAll(
    ".cartPurchaseSubTotalInput"
  );

  const subTotal = cart?.reduce((acc, item) => {
    return (acc += item?.quantity * item?.product?.sale_price);
  }, 0);

  const purchaseSubTotal = cart?.reduce((acc, item) => {
    return (acc += item?.quantity * item?.product?.purchase_price);
  }, 0);

  const cartQuantity = cart?.reduce((acc, item) => {
    return (acc += item?.quantity || 0);
  }, 0);

  all_totalCartItems?.forEach((ele) => (ele.innerHTML = cart?.length));
  all_cartQuantity?.forEach((ele) => (ele.innerHTML = cartQuantity));
  all_cartSubTotal?.forEach((ele) => (ele.innerHTML = `৳${subTotal}`));
  all_cartSubTotalInput?.forEach((ele) => (ele.value = subTotal));
  all_cartPurchaseSubTotalInput?.forEach(
    (ele) => (ele.value = purchaseSubTotal)
  );

  const productsIDs = cart?.map((item) => item?.product?.id);
  const cartsIDs = cart?.map((item) => item?.id);

  cartProductIDs &&
    cartProductIDs?.setAttribute("value", JSON.stringify(productsIDs));
  cartItemsIDs && cartItemsIDs?.setAttribute("value", JSON.stringify(cartsIDs));

  const quantitiesByProduct = cart?.reduce((acc, item) => {
    acc[item?.product?.id] = item?.quantity;
    return acc;
  }, {});

  quantitiesByProductInput &&
    quantitiesByProductInput?.setAttribute(
      "value",
      JSON.stringify(quantitiesByProduct)
    );

  syncCartButtons();
  displayCartProducts(cart);
}

function displayCartProducts(latestCart = []) {
  const cartProducts = document.getElementById("cartProducts");
  if (latestCart && cartProducts) {
    cartProducts.innerHTML = "";
    latestCart.map((item, index) => {
      cartProducts.innerHTML += `
        <div data-ripple-dark="true" class="flex flex-wrap items-center py-4 border-b border-l border-r bg-white">
      <div class="px-4 w-3/6 lg:w-6/12">
        <div class="flex flex-wrap items-center -mx-4">
          <div class="w-full px-4 md:w-1/3">
            <div class="w-full md:w-24 flex items-center">
              <img src="${item?.product?.images[0]
        }" alt="" class="w-20 rounded">
            </div>
          </div>
          <div class="w-2/3 px-4">
            <a href="/item/${item?.product?.slug
        }" class="mb-2 text-lg font-bold block text-blue-600 hover:underline"> ${item?.product?.name
        } </a> 
           <p class="text-green-500">stock: ${item?.product?.in_stock} </p>
          </div>
        </div>
      </div>

      <div class="hidden px-4 lg:block lg:w-2/12">
        <p class="text-lg font-bold text-orange-600 dark:text-gray-400"> ৳ ${item?.product?.sale_price
        } </p>
        <span class="text-xs text-gray-500 line-through dark:text-gray-400"> ৳${(item?.product?.sale_price / 100) * 10 + item?.product?.sale_price
        } </span>
      </div>

      <div class="w-3/12">
      <div class="pr-10">
        <div class="rounded">
          <input onkeyup="handleQuantity(this, ${index})" onchange="handleQuantity(this, ${index})" value="${item?.quantity
        }" type="number" class="p-1 w-14 text-center rounded focus:outline-none focus:ring border" placeholder="quantity" />
        </div>

        <div>
        <p class="text-lg font-bold text-orange-600"> ৳${item?.product?.sale_price * item?.quantity
        } </p>
        </div>
        </div>
      </div>
     
      <div class="w-1/12 text-center">
        <button data-id="${item?.product?.id
        }" title="Remove from cart" class="removeCartBtn text-red-500 text-xl transform transition-all hover:scale-105 focus:ring bg-gray-300 px-3 py-2 rounded shadow"> 
        <i class="fa fa-times"></i> 
        </button>
      </div>
    </div>
    `;
    });
  }
}

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  updateCart(getCurrentCart());

  const all_removeCartBtn = document.querySelectorAll(".removeCartBtn");
  if (all_removeCartBtn?.length > 0) {
    all_removeCartBtn?.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn?.dataset?.id;
        const cart = getCurrentCart().filter((item) => item?.product?.id != id);
        updateCart(cart);
        location.reload();
      });
    });
  }

  // toast-message
  const all_toast_messsages = document.querySelectorAll(".toast-message");
  all_toast_messsages.forEach((ele) => {
    setTimeout(() => {
      ele.style.display = "none";
    }, 4000);
  });
});

function onConfirmOrder() {
  localStorage.removeItem("cart");
}

//
const all_banner_link = document.querySelectorAll(".banner_link");

all_banner_link.forEach((banner) => {
  banner.addEventListener("click", () => {
    const link = banner?.dataset?.link;
    if (link) {
      window.open(link);
    }
  });
});

//
const all_paymentDescription = document.querySelectorAll(".paymentDescription");
const all_paymentLabel = document.querySelectorAll(".paymentLabel");

all_paymentLabel.forEach((label) => {
  label.addEventListener("click", () => {
    const labelMethod = label?.dataset?.method;

    all_paymentDescription.forEach((desc) => {
      const descMethod = desc?.dataset?.method;
      if (labelMethod === descMethod) {
        desc.classList.remove("hidden");
      } else {
        desc.classList.add("hidden");
      }
    });
  });
});

// display  date

const all_displayDateEle = document.querySelectorAll(".displayDateEle");

all_displayDateEle?.forEach((ele) => {
  const date = new Date(ele?.dataset?.date);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const theYear = date.getFullYear();
  const theMonth = date.getMonth();
  const theDate = date.getDate();
  ele.innerHTML = `${months[theMonth]} ${theDate} ${theYear}`;
});

(() => {
  const toggleMobileSearch = document.getElementById("toggleMobileSearch");
  const mobilSearch = document.getElementById("mobilSearch");
  let open = false;

  toggleMobileSearch.addEventListener("click", () => {
    open = !open;
    if (open) {
      mobilSearch.style.transform = "scaleY(1)";
    } else {
      mobilSearch.style.transform = "scaleY(0)";
    }
  });
})();

(() => {
  const mobileSidebar = document.getElementById("mobile-sidebar");
  const all_toggler = document.querySelectorAll(".toggle-mobile-sidebar");
  let open = false;
  all_toggler.forEach((ele) => {
    ele.addEventListener("click", () => {
      open = !open;
      if (open) {
        mobileSidebar.style.transform = `translateX(0%)`;
      } else {
        mobileSidebar.style.transform = `translateX(-100%)`;
      }
    });
  });
})();

(() => {
  const profileMenuToggler = document.getElementById("profile-menu-toggle");
  const profileMenu = document.getElementById("profile-menu");
  let open = false;

  profileMenuToggler && profileMenuToggler?.addEventListener("click", () => {
    open = !open;
    if (open) {
      profileMenu.classList.remove("hidden");
    } else {
      profileMenu.classList.add("hidden");
    }
  });
})();
