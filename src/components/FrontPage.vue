<template>
  <div class="mx-auto max-w-4xl space-y-6">
    <PvCard>
      <template #title>Products</template>
      <template #content>
        <PvDataTable :value="products" striped-rows>
          <PvColumn field="title" header="Name" />
          <PvColumn field="price" header="Price">
            <template #body="{ data }">
              {{ data.price.toFixed(2) }}
            </template>
          </PvColumn>
          <PvColumn header="Add to Basket" class="flex gap-4">
            <template #body="{ data }">
              <PvButton label="Increment" severity="secondary" @click="addProduct(data.id)">
                <FontAwesomeIcon icon="plus" />
              </PvButton>
              <PvButton label="Decrement" severity="secondary" @click="addProduct(data.id, -1)" :disabled="getProductQuantity(data.id) <= 0">
                <FontAwesomeIcon icon="minus" />
              </PvButton>
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
import { ref } from 'vue';
import BasketSmall from './BasketSmall.vue';
import { Message } from 'primevue';

const products = ref([
  { id: 0, title: 'Banana', price: 1.2 },
  { id: 1, title: 'Orange', price: 2.5 },
  { id: 2, title: 'Tomato', price: 1.6 },
  { id: 3, title: 'Flour', price: 5.0 },
]);

const basket = ref([]);
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
</script>
