import { redirect } from 'next/navigation';
import { ROUTES } from '@/core/config';

// Redirect /allorders to /orders for backend compatibility
export default function AllOrdersPage() {
  redirect(ROUTES.ORDERS.LIST);
}
