const rooms = [
  {
    id: 1,
    name: "Deluxe Double Room",
    description: "Spacious and elegant room featuring a comfortable double bed, modern amenities, and a private balcony overlooking the garden. Perfect for couples or solo travelers seeking comfort and style.",
    price: 1200,
    capacity: 2,
    size: "320 sq ft",
    owner: "Ashroy",
    ownerType: "parent",
    amenities: [
      "Air Conditioning",
      "Free Wi-Fi",
      "LED TV",
      "Private Bathroom",
      "Room Service",
      "Tea/Coffee Maker",
      "Mini Fridge",
      "Balcony View"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600",
        caption: "Spacious bedroom with comfortable double bed",
        category: "bedroom",
        order: 1
      },
      {
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600",
        caption: "Modern bathroom with premium fixtures",
        category: "bathroom",
        order: 2
      },
      {
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600",
        caption: "Private balcony with garden view",
        category: "view",
        order: 3
      }
    ],
    features: {
      bedroom: ["Double Bed", "Premium Mattress", "Reading Lamps", "Wardrobe"],
      bathroom: ["Rain Shower", "Hair Dryer", "Premium Toiletries", "24/7 Hot Water"],
      kitchen: ["Electric Kettle", "Mini Fridge", "Coffee Maker"],
      entertainment: ["43-inch LED TV", "High-speed WiFi", "Cable Channels"],
      comfort: ["Air Conditioning", "Room Heater", "Daily Housekeeping"],
      workspace: ["Study Table", "Chair", "Power Outlets"]
    },
    rules: {
      checkIn: "12:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Flexible",
      smoking: false,
      pets: false,
      parties: false
    }
  },
  {
    id: 2,
    name: "Premium Family Suite",
    description: "Luxurious suite with two bedrooms, a living area, and mountain views. Perfect for families or groups seeking a comfortable and spacious stay.",
    price: 2500,
    capacity: 4,
    size: "550 sq ft",
    owner: "Ashroy",
    ownerType: "parent",
    amenities: [
      "Air Conditioning",
      "Free Wi-Fi",
      "2 LED TVs",
      "2 Bathrooms",
      "Room Service",
      "Kitchen",
      "Dining Area",
      "Mountain View"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600",
        caption: "Spacious living room with mountain view",
        category: "living",
        order: 1
      },
      {
        url: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&h=600",
        caption: "Master bedroom with king bed",
        category: "bedroom",
        order: 2
      },
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600",
        caption: "Modern bathroom",
        category: "bathroom",
        order: 3
      }
    ],
    features: {
      bedroom: ["King Bed", "Twin Beds", "Premium Mattresses", "Large Wardrobes"],
      bathroom: ["2 Full Bathrooms", "Rain Showers", "Premium Toiletries", "Hair Dryers"],
      kitchen: ["Full Kitchen", "Microwave", "Refrigerator", "Dining Table"],
      entertainment: ["2 LED TVs", "High-speed WiFi", "Cable Channels"],
      comfort: ["Air Conditioning", "Room Heater", "Daily Housekeeping"],
      workspace: ["Work Desk", "Ergonomic Chair", "Multiple Power Outlets"]
    },
    rules: {
      checkIn: "12:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Moderate",
      smoking: false,
      pets: true,
      parties: false
    }
  },
  {
    id: 3,
    name: "Luxury Suite",
    description: "Elegant suite with premium furnishings and a private terrace. Perfect for those seeking luxury and comfort.",
    price: 3000,
    capacity: 2,
    size: "450 sq ft",
    owner: "John Smith",
    ownerType: "partner",
    amenities: [
      "Air Conditioning",
      "Free Wi-Fi",
      "Smart TV",
      "Private Terrace",
      "Room Service",
      "Mini Bar",
      "Premium Toiletries",
      "City View"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600",
        caption: "Luxurious bedroom with city view",
        category: "bedroom",
        order: 1
      },
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600",
        caption: "Elegant bathroom",
        category: "bathroom",
        order: 2
      },
      {
        url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600",
        caption: "Private terrace",
        category: "view",
        order: 3
      }
    ],
    features: {
      bedroom: ["King Bed", "Premium Linens", "Blackout Curtains", "Walk-in Closet"],
      bathroom: ["Marble Bathroom", "Rain Shower", "Luxury Toiletries", "Heated Floors"],
      kitchen: ["Mini Bar", "Coffee Machine", "Wine Cooler"],
      entertainment: ["65-inch Smart TV", "Surround Sound", "Streaming Services"],
      comfort: ["Climate Control", "Evening Turndown", "Pillow Menu"],
      workspace: ["Executive Desk", "Ergonomic Chair", "High-speed Internet"]
    },
    rules: {
      checkIn: "2:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Strict",
      smoking: false,
      pets: false,
      parties: false
    }
  }
];

export default rooms; 