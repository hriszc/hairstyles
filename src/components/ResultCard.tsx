import React from 'react';
import type { Recommendation } from '../lib/rules/engine';

export interface ResultCardProps {
  recommendation: Recommendation;
  onCopy?: (text: string) => void;
}

export default function ResultCard(_props: ResultCardProps) {
  throw new Error('Not implemented: ResultCard');
}

