import { useState, useEffect } from 'react';
import { STORAGE_KEYS, DEFAULT_WIDGET_ORDER } from '../constants';

export const useWidgetOrder = () => {
  const [widgetOrder, setWidgetOrder] = useState<string[]>(DEFAULT_WIDGET_ORDER);
  const [mounted, setMounted] = useState(false);

  // Load widget order from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEYS.WIDGET_ORDER);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setWidgetOrder(parsed);
      } catch (error) {
        console.error('Failed to parse widget order:', error);
        setWidgetOrder(DEFAULT_WIDGET_ORDER);
      }
    }
  }, []);

  // Save widget order to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEYS.WIDGET_ORDER, JSON.stringify(widgetOrder));
    }
  }, [widgetOrder, mounted]);

  const moveWidget = (fromIndex: number, toIndex: number) => {
    const newOrder = [...widgetOrder];
    const [movedWidget] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedWidget);
    setWidgetOrder(newOrder);
  };

  const moveWidgetUp = (widgetId: string) => {
    const index = widgetOrder.indexOf(widgetId);
    if (index > 0) {
      moveWidget(index, index - 1);
    }
  };

  const moveWidgetDown = (widgetId: string) => {
    const index = widgetOrder.indexOf(widgetId);
    if (index < widgetOrder.length - 1) {
      moveWidget(index, index + 1);
    }
  };

  const resetToDefault = () => {
    setWidgetOrder(DEFAULT_WIDGET_ORDER);
  };

  return {
    widgetOrder,
    moveWidgetUp,
    moveWidgetDown,
    resetToDefault,
    mounted,
  };
};
