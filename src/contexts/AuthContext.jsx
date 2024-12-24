import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pendingPartners, setPendingPartners] = useState([
    {
      id: 3,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+919876543211",
      propertyName: "Mountain View Resort",
      propertyAddress: "123 Hill Road, Manali",
      propertyDescription: "A beautiful resort with mountain views",
      status: 'pending',
      submittedAt: "2024-02-15",
      documents: ['property_deed.pdf', 'business_license.pdf', 'id_proof.pdf']
    }
  ]);

  const [activeAdmins, setActiveAdmins] = useState([
    {
      id: 2,
      name: "John Smith",
      email: "partner@example.com",
      phone: "+919876543210",
      propertyName: "Smith's Villa by Ashroy",
      isActive: true,
      joinedDate: "2024-01-15",
      totalRooms: 3,
      totalBookings: 45,
      revenue: 125000,
      occupancyRate: 75,
      permissions: {
        manageRooms: true,
        manageBookings: true,
        viewAnalytics: true,
        manageAdmins: false,
        viewAllStats: false,
        viewAllCalendars: false
      },
      stats: {
        monthly: {
          bookings: [12, 15, 18, 20, 25, 30],
          revenue: [30000, 35000, 40000, 45000, 50000, 55000],
          occupancy: [65, 70, 75, 80, 85, 90]
        },
        rooms: [
          { id: 1, name: "Luxury Suite", bookings: 20, revenue: 50000 },
          { id: 2, name: "Garden View Room", bookings: 15, revenue: 35000 },
          { id: 3, name: "Family Room", bookings: 10, revenue: 40000 }
        ]
      }
    }
  ]);

  const login = (email, password) => {
    // Mock login - in a real app, this would make an API call
    if (email === 'admin@ashroy.com' && password === 'admin123') {
      setUser({
        id: 1,
        name: 'Ashroy Admin',
        email: 'admin@ashroy.com',
        type: 'parent',
        permissions: {
          manageRooms: true,
          manageBookings: true,
          viewAnalytics: true,
          manageAdmins: true,
          viewAllStats: true,
          viewAllCalendars: true
        }
      });
      return true;
    } else if (email === 'partner@example.com' && password === 'partner123') {
      const partnerAdmin = activeAdmins.find(admin => admin.email === email);
      if (partnerAdmin) {
        setUser({
          ...partnerAdmin,
          type: 'partner'
        });
        return true;
      }
    }
    return false;
  };

  const signupPartner = async (formData) => {
    // Mock signup - in a real app, this would make an API call
    const newPartner = {
      id: Date.now(),
      ...formData,
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setPendingPartners(prev => [...prev, newPartner]);
    return true;
  };

  const approvePartner = (partnerId) => {
    const partner = pendingPartners.find(p => p.id === partnerId);
    if (partner) {
      const newAdmin = {
        id: partner.id,
        name: partner.name,
        email: partner.email,
        phone: partner.phone,
        propertyName: partner.propertyName,
        isActive: true,
        joinedDate: new Date().toISOString().split('T')[0],
        totalRooms: 0,
        totalBookings: 0,
        revenue: 0,
        occupancyRate: 0,
        permissions: {
          manageRooms: true,
          manageBookings: true,
          viewAnalytics: true,
          manageAdmins: false,
          viewAllStats: false,
          viewAllCalendars: false
        },
        stats: {
          monthly: {
            bookings: [0, 0, 0, 0, 0, 0],
            revenue: [0, 0, 0, 0, 0, 0],
            occupancy: [0, 0, 0, 0, 0, 0]
          },
          rooms: []
        }
      };

      setActiveAdmins(prev => [...prev, newAdmin]);
      setPendingPartners(prev => prev.filter(p => p.id !== partnerId));
    }
    return true;
  };

  const rejectPartner = (partnerId) => {
    setPendingPartners(prev => prev.filter(p => p.id !== partnerId));
    return true;
  };

  const updateAdmin = (adminId, updatedData) => {
    setActiveAdmins(prev => prev.map(admin => 
      admin.id === adminId ? { ...admin, ...updatedData } : admin
    ));
  };

  const deleteAdmin = (adminId) => {
    setActiveAdmins(prev => prev.filter(admin => admin.id !== adminId));
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    pendingPartners,
    activeAdmins,
    login,
    logout,
    signupPartner,
    approvePartner,
    rejectPartner,
    updateAdmin,
    deleteAdmin,
    isAuthenticated: !!user,
    isParentAdmin: user?.type === 'parent',
    isPartnerAdmin: user?.type === 'partner'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 