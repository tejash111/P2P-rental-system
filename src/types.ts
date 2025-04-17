export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  dailyRate: number;
  image: string;
  owner: {
    id: string;
    name: string;
    rating: number;
  };
  available: boolean;
  similarItems?: Item[];
  aiRecommendation?: {
    suggestedPrice: number;
    confidence: number;
    reasoning: string;
  };
}

export interface RentalRequest {
  id: string;
  itemId: string;
  requesterId: string;
  status: 'pending' | 'approved' | 'rejected';
  startDate: Date;
  endDate: Date;
  totalAmount: number;
}

export interface AIRecommendation {
  suggestedPrice: number;
  confidence: number;
  reasoning: string;
}