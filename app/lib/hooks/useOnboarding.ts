'use client';

import { useTradeContext } from '@/app/context/TradeContext';
import { STORAGE_KEYS } from '../constants';

/**
 * Hook for managing first-time user onboarding experience
 * Detects new users and tracks onboarding progress
 */
export function useOnboarding() {
  const { trades, jsonBinConfig } = useTradeContext();

  // Check if this is a first-time user
  // A first-time user has: no trades, no JSONBin config, and hasn't dismissed welcome
  const isFirstTimeUser =
    typeof window !== 'undefined' &&
    trades.length === 0 &&
    !jsonBinConfig.apiKey &&
    !jsonBinConfig.binId &&
    !localStorage.getItem(STORAGE_KEYS.WELCOME_DISMISSED);

  // Check if user has seen the welcome screen before
  const hasSeenWelcome =
    typeof window !== 'undefined' &&
    localStorage.getItem(STORAGE_KEYS.WELCOME_DISMISSED) === 'true';

  // Check if user has connected JSONBin
  const isConnected = Boolean(jsonBinConfig.apiKey && jsonBinConfig.binId);

  // Mark that user has dismissed the welcome screen
  const markWelcomeDismissed = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.WELCOME_DISMISSED, 'true');
    }
  };

  // Mark that user has completed the onboarding process
  const markOnboardingComplete = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
    }
  };

  return {
    isFirstTimeUser,
    hasSeenWelcome,
    isConnected,
    markWelcomeDismissed,
    markOnboardingComplete,
  };
}
