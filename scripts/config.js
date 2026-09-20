/**
 * Configuration Settings for ScaleUp Coworking Website
 */

const config = {
    // Site Information
    site: {
        name: 'ScaleUp Coworking',
        domain: 'scaleup.com',
        description: 'Premium coworking spaces in Pune',
        version: '1.0.0'
    },

    // API Endpoints
    api: {
        baseUrl: 'https://api.scaleup.com/v1',
        endpoints: {
            contact: '/contact',
            booking: '/bookings',
            newsletter: '/newsletter',
            locations: '/locations',
            plans: '/plans',
            reviews: '/reviews'
        },
        timeout: 8000, // 8 seconds
        retryAttempts: 3
    },

    // Location Details
    locations: {
        deccan: {
            id: 'deccan-office',
            name: 'Deccan Office',
            address: '123 FC Road, Deccan Gymkhana',
            city: 'Pune',
            state: 'Maharashtra',
            pincode: '411004',
            coordinates: {
                lat: 18.5204,
                lng: 73.8567
            },
            capacity: {
                hotDesks: 100,
                dedicatedDesks: 50,
                privateOffices: 10,
                meetingRooms: 5,
                eventSpace: 1
            },
            amenities: [
                'High-speed Internet',
                'Meeting Rooms',
                'Cafeteria',
                'Parking',
                '24/7 Access',
                'Reception'
            ]
        },
        lawCollege: {
            id: 'law-college-office',
            name: 'Law College Road Office',
            address: '456 Law College Road',
            city: 'Pune',
            state: 'Maharashtra',
            pincode: '411004',
            coordinates: {
                lat: 18.5167,
                lng: 73.8315
            },
            capacity: {
                hotDesks: 150,
                dedicatedDesks: 75,
                privateOffices: 15,
                meetingRooms: 8,
                eventSpace: 2
            },
            amenities: [
                'High-speed Internet',
                'Meeting Rooms',
                'Cafeteria',
                'Parking',
                '24/7 Access',
                'Reception',
                'Game Room'
            ]
        }
    },

    // Pricing Plans (Uniform across centers)
    plans: {
        privateOffice: {
            id: 'private-office',
            name: 'Private Office',
            price: 10900,
            duration: 'seat / month',
            features: [
                'Private lockable office space',
                '24/7 access & biometric entry',
                'Conference room hours included',
                'Customizable layouts & branding',
                'All premium utilities & high-speed internet'
            ]
        },
        dedicatedDesk: {
            id: 'dedicated-desk',
            name: 'Dedicated Cowork Desk',
            price: 7950,
            duration: 'seat / month',
            features: [
                'Fixed reserved desk space',
                '24/7 access & locker storage',
                'High-speed internet with static IP options',
                'Conference room credits',
                'Unlimited artisan bean coffee & tea'
            ]
        },
        hybridCowork: {
            id: 'hybrid-cowork',
            name: 'Hybrid Cowork',
            price: 5850,
            duration: 'seat / month (12 days/mo)',
            features: [
                '12 days flexible access per month',
                'Ergonomic workstation seating',
                'High-speed Wi-Fi & power backup',
                'Full pantry & café lounge access',
                'Meeting room access at member rates'
            ]
        },
        dayPass: {
            id: 'day-pass',
            name: 'Day Pass',
            price: 590,
            duration: 'day',
            features: [
                'Single-day flexible desk access',
                'Ultra-fast Wi-Fi access',
                'Complimentary bean coffee & tea',
                'Pantry & lounge access'
            ]
        },
        meetingSpace: {
            id: 'meeting-space',
            name: 'Meeting Space',
            price: 150,
            duration: 'seat / hour (min 4 seats)',
            features: [
                'High-res presentation display',
                'Whiteboard & stationery',
                'High-speed conference internet',
                'Beverage service'
            ]
        },
        meetingRoom4: {
            id: 'meeting-room-4',
            name: '4 Seater Meeting Room',
            price: 3900,
            duration: 'day',
            features: [
                'Full day booking for up to 4 guests',
                '4K display & presentation setup',
                'Whiteboard & high-speed Wi-Fi',
                'Beverage and pantry support'
            ]
        },
        meetingRoom9: {
            id: 'meeting-room-9',
            name: '9 Seater Meeting Room',
            price: 7950,
            duration: 'day (₹4,500 half day)',
            features: [
                'Full executive conference suite',
                'A/V presentation facilities',
                'High-speed fiber connectivity',
                'Full day or half day flexibility'
            ]
        },
        virtualOffice: {
            id: 'virtual-office',
            name: 'Virtual Office',
            price: 2490,
            duration: 'month (paid annually in advance)',
            features: [
                'Prime Pune business address for GST & ROC',
                'Mail & courier handling',
                'Client greeting at reception',
                'Discounted meeting room access'
            ]
        }
    },

    // Contact Information
    contact: {
        phone: '+91 98222 68333',
        whatsapp: '+91 98222 68333',
        email: 'scaleup.cowork@gmail.com',
        support: 'scaleup.cowork@gmail.com',
        workingHours: {
            weekdays: '9:00 AM - 7:00 PM',
            weekends: '10:00 AM - 5:00 PM'
        },
        social: {
            facebook: 'https://facebook.com/scaleupcoworking',
            twitter: 'https://twitter.com/scaleupcowork',
            instagram: 'https://instagram.com/scaleupcoworking',
            linkedin: 'https://linkedin.com/company/scaleupcoworking'
        }
    },

    // Animation Settings
    animations: {
        scrollReveal: {
            distance: '50px',
            duration: 1000,
            interval: 100,
            opacity: 0
        },
        counter: {
            duration: 2000,
            easing: 'easeOutExpo'
        },
        carousel: {
            autoplay: true,
            delay: 5000,
            loop: true
        }
    },

    // Theme Settings
    theme: {
        colors: {
            primary: '#4f46e5',
            secondary: '#64748b',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            info: '#06b6d4'
        },
        darkMode: {
            primary: '#818cf8',
            background: '#0f172a',
            text: '#f8fafc'
        }
    },

    // Form Validation Rules
    validation: {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        phone: {
            required: true,
            pattern: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
        },
        message: {
            required: true,
            minLength: 10,
            maxLength: 500
        }
    },

    // File Upload Constraints
    upload: {
        maxFileSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
        maxFiles: 5
    },

    // Cache Settings
    cache: {
        version: '1.0',
        duration: 7 * 24 * 60 * 60 * 1000, // 7 days
        prefix: 'scaleup_'
    },

    // Analytics Configuration
    analytics: {
        googleAnalytics: 'UA-XXXXXXXXX-X',
        hotjar: '0000000',
        mixpanel: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },

    // Feature Flags
    features: {
        darkMode: true,
        virtualTour: true,
        onlineBooking: true,
        reviews: true,
        newsletter: true,
        chat: false
    },

    // Development Settings
    development: {
        debug: false,
        apiMock: false,
        logLevel: 'error'
    }
};

export default config;