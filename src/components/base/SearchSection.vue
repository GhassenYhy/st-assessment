<template>
  <n-card class="card">
    <h2>{{ props.headerTitle }}</h2>
    <n-divider />
    <n-space
      :style="{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'no-wrap',
      }"
    >
      <n-input
        v-model:value="inputValue"
        ref="refInput"
        type="text"
        placeholder="Search"
        @input="inputCheck"
      />
      <n-button :disabled="showPrompt" @click="search">Search</n-button>
      <n-button type="warning" @click="clearSearch"> Reset </n-button>
    </n-space>
    <n-alert
      class="autocomplete-alert"
      v-show="showPrompt"
      title="At least 3 characters"
      type="warning"
    >
    </n-alert>
    <n-menu
      class="autocomplete-list"
      v-show="!showPrompt && menuOptions.length && inputValue"
      :options="menuOptions"
      @update:value="updateList"
    />
    <n-divider />

    <n-table v-if="props.list.length" :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th
            v-for="(tableHeader, indexTableHeader) in props.tableHeaders"
            :key="indexTableHeader"
          >
            {{ tableHeader }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, indexList) in props.list" :key="indexList">
          <template v-if="typeof item === 'object'">
            <td v-for="(value, name, index) in item" :key="`${name}_${index}`">
              {{ value }}
            </td>
          </template>
          <template v-else-if="typeof item === 'string'">
            <td>
              {{ item }}
            </td>
          </template>
        </tr>
      </tbody>
    </n-table>

    <n-result v-else status="404" title="No matching results"> </n-result>
  </n-card>
</template>

<script lang="ts" setup>
import {
  withDefaults,
  defineProps,
  ref,
  defineEmits,
  computed,
  onMounted,
  nextTick,
} from "vue";
import { IListType } from "@/types/common";
import { debounce } from "lodash";

interface Props {
  list: string[] | IListType[];
  autocompleteList: string[];
  focusedInput?: boolean;
  headerTitle?: string;
  tableHeaders: string[];
}
const props = withDefaults(defineProps<Props>(), {
  title: "",
  placeholder: "",
  focusedInput: false,
  headerTitle: "",
});

const refInput = ref(null);

const emit = defineEmits<{
  (e: "updateAutocompleteList", query: string): void;
  (e: "updateList", element: string): void;
  (e: "clearSearch"): void;
  (e: "search", query: string): void;
}>();

const showPrompt = ref<boolean>(false);
const inputValue = ref<string>("");

const menuOptions = computed(() =>
  props.autocompleteList.map((element) => {
    if (typeof element === "object") {
      return {
        label: `${element.title} - ${element.author}`,
        key: element.title,
      };
    } else {
      return {
        label: element,
        key: element,
      };
    }
  })
);

const inputCheck = debounce(() => {
  showPrompt.value = true;
  if (inputValue.value.length > 2) {
    showPrompt.value = false;
    emit("updateAutocompleteList", inputValue.value);
  }
}, 300);

const updateList = (element: string) => {
  inputValue.value = element;
  emit("updateList", element);
};

const clearSearch = () => {
  inputValue.value = "";
  emit("clearSearch");
};

const search = () => {
  emit("search", inputValue.value);
  emit("updateAutocompleteList", "");
};

onMounted(() => {
  nextTick(() => {
    if (props.focusedInput) {
      refInput.value.focus();
    }
  });
});
</script>

<style scoped>
.card {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  max-width: 500px;
}

.autocomplete-list {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.autocomplete-alert {
  margin-top: 15px;
}
</style>
