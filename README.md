# Paywall Mobile App

Русская версия [README.ru.md](https://github.com/Empty-Developer/Paywall-Mobile-App/blob/developer/README.ru.md)



A React Native / Expo template demonstrating a complete paywall onboarding flow: **Onboarding -> Paywall -> Main content**. State is persisted locally so the flow survives app restarts. Purchase logic is currently simulated and ready to be wired up to a real payment provider.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Expo 56 / React Native 0.85 |
| Language | TypeScript 6 |
| Routing | Expo Router (file-based) |
| State persistence | AsyncStorage |
| Animation | React Native Reanimated 4 |
| Icons | Lucide React Native |
| Package manager | Bun |

---

## Architecture

Navigation is driven entirely by subscription state there are no separate routes for each screen. The single root route (`src/app/index.tsx`) reads from `SubscriptionContext` and renders the appropriate screen:

```
App Launch
    │
    ├── isLoading  ->  Loading spinner
    │
    ├── isPremium  ->  MainScreen
    │
    ├── hasSeenOnboarding  ->  PaywallScreen
    │
    └── (default)  ->  OnboardingScreen
```

**Why state-based instead of route-based?** The flow is strictly linear with no back-navigation, so routing would add complexity without benefit. See the comment in `src/app/index.tsx`.

### Subscription state

`SubscriptionContext` (`src/context/SubscriptionContext.tsx`) is the single source of truth for user status. It manages two booleans:

- `isPremium` : whether the user has purchased a subscription
- `hasSeenOnboarding` : whether the user has completed onboarding

Both are persisted via `AsyncStorage` so the correct screen is shown immediately on re-launch.

| Method | What it does |
|---|---|
| `completeOnboarding()` | Marks onboarding as seen, advances to Paywall |
| `purchaseSubscription()` | Marks user as premium, advances to Main |
| `resetSubscription()` | Clears both keys  useful for dev/testing |

---

## Project Structure

```
mobile/
├── app.json                  # Expo config (name, icons, plugins)
├── package.json              # Dependencies
├── assets/
│   └── images/               # App icon, logo, onboarding & profile images
└── src/
    ├── app/
    │   ├── _layout.tsx       # Root layout: SubscriptionProvider + splash screen
    │   └── index.tsx         # Entry point conditional screen renderer
    ├── context/
    │   └── SubscriptionContext.tsx   # Global subscription state + AsyncStorage
    ├── screens/
    │   ├── OnboardingScreen.tsx      # Multi-step onboarding (paginated)
    │   ├── PaywallScreen.tsx         # Plan selection + purchase CTA
    │   └── MainScreen.tsx            # Premium content (profile grid)
    └── components/
        └── ui/
            ├── Button.tsx            # Primary CTA button
            ├── CustomText.tsx        # Typed text component (title, skip, body)
            ├── TariffCard.tsx        # Selectable pricing plan card
            └── ProfileCard.tsx       # User profile tile (avatar + username)
```

---

## Getting Started

```bash
cd mobile
bun install
bunx expo start
```

Open in:
- **iOS Simulator** : press `i`
- **Android Emulator** : press `a`
- **Expo Go** : scan the QR code

To reset the subscription state (return to onboarding), call `resetSubscription()` from any screen that has access to the context, or clear AsyncStorage manually.

---

## Key Design Decisions

**State-driven screen routing** : A single index route conditionally renders one of three screens. Avoids unnecessary navigation stack complexity for a linear, non-reversible flow.

**AsyncStorage for persistence** : Keeps the simulator/device state intact across restarts without needing a backend. Currently used as a stub for real purchase receipts.

**Simulated purchase** : `PaywallScreen` uses a `setTimeout` to mimic async billing behavior. This is intentional scaffolding; swap it out for a real SDK call.

**Dark-first theme** : Background color `#18191B` is hardcoded throughout. A future improvement is to move this to a shared theme/token file.

---

## Next Steps / TODOs

- [ ] **Wire up real payments** : Integrate RevenueCat (or StoreKit/Billing directly) in `purchaseSubscription()`. The context interface is already designed for an async call.
- [ ] **Add restore purchases** : Standard App Store requirement. The context has a `resetSubscription` hook that can be repurposed.
- [ ] **Extract theme tokens** : Move `#18191B` and other hardcoded values into a `constants/colors.ts` file.
- [ ] **Onboarding content** : Replace placeholder copy and images in `OnboardingScreen.tsx`'s `DATA` array with real content.
- [ ] **Error handling** : AsyncStorage calls currently swallow errors silently; surface them to the user.
- [ ] **Testing** : Add Jest unit tests for `SubscriptionContext` state transitions and screen rendering logic.
