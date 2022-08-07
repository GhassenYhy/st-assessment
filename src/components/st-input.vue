<template>
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
      :placeholder="props.placeholder"
      @input="inputCheck"
    />
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
</template>

<script lang="ts" setup>
// Imports
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

// Props
interface Props {
  list: string[] | IListType[];
  autocompleteList: string[];
  placeholder?: string;
  focusedInput?: boolean;
  modelValue: string;
}
const props = withDefaults(defineProps<Props>(), {
  placeholder: "Search",
  focusedInput: false,
});

// Emits
const emit = defineEmits<{
  (e: "updateAutocompleteList", query: string): void;
  (e: "updateList", element: string): void;
  (e: "update:modelValue", element: string): void;
}>();

// Data properties
const refInput = ref(null);
const showPrompt = ref<boolean>(false);
const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit("update:modelValue", value);
  },
});
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

// Methods
const inputCheck = debounce(() => {
  showPrompt.value = true;
  console.log(inputValue.value);
  if (inputValue.value.length > 2) {
    showPrompt.value = false;
    emit("updateAutocompleteList", inputValue.value);
    emit("update:modelValue", inputValue.value);
  }
}, 300);

const updateList = (element: string) => {
  inputValue.value = element;
  emit("updateList", element);
};

// Lifecycle hooks
onMounted(() => {
  // Autofocus on input check when the component is mounted
  nextTick(() => {
    if (props.focusedInput) {
      refInput.value.focus();
    }
  });
});
</script>

<style scoped>
.autocomplete-list {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.autocomplete-alert {
  margin-top: 15px;
}
</style>
