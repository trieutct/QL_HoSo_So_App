<template>
  <el-card class="box-card">
    <p class="text-base font-bold">Thống kê người dùng theo vai trò</p>
    <VueApexCharts
      :height="chartHeight"
      :options="chartOptions"
      :series="chartSeries"
    >
    </VueApexCharts>
  </el-card>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";

import { useDashboardDocStore } from "../store/dashboard.store";
import { computed } from "vue";
const dashboardDocStore = useDashboardDocStore();
const userByRole = computed(() => dashboardDocStore.userByRole);
const chartSeries = computed(() => {
  return [
    {
      name: "Số lượng",
      data: userByRole.value.map((item: any) => item.count) || [],
    },
  ];
});

const chartHeight = ref(300);
const chartOptions = computed(() => {
  return {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: userByRole.value.map((item: any) => item.name) || [],
      labels: {
        show: true,
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    colors: ["#4764C3"],
  };
});
</script>
<style scoped>
.el-card {
  border-radius: 20px;
}
</style>
