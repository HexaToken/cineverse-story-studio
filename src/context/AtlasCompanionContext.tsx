import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNotification } from './NotificationContext';

export interface Recommendation {
  id: string;
  type: 'feature' | 'optimization' | 'content' | 'collaboration' | 'analytics';
  title: string;
  message: string;
  action?: {
    label: string;
    href?: string;
    callback?: () => void;
  };
  read: boolean;
  createdAt: string;
}

export interface AtlasCompanionContextType {
  recommendations: Recommendation[];
  unreadCount: number;
  isEnabled: boolean;
  showRecommendations: (context: string) => void;
  markAsRead: (id: string) => void;
  dismissRecommendation: (id: string) => void;
  toggleCompanion: (enabled: boolean) => void;
  getSmartTip: (context: string) => string;
}

const AtlasCompanionContext = createContext<AtlasCompanionContextType | undefined>(undefined);

const smartTips: Record<string, string[]> = {
  create: [
    'Try using the AI Assistant to generate story concepts and character descriptions!',
    'Did you know? You can remix other universes while giving credits to original creators.',
    'Enable collaborative mode to invite team members to help develop your universe.',
    'Use tags to make your universe more discoverable by other creators.',
  ],
  dashboard: [
    'Check your analytics dashboard to understand what content resonates with your audience.',
    'Monetization is available! Set your revenue sharing preferences in settings.',
    'Collaborate with other creators by inviting them to your projects.',
  ],
  discover: [
    'Explore the 3D universe map to find hidden gems and trending universes!',
    'Use advanced filters to find content matching your interests.',
    'Follow your favorite creators to get notified about their new universes.',
  ],
  explore: [
    'The 3D map lets you visualize relationships between universes and creators.',
    'Try different view modes (Universe, Creator, Genre) to explore in new ways.',
    'Use filters to narrow down to your favorite genres and top-rated content.',
  ],
};

const recommendations: Recommendation[] = [
  {
    id: 'rec_1',
    type: 'feature',
    title: 'Discover the Remix System',
    message: 'Create your own version of existing universes while giving credit to original creators.',
    action: {
      label: 'Learn More',
      href: '/learn/remix',
    },
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rec_2',
    type: 'collaboration',
    title: 'Start Collaborating',
    message: 'Invite team members to help develop your universes and manage projects together.',
    action: {
      label: 'Invite Collaborators',
      href: '/collaboration',
    },
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rec_3',
    type: 'analytics',
    title: 'Understand Your Audience',
    message: 'Check your analytics to see how viewers engage with your content.',
    action: {
      label: 'View Analytics',
      href: '/dashboard/analytics',
    },
    read: false,
    createdAt: new Date().toISOString(),
  },
];

export const AtlasCompanionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { recommend } = useNotification();
  const [companionRecommendations, setRecommendations] = useState<Recommendation[]>(recommendations);
  const [isEnabled, setIsEnabled] = useState(true);

  const unreadCount = companionRecommendations.filter(r => !r.read).length;

  const showRecommendations = useCallback(
    (context: string) => {
      if (!isEnabled) return;

      // Show a smart tip
      const tips = smartTips[context] || smartTips['discover'];
      const randomTip = tips[Math.floor(Math.random() * tips.length)];

      recommend(
        '💡 Atlas Tip',
        randomTip,
        {
          label: 'Got it',
          onClick: () => {},
        }
      );
    },
    [isEnabled, recommend]
  );

  const markAsRead = useCallback((id: string) => {
    setRecommendations(prev =>
      prev.map(r => (r.id === id ? { ...r, read: true } : r))
    );
  }, []);

  const dismissRecommendation = useCallback((id: string) => {
    setRecommendations(prev => prev.filter(r => r.id !== id));
  }, []);

  const toggleCompanion = useCallback((enabled: boolean) => {
    setIsEnabled(enabled);
  }, []);

  const getSmartTip = useCallback((context: string): string => {
    const tips = smartTips[context] || smartTips['discover'];
    return tips[Math.floor(Math.random() * tips.length)];
  }, []);

  return (
    <AtlasCompanionContext.Provider
      value={{
        recommendations: companionRecommendations,
        unreadCount,
        isEnabled,
        showRecommendations,
        markAsRead,
        dismissRecommendation,
        toggleCompanion,
        getSmartTip,
      }}
    >
      {children}
    </AtlasCompanionContext.Provider>
  );
};

export const useAtlasCompanion = () => {
  const context = useContext(AtlasCompanionContext);
  if (context === undefined) {
    throw new Error('useAtlasCompanion must be used within an AtlasCompanionProvider');
  }
  return context;
};
