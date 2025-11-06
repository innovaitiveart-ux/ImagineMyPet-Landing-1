// FIX: Add React import for React.ComponentType
import React from 'react';

export interface ArtStyle {
  id: string;
  name: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  image: string;
}

export interface UspItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
