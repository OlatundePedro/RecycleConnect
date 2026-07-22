# RecycleConnect

A React Native (Expo) mobile app that connects households with nearby waste collectors, enabling scheduled pickups and reward-based recycling.

## Stack

- **Framework**: React Native via Expo (SDK 54)
- **Routing**: Expo Router (file-based)
- **UI**: Custom components with Inter font family
- **State**: Local React state + router params between steps

## Screen Structure

```
app/
  index.jsx              → Splash / landing (Get Started / Log In)
  login.jsx              → Login (household or collector)
  create-account.jsx     → Sign-up (routes to dashboard based on user type)

  household/
    _layout.jsx          → Bottom tab navigator (Home, Pickup, Track, Wallet, Profile)
    home.jsx             → Dashboard: wallet, impact, schedule pickup, nearby collector
    pickup/
      _layout.jsx        → Stack navigator for 4-step flow
      index.jsx          → Step 1: Select materials
      address.jsx        → Step 2: Pickup address + map
      time.jsx           → Step 3: Date, time, photos, note
      confirm.jsx        → Step 4: Review + confirm
    track.jsx            → Active / completed pickups with live status
    wallet.jsx           → Balance, transactions, withdraw
    profile.jsx          → Account info, settings, logout

  collector/
    _layout.jsx          → Bottom tab navigator (Home, Jobs, Track, Earnings, Profile)
    home.jsx             → Dashboard: status toggle, nearby requests, earnings summary
    jobs.jsx             → Available / active / completed jobs
    track.jsx            → Live navigation to pickup location
    earnings.jsx         → Earnings chart, payout history, withdraw
    profile.jsx          → Account info, verification badges, settings
```

## Design Tokens

- Primary green: `#188A5A`
- Primary dark: `#10382F`
- Light green bg: `#EAF6F0`
- All colours centralised in `constants/colors.js`
- Typography: `constants/typography.js` (Inter font family)

## Running the App

```bash
npm install
npx expo start --web    # Web preview in browser
npx expo start          # QR code → scan with Expo Go on your phone
```

## User Preferences

- Keep all screens in the existing Expo Router file-based structure
- Use the `constants/colors.js` design tokens — no inline colour literals
- Two user types: **Household** and **Collector** — each with separate tab layouts
