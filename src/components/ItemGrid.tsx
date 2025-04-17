import React from 'react';
import { ItemCard } from './ItemCard';
import { Item } from '../types';

interface ItemGridProps {
  items: Item[];
  onRentItem: (item: Item) => void;
  viewMode: 'grid' | 'list';
}

export function ItemGrid({ items, onRentItem, viewMode }: ItemGridProps) {
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onRent={onRentItem} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onRent={onRentItem} viewMode={viewMode} />
      ))}
    </div>
  );
}