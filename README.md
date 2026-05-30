# MIFX Mobile Technical Assignment

A React Native (Expo) mobile application built for the MIFX technical assessment.

## Preview

<p style="text-align: center;">
  <img src="assets/screenshots/login.png" width="30%" alt="Login Screen" />
  <img src="assets/screenshots/otp.png" width="30%" alt="OTP Screen" />
  <img src="assets/screenshots/market.png" width="30%" alt="Market Screen" />
</p>

## Features

### Authentication

* Login using Email & Password
* Login using Mobile Number & Password
* Country Code Picker from API
* OTP Verification for Mobile Login
* Session Persistence using AsyncStorage
* Auto Login when token exists
* Logout functionality

### Market

* Fetch market data from API
* Search cryptocurrency by name or symbol
* Filter:
  * All
  * Cryptocurrency
  * Favorite
* Responsive list rendering using FlatList

### Navigation

* React Navigation
* Native Stack Navigation
* Bottom Tab Navigation
  * Markets
  * Services

### Services

* Placeholder screen for future features

---

# Tech Stack

## Core

* React Native
* Expo SDK
* TypeScript

## Navigation

* React Navigation
* Native Stack Navigator
* Bottom Tab Navigator

## State Management

* React Context
* useReducer

## Networking

* Axios

## Storage

* AsyncStorage

---

# Architecture

A lightweight Clean Architecture approach was used to keep the codebase scalable and maintainable.

```text
src
│
├── api
│   ├── axios.ts
│   └── endpoints.ts
│
├── components
│   ├── AppButton.tsx
│   ├── AppInput.tsx
│   ├── CountryCode.tsx
│   ├── CountryPickerModal.tsx
│   ├── SearchInput.tsx
│   ├── CategoryChip.tsx
│   ├── CryptoCard.tsx
│   └── EmptyState.tsx
│
├── context
│   ├── authContext.tsx
│   ├── authProvider.tsx
│   ├── authReducer.ts
│   └── authTypes.ts
│
├── navigation
│   ├── AppNavigator.tsx
│   └── MainTabs.tsx
│
├── screens
│   ├── LoginScreen.tsx
│   ├── OtpScreen.tsx
│   ├── MarketScreen.tsx
│   └── ServiceScreen.tsx
│
├── services
│   ├── authService.ts
│   ├── countryService.ts
│   └── marketServices.ts
│
├── theme
│   └── colors.ts
│
├── types
│   ├── crypto.ts
│   ├── country.ts
│   └── navigation.ts
│
└── utils
    ├── storage.ts
    ├── countryFlags.ts
    ├── constants.ts
    └── mockCrypto.ts
```

---

# Authentication Flow

## Email Login

```text
Login
 ↓
Market
```

Email authentication returns a valid token directly, therefore the user is redirected immediately to the Market screen.

## Mobile Login

```text
Login
 ↓
OTP Verification
 ↓
Market
```

OTP verification is required before accessing the application.

---

# Session Management

Token is stored locally using AsyncStorage.

```text
App Launch
 ↓
Check Stored Token
 ↓
Token Exists?
 ├─ Yes → Main Tabs
 └─ No  → Login
```

---

# Market Filters

### All

Displays all market assets.

### Cryptocurrency

Displays only assets with:

```json
{
  "type": "cryptocurrency"
}
```

### Favorite

Displays only assets with:

```json
{
  "isFavorite": true
}
```

---

# Installation

Clone repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npx expo start
```

Run Android:

```bash
a
```

or scan QR Code using Expo Go.

---

# Environment

This project was developed and tested using:

* Node.js 22+
* Expo SDK 56
* React Native 0.83+
* Android Studio
* Android 14

---

# Design Decisions

### Why React Context + useReducer?

The application requirements are relatively small and do not require additional state management libraries such as Redux. Context + useReducer provides a lightweight and maintainable solution.

### Why Axios?

Axios provides cleaner API handling, interceptors, and easier request configuration compared to the native Fetch API.

### Why AsyncStorage?

Used to persist authentication state and provide a seamless user experience through automatic login restoration.

### Why Expo?

Expo significantly reduces setup complexity and accelerates development for technical assignments while still supporting production-ready React Native development.

---

# Future Improvements

* Pull To Refresh on Market List
* Dark Mode
* Unit Testing
* API Interceptors for Automatic Token Handling
* Skeleton Loading States
* Real-time Market Updates
* Profile Screen
* Notification Support

---

# Author

Joshua Keny Andriano

React Native / Flutter Developer
