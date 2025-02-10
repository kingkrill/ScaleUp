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

    // Pricing Plans
    plans: {
        hotDesk: {
            id: 'hot-desk',
            name: 'Hot Desk',
            price: 6999,
            duration: 'month',
            features: [
                'Flexible seating',
                'High-speed internet',
                'Access to common areas',
                '8 hrs/day access',
                '2 meeting room hrs/month'
            ]
        },
        dedicatedDesk: {
            id: 'dedicated-desk',
            name: 'Dedicated Desk',
            price: 11999,
            duration: 'month',
            features: [
                'Fixed desk space',
                '24/7 access',
                'Storage locker',
                '5 meeting room hrs/month',
                'Mail handling'
            ]
        },
        privateOffice: {
            id: 'private-office',
            name: 'Private Office',
            price: 21999,
            duration: 'month',
            features: [
                'Private office space',
                '24/7 access',
                '10 meeting room hrs/month',
                'Customizable space',
                'All premium amenities'
            ]
        }
    },

    // Contact Information
    contact: {
        phone: '+91 98765 43210',
        email: 'hello@scaleup.com',
        support: 'support@scaleup.com',
        workingHours: {
            weekdays: '9:00 AM - 6:00 PM',
            weekends: 'Closed'
        },
        social: {
            facebook: 'https://facebook.com/scaleup',
            twitter: 'https://twitter.com/scaleup',
            instagram: 'https://instagram.com/scaleup',
            linkedin: 'https://linkedin.com/company/scaleup'
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
        debug: process.env.NODE_ENV !== 'production',
        apiMock: process.env.NODE_ENV === 'development',
        logLevel: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
    }
};

export default config;