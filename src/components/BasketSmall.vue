<template>
  <div>
    <p class="mb-4 text-gray-600">
      Number of items in basket: {{ productCount }}
    </p>

    <PvDataTable :value="itemOverview" striped-rows>
      <PvColumn header="Image" class="w-20">
        <template #body="{ data }">
          <img 
            :src="data.image" 
            :alt="data.title"
            class="w-12 h-12 object-cover rounded border"
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
      <PvColumn field="quantity" header="Quantity" />
      <PvColumn header="Total">
        <template #body="{ data }">
          {{ data.total.toFixed(2) }}
        </template>
      </PvColumn>
      <PvColumn field="remove" headerStyle="width:3rem">
        <template #body="{ data }">
            <button severity="secondary" @click="emit('remove-product', data.id)">
              <FontAwesomeIcon icon="trash" class="opacity-50 hover:opacity-80 transition-opacity" />
            </button>
        </template>
      </PvColumn>
    </PvDataTable>

    <p :class="totalPriceStyling">
      Total price: {{ total.toFixed(2) }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  items: { type: Array, required: true },
  products: { type: Array, required: true },
});

const emit = defineEmits(['remove-product']);

const productCount = computed(() =>
  props.items.reduce((sum, item) => sum + item.quantity, 0),
);

const itemOverview = computed(() =>
  props.items.map((item) => {
    const product = props.products[item.id];
    return {
      id: item.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: item.quantity,
      total: item.quantity * product.price,
    };
  }),
);

const total = computed(() =>
  itemOverview.value.reduce((sum, item) => sum + item.total, 0),
);

const totalPriceStyling = computed(() => ({
  'mt-4 text-lg font-bold': true,
  'text-red-600': total.value > 50,
}));

function handleImageError(event) {
  event.target.textContent = 'Image not available';
}

</script>
