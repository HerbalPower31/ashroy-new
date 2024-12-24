# Ashroy Homestay

A modern React-based website for Ashroy Homestay, a cozy accommodation in Tezpur, Assam. The website features a beautiful UI with room listings, online booking system, and responsive design.

## Features

- Modern and responsive design
- Room listings with detailed information
- Online booking system with date picker
- Beautiful image galleries
- Mobile-friendly navigation
- Contact information and social links
- Smooth animations and transitions

## Tech Stack

- React 18
- Material-UI (MUI)
- React Router v6
- Vite
- date-fns for date handling
- react-date-range for booking calendar

## Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ashroy-new
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Project Structure

```
ashroy-new/
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx  # Navigation bar
│   │   └── Footer.jsx  # Footer component
│   ├── pages/          # Page components
│   │   ├── Home.jsx    # Landing page
│   │   ├── Rooms.jsx   # Room listings
│   │   ├── RoomDetail.jsx  # Individual room view
│   │   └── Booking.jsx # Booking form
│   ├── data/           # Static data
│   │   └── rooms.js    # Room information
│   ├── theme.js        # MUI theme configuration
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
├── public/             # Static assets
└── package.json        # Project dependencies and scripts
```

## Features in Detail

### Home Page
- Hero section with welcome message
- Features section highlighting amenities
- About section with property information
- Call-to-action section for bookings

### Rooms Page
- Grid layout of available rooms
- Room cards with images and basic information
- Smooth hover effects
- Click through to detailed view

### Room Detail Page
- Large room images
- Detailed room information
- Amenities list
- Direct booking button
- Room specifications (size, capacity, etc.)

### Booking System
- Date range picker
- Guest information form
- Special requests field
- Form validation
- Booking confirmation

## Styling

The application uses Material-UI's theming system with a custom theme defined in `theme.js`. The color scheme is based on:

- Primary: `#0A4D3C` (Deep Green)
- Secondary: `#FFA726` (Orange)
- Background: White

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- Add authentication system
- Implement backend API
- Add payment gateway integration
- Add admin dashboard
- Implement review system
- Add more interactive features
- Enhance image gallery

## Contact

For any inquiries, please reach out to [contact information].

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the component library
- React team for the amazing framework
- All contributors who have helped shape this project  cannot see the updated features
