<template>
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
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from "vue";
import { IListType } from "@/types/common";

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
</script>

<style scoped></style>
