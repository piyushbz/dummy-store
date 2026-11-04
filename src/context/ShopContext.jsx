import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, CATEGORIES } from '../data/mockProducts';

const ShopContext = createContext();

const INITIAL_ORDERS = [
  {
    id: 'DUMMY-849201-92',
    date: '2026-11-03',
    customer: {
      name: 'Piyush Rathi',
      phone: '9024556229',
      email: 'piyush@example.com',
      address: 'Plot 3B, Subhash Nagar, Pal Road',
      city: 'Jodhpur',
      state: 'Rajasthan',
      pincode: '342008'
    },
    items: [
      {
        id: 1,
        name: 'Cyber Ronin: Tokyo 2099 Oversized Tee',
        size: 'L',
        quantity: 1,
        price: 899,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'
      }
    ],
    totalMrp: 1299,
    discount: 400,
    shippingFee: 0,
    finalAmount: 899,
    paymentMethod: 'UPI QR Code',
    status: 'In Transit',
    trackingNumber: 'BLUEDART-84920192',
    carrier: 'BlueDart Air Express'
  }
];

export function ShopProvider({ children }) {
  // 1. Products state (persisted to localStorage so Admin CRUD works instantly!)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('dummystore_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    localStorage.setItem('dummystore_products', JSON.stringify(products));
  }, [products]);

  // 2. Gender navigation filter (1 = Men, 2 = Women)
  const [gender, setGender] = useState(1);

  // 3. Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('dummystore_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('dummystore_cart', JSON.stringify(cart));
  }, [cart]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  // 4. Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('dummystore_wishlist');
      return saved ? JSON.parse(saved) : [1, 2];
    } catch {
      return [1, 2];
    }
  });

  useEffect(() => {
    localStorage.setItem('dummystore_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // 5. Auth & User state
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('dummystore_user');
      return saved ? JSON.parse(saved) : {
        name: 'Demo Shopper',
        email: 'shopper@dummystore.com',
        phone: '9876543210'
      };
    } catch {
      return { name: 'Demo Shopper', email: 'shopper@dummystore.com', phone: '9876543210' };
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // 6. Orders state
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('dummystore_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    localStorage.setItem('dummystore_orders', JSON.stringify(orders));
  }, [orders]);

  // 7. Promo code
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Cart operations
  const addToCart = (product, size = 'M') => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          spl_price: product.spl_price,
          image: product.primary_image,
          size,
          quantity: 1
        }
      ];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id, size, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === id && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('dummystore_cart');
  };

  // Cart calculations
  const totalMrp = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalSelling = cart.reduce((sum, item) => sum + item.spl_price * item.quantity, 0);
  const retailDiscount = totalMrp - totalSelling;
  const promoDiscount = appliedPromo === 'DUMMY10' ? Math.round(totalSelling * 0.10) : 0;
  const shippingFee = totalSelling >= 999 || totalSelling === 0 ? 0 : 99;
  const finalAmount = Math.max(0, totalSelling - promoDiscount + shippingFee);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const applyPromo = (code) => {
    if (code.toUpperCase() === 'DUMMY10') {
      setAppliedPromo('DUMMY10');
      return { success: true, message: 'DUMMY10 Applied! 10% Extra Discount' };
    }
    return { success: false, message: 'Invalid coupon code (Try: DUMMY10)' };
  };

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Place order
  const placeOrder = (orderData) => {
    const orderId = `DUMMY-${Math.floor(100000 + Math.random() * 900000)}-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString().slice(0, 10),
      customer: orderData.customer || user,
      items: cart,
      totalMrp,
      discount: retailDiscount + promoDiscount,
      shippingFee,
      finalAmount,
      paymentMethod: orderData.paymentMethod || 'UPI QR Code',
      status: 'Placed',
      trackingNumber: `BD-${Math.floor(10000000 + Math.random() * 90000000)}`,
      carrier: 'BlueDart Air Express'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
    );
  };

  // Product CRUD (For Admin Page)
  const addProduct = (newProduct) => {
    const id = Date.now();
    const productWithId = {
      ...newProduct,
      id,
      slug: newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 4.8,
      rating_count: 1,
      reviews: []
    };
    setProducts(prev => [productWithId, ...prev]);
    return productWithId;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev =>
      prev.map(p => p.id === id ? { ...p, ...updatedFields } : p)
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Submit Review on PDP
  const submitReview = (productId, reviewData) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const newReview = {
            id: Date.now(),
            author: reviewData.author || user.name || 'Shopper',
            rating: Number(reviewData.rating),
            title: reviewData.title,
            text: reviewData.text,
            fit: reviewData.fit || 'True to Size',
            date: 'Just now',
            verified: true,
            image: reviewData.image || null
          };
          const updatedReviews = [newReview, ...(p.reviews || [])];
          const newAvg = Number(
            (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
          );
          return {
            ...p,
            rating: newAvg,
            rating_count: (p.rating_count || 0) + 1,
            reviews: updatedReviews
          };
        }
        return p;
      })
    );
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        gender,
        setGender,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalMrp,
        totalSelling,
        retailDiscount,
        promoDiscount,
        shippingFee,
        finalAmount,
        cartCount,
        appliedPromo,
        applyPromo,
        wishlist,
        toggleWishlist,
        user,
        setUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        orders,
        placeOrder,
        updateOrderStatus,
        submitReview
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}
