/* @vitest-environment jsdom */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultCard from '../../src/components/ResultCard';
import type { Recommendation } from '../../src/lib/rules/engine';

const sample: Recommendation = {
  hairstyleName: '商务短发（Business Short Cut）',
  barberCard: {
    clipperGuard: '#2-3',
    topLengthCm: 4,
    parting: '侧分',
    texture: '自然质感',
  },
  outfits: [
    { category: 'top', name: '牛津纺衬衫', notes: '冷灰/海军蓝' },
    { category: 'bottom', name: '锥形休闲裤' },
    { category: 'shoes', name: '白色小白鞋' },
  ],
  colors: { palette: ['海军蓝', '冷灰', '白'], avoid: ['高饱和荧光色'] },
  scenarioTag: 'business-casual',
};

describe('ResultCard', () => {
  it('renders hairstyle name, barber card, and outfits list with copy action', () => {
    render(<ResultCard recommendation={sample} />);
    expect(screen.getByText(/商务短发/i)).toBeInTheDocument();
    expect(screen.getByText(/理发沟通卡/i)).toBeInTheDocument();
    expect(screen.getByText(/服饰清单/i)).toBeInTheDocument();
    expect(screen.getByText(/牛津纺衬衫/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /复制|copy/i })).toBeInTheDocument();
  });
});

