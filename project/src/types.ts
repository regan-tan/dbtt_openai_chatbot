export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'completed';
  customerInfo: CustomerInfo;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
  preferences?: string[];
  orderHistory?: Order[];
}