<template>
  <div class="mx-auto max-w-4xl space-y-6">
    <PvCard>
      <template #title>Products</template>
      <template #content>
        <PvMessage v-if="error" severity="error" class="mb-4">
          <template #icon>
            <FontAwesomeIcon icon="exclamation-triangle" />
          </template>
          <div>
            <p class="font-semibold">Failed to load products</p>
            <p class="text-sm mt-1">{{ error }}</p>
            <PvButton 
              label="Retry" 
              severity="secondary" 
              size="small" 
              class="mt-2" 
              @click="fetchProducts"
            >
              <FontAwesomeIcon icon="refresh" class="mr-2" />
              Retry
            </PvButton>
          </div>
        </PvMessage>

        <div v-else-if="loading" class="flex relative">
          <PvProgressSpinner />
        </div>
        
        <PvDataTable v-else :value="products" striped-rows>
          <PvColumn field="image" header="" class="w-20">
            <template #body="{ data }">
              <img 
                :src="data.image" 
                :alt="data.title"
                class="w-16 h-16 object-cover"
                @error="handleImageError"
              />
            </template>
          </PvColumn>
          <PvColumn field="title" header="Name" />
          <PvColumn field="price" header="Price">
            <template #body="{ data }">
              {{ data.price.toFixed(2) }}
            </template>
          </PvColumn>
          <PvColumn header="Add to Basket">
            <template #body="{ data }">
              <div class="flex gap-4 justify-center">
                <PvButton label="Increment" severity="secondary" @click="addProduct(data.id)">
                  <FontAwesomeIcon icon="plus" />
                </PvButton>
                <PvButton label="Decrement" severity="secondary" @click="addProduct(data.id, -1)" :disabled="getProductQuantity(data.id) <= 0">
                  <FontAwesomeIcon icon="minus" />
                </PvButton>
              </div>
            </template>
          </PvColumn>
        </PvDataTable>
      </template>
    </PvCard>
     <PvCard>
      <template #title>
        <div class="flex items-center gap-2">
          <FontAwesomeIcon icon="cart-shopping" />
          Basket
        </div>
      </template>
      <template #content>
        <PvMessage v-if="!basket?.length" severity="secondary">
          <template #icon>
            <FontAwesomeIcon icon="warning" />
          </template>
          <span>Your basket is empty.</span>
        </PvMessage>
        <BasketSmall v-else :items="basket" :products="products" @remove-product="removeProduct" />
      </template>
    </PvCard>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import BasketSmall from './BasketSmall.vue';
import { fetchProducts as apiFetchProducts } from '../api/api.ts';

const products = ref([]);
const basket = ref([]);
const loading = ref(false);
const error = ref(null);

async function fetchProducts() {
  loading.value = true;
  error.value = null;
  
  try {
    const data = await apiFetchProducts(8);

    products.value = data;
  } catch (err) {
    error.value = err.message || 'An unknown error occurred';
  }

  loading.value = false;
}

function handleImageError(event) {
  event.target.textContent = 'Image not available';
}

function getProductQuantity(id) {
  const item = basket.value.find(x => x.id === id);
  return item ? item.quantity : 0;
}

function addProduct(id, quantity = 1) {
  const existingItem = basket.value.find((x) => x.id === id);

  if (existingItem) {
    existingItem.quantity += quantity;

    if (existingItem.quantity <= 0) {
      removeProduct(id);
    }
  } else if (quantity > 0) {
    basket.value.push({ id, quantity });
  }
}

function removeProduct(id) {
  const index = basket.value.findIndex((x) => x.id === id);

  if (index !== -1) {
    basket.value.splice(index, 1);
  }
}

onMounted(() => {
  fetchProducts();
});
</script>
