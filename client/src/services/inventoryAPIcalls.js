import { API_URL } from './config';

export async function getInventoryList() {
  const response = await fetch(`${API_URL}/`, {
    method: 'GET',
  });
  return response.json();
}

export async function getInventoryItem(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'GET',
  });
  return response.json();
}

// totalIncomingQty, incomingDates,
export async function createInventoryItem(
  sku,
  brand,
  productName,
  description,
  inStock,
  reorderAt,
  orderQty,
  totalIncomingQty
) {
  const response = await fetch(`${API_URL}/`, {
    method: 'POST',
    body: JSON.stringify({
      sku,
      brand,
      productName,
      description,
      inStock,
      reorderAt,
      orderQty,
      totalIncomingQty,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export async function updateInventoryItem(id, updates) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      updates,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export async function deleteInventoryItem(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
