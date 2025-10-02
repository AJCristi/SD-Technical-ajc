"use client";

import { useState, useEffect } from "react";
import _ from "lodash";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Simulated product data - in real app this would be fetched
const PRODUCTS = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    description: "Soft, breathable cotton tee perfect for everyday wear",
    stock: 45,
  },
  {
    id: 2,
    name: "Leather Wallet",
    price: 49.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    description: "Handcrafted genuine leather wallet with RFID protection",
    stock: 23,
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 159.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    description: "Premium sound quality with active noise cancellation",
    stock: 12,
  },
  {
    id: 4,
    name: "Yoga Mat",
    price: 39.99,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80",
    description: "Non-slip, eco-friendly yoga mat for all skill levels",
    stock: 67,
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    description: "Keeps drinks cold for 24h, hot for 12h",
    stock: 89,
  },
  {
    id: 6,
    name: "Running Shoes",
    price: 119.99,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    description: "Lightweight design with superior cushioning",
    stock: 34,
  },
  {
    id: 7,
    name: "Backpack",
    price: 79.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    description: "Water-resistant laptop backpack with USB charging port",
    stock: 56,
  },
  {
    id: 8,
    name: "Sunglasses",
    price: 89.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
    description: "UV400 protection with polarized lenses",
    stock: 41,
  },
  {
    id: 9,
    name: "Smart Watch",
    price: 299.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    description: "Track fitness, health, and stay connected",
    stock: 18,
  },
  {
    id: 10,
    name: "Coffee Maker",
    price: 149.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80",
    description: "Programmable coffee maker with thermal carafe",
    stock: 28,
  },
];

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(`Product ${product.id} is being tracked`);
    }, 1000);
  }, [product.id]);

  const formattedPrice = _.round(product.price, 2).toFixed(2);
  const isLowStock = product.stock < 30;
  const priceWithTax = product.price * 1.1;

  return (
    <Card
      className="h-full transition-shadow hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full object-cover"
          style={{ height: "200px" }}
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          {isLowStock && (
            <Badge variant="destructive" className="text-xs">
              Low Stock
            </Badge>
          )}
        </div>
        <CardDescription className="mb-3">{product.description}</CardDescription>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Category:</span>
            <span className="font-medium">{product.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">In Stock:</span>
            <span className="font-medium">{product.stock} units</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Price (incl. tax):</span>
            <span className="font-medium">${priceWithTax.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <span className="text-2xl font-bold">${formattedPrice}</span>
        <Button>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}

export default function Task02Page() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", ..._.uniq(PRODUCTS.map(p => p.category))];

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalProducts = filteredProducts.length;
  const averagePrice = _.mean(filteredProducts.map(p => p.price));
  const totalValue = _.sum(filteredProducts.map(p => p.price * p.stock));

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=block"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1
              className="text-5xl font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Product Gallery
            </h1>
            <p className="text-xl text-muted-foreground">
              Browse our collection of premium products
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Products</CardDescription>
                <CardTitle className="text-3xl">{totalProducts}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Average Price</CardDescription>
                <CardTitle className="text-3xl">${averagePrice.toFixed(2)}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Inventory Value</CardDescription>
                <CardTitle className="text-3xl">${totalValue.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 space-y-6 rounded-lg border bg-muted/50 p-6">
            <h2 className="text-2xl font-semibold">Why Shop With Us?</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80"
                  alt="Fast Shipping"
                  style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                />
                <h3 className="font-semibold">Fast Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over $50. Get your products in 2-3 business days.
                </p>
              </div>
              <div className="space-y-2">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&q=80"
                  alt="Quality Guaranteed"
                  style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                />
                <h3 className="font-semibold">Quality Guaranteed</h3>
                <p className="text-sm text-muted-foreground">
                  All products backed by our 30-day quality guarantee. Love it or return it.
                </p>
              </div>
              <div className="space-y-2">
                <img
                  src="https://images.unsplash.com/photo-1556742111-a301076d9d18?w=400&q=80"
                  alt="24/7 Support"
                  style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                />
                <h3 className="font-semibold">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Our customer support team is always here to help you with any questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
