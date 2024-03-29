export default [
  {
    name: "Dashboard",
    to: "/",
    icon: "bx bx-home-circle",
  },
  {
    name: "Admin User management",
    to: "adminManagement",
    icon: "bi bi-person",
  },
  //     {
  //             name:"Manufacturer",
  //             to:"/makeManagement",
  //             icon:"bi bi-ev-front"
  //     },

  {
    name: "Vehicles Management ",
    id: "vehiclesmanagement",
    to: "#",
    icon: "bi bi-ev-front",
    children: {
      isOpen: false,
      listArray: [
        { to: "manufacturer", name: "Manufacturer " },
        { to: "modelManagement", name: " Model" },
        { to: "vehicleCategoryManagement", name: "Vehicle Category" },
        { to: "vehicleTypeManagement", name: "Vehicle Type Management" },
        { to: "vehicleManagement", name: "Vehicle Management " },
      ],
    },
  },
  {
    name: "Availability Management",
    id: "availabilitymanagement",
    to: "#",
    icon: "bi bi-calendar-check",
    children: {
      isOpen: false,
      listArray: [
        { to: "countryManagement", name: "Country Management " },
        { to: "stateManagement", name: "State Management" },
        { to: "cityManagement", name: "City Management" },
        { to: "pinCodeMapping", name: "Pin Code Mapping" },
      ],
    },
  },
  {
    name: "Fare Management",
    id: "faremanagement",
    to: "#",
    icon: "bi bi-cash",
    children: {
      isOpen: false,
      listArray: [
        { to: "individualFareManagement", name: "Fare " },
        { to: "rentalFareManagement", name: " Rental" },
        { to: "rentalPackage", name: "Packages" },
        { to: "tollManagement", name: "Toll management" },
      ],
    },
  },

  {
    name: "Promoton Management",
    id: "promotonmanagement",
    to: "#",
    icon: "bi bi-megaphone",
    children: {
      isOpen: false,
      listArray: [
        { to: "promotionManagement", name: "Promotion" },
        { to: "promoCodeManagement", name: "Promocode Management" },
        {
          to: "rentalPromotionManagement",
          name: "Rental Promotion Management",
        },
        { to: "referralManagement", name: "Referral Management" },
      ],
    },
  },
  {
    name: "Notification Management",
    id: "notificationmanagement",
    to: "#",
    icon: "bi bi-bell",
    children: {
      isOpen: false,
      listArray: [
        { to: "notificationToRider", name: "Notification to Rider" },
        {
          to: "notificationToDriver",
          name: "Notification to Driver",
        },
      ],
    },
  },
  {
    name: "Tampled ",
    id: "tampled",
    to: "#",
    icon: "bi bi-envelope-at",
    children: {
      isOpen: false,
      listArray: [
        { to: "emailTemplate", name: "Email Management" },
        { to: "smsTemplate", name: "SMS Management" },
      ],
    },
  },
  {
    name: "Setting Mangement",
    id: "settingmangement",
    to: "#",
    icon: "bi bi-gear",
    children: {
      isOpen: false,
      listArray: [
        { to: "setting", name: "Setting" },
        { to: "sosService", name: "SOS Management" },
        { to: "pageManagement", name: "Page Management" },
      ],
    },
  },
  {
    name: "Transaction",
    id: "transaction",
    to: "#",
    icon: "bi bi-cash-coin",
    children: {
      isOpen: false,
      listArray: [
        { to: "adminTransactionManagement", name: "Transaction" },
        { to: "driverPayoutManagement", name: "Driver Payout Management" },
        { to: "taxManagement", name: "Tax Management" },
      ],
    },
  },

  {
    name: "Booking Management",
    to: "bookingManagement",
    icon: "bi bi-cursor",
  },
  //     {
  //             name:"Fare Management",
  //             to:"/individualFareManagement",
  //             icon:"bi bi-cash"
  //     },
  //     {
  //             name:"Rental Fare Management",
  //             to:"/rentalFareManagement",
  //             icon:"bi bi-cash-stack"
  //     },
  //     {
  //             name:"Rental Package Management",
  //             to:"/rentalPackage",
  //             icon:"bi bi-basket2"
  //     },
  //     {
  //             name:"Outstation Fare Management",
  //             to:"/"
  //     },
  //     {
  //             name:"Outstation Oneway Management",
  //             to:"/"
  //     },
  //     {
  //             name:"Setting Management",
  //             to:"/setting",
  //             icon:"bi bi-gear"
  //     },
  //     {
  //             name:"Page Management",
  //             to:"/pageManagement",
  //             icon:"bi bi-file-earmark"
  //     },
  {
    name: "Rider Management",
    to: "riderManagement",
    icon: "bi bi-people",
  },
  {
    name: "Driver Management",
    to: "driverManagement",
    icon: "bi bi-person-rolodex",
  },
  //     {
  //             name:"Vehicle Management",
  //             to:"/vehicleManagement",
  //             icon:"bi bi-bicycle"
  //     },
  //     {
  //             name:"Email Management",
  //             to:"/emailTemplate",
  //             icon:"bi bi-envelope-at"
  //     },
  //     {
  //             name:"SMS Management",
  //             to:"/smsTemplate",
  //             icon:"bi bi-chat-fill"
  //     },
  //     {
  //             name:"Promotion Management",
  //             to:"/promotionManagement",
  //             icon:"bi bi-megaphone"
  //     },
  //     {
  //             name:"Referral Management",
  //             to:"/referralManagement",
  //             icon:"bi bi-share"
  //     },
  //     {
  //             name:"Notification to Rider",
  //             to:"/notificationToRiderManagement",
  //             icon:"bi bi-bell"
  //     },
  //     {
  //             name:"Notification to Driver",
  //             to:"/notificationToDriverManagement",
  //             icon:"bi bi-bell"
  //     },
  //     {
  //             name:"Tax Management",
  //             to:"/taxManagement",
  //             icon:"bi bi-currency-dollar"
  //     },
  //     {
  //             name:"Tolls Management",
  //             to:"/tollManagement",
  //             icon:"bi bi-sign-stop"
  //     },
  //     {
  //             name:"Driver Payout Management",
  //             to:"/driverPayoutManagement",
  //             icon:"bi bi-cash-coin"
  //     },
  //     {
  //             name:"Transaction Management",
  //             to:"/adminTransactionManagement",
  //             icon:"bi bi-cash-coin"
  //     },
  // {
  //     name:"Promocode Management",
  //     to:"/promocodeManagement",
  //     icon:"bi bi-textarea-t"
  // },
  //     {
  //         name:"Rental Promocode Management",
  //         to:"/rentalPromocodeManagement",
  //         icon:"bi bi-textarea-t"
  //     },
  //     {
  //             name:"SOS Management",
  //             to:"/sosService",
  //             icon:"bi bi-hospital-fill"
  //     }
];
