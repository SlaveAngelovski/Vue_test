export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export async function fetchProducts(limit: number = 8): Promise<Product[]> {
  try {
    const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
    
    return handleResponse(response);
  } catch (error) {
    throw new Error(`Network error: ${error.message}`);
  }
}

function handleResponse(response: Response): Promise<Product[]> {
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}