<template>
  <div>
    <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="amount1" label="Amount 1" />
      <el-table-column prop="amount2" label="Amount 2" />
      <el-table-column prop="amount3" label="Amount 3" />
    </el-table>
  </div>
  <el-table :data="assets" :span-method="objectSpanMethod1" border style="width: 100%; margin-top: 20px">
    <el-table-column label="ID" width="180">
      <template #default="scope">
        {{ scope.row.asset.id }}
      </template>
    </el-table-column>
    <el-table-column prop="NameGroup" label="NameGroup" width="180">
      <template #default="scope">
        {{ scope.row.asset.kpiCriteriaGroup.name }}
      </template>
    </el-table-column>
    <el-table-column label="NameGroup" width="180">
      <template #default="scope">
        {{ scope.row.asset.name }}
      </template>
    </el-table-column>

  </el-table>
</template>

<script lang="ts" setup>
import type { TableColumnCtx } from 'element-plus'
import { ref, onMounted } from 'vue'
interface User {
  id: string
  name: string
  amount1: string
  amount2: string
  amount3: number
}

interface SpanMethodProps {
  row: User
  column: TableColumnCtx<User>
  rowIndex: number
  columnIndex: number
}


const objectSpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: SpanMethodProps) => {
  if (columnIndex === 0) {
    if (rowIndex % 2 === 0) {
      return {
        rowspan: 2,
        colspan: 1,
      }
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      }
    }
  }
}
const objectSpanMethod1 = (row: any) => {
  console.log(row.column.property);
  if (row.column.property === 'NameGroup') {
    const rowIndex = row.rowIndex;
    if (assets[rowIndex]) {
      return {
        rowspan: assets[rowIndex].rowspan,
        colspan: assets[rowIndex].colspan,
      };
    }

    // return {
    //   rowspan:
    // }
  }
}

const items = ref([
  {
    "id": 26,
    "createdAt": "2024-05-09T16:16:09.000Z",
    "updatedAt": "2024-05-09T16:16:09.000Z",
    "name": "Đi đúng giờ",
    "description": "....",
    "type": "rating_scale",
    "status": "active",
    "criteriaValues": [
      {
        "scoreMin": 8,
        "scoreMax": 9,
        "description": "Khá"
      },
      {
        "scoreMin": 8,
        "scoreMax": 9,
        "description": "TB"
      }
    ],
    "kpiCriteriaGroup": {
      "id": 4,
      "name": "nhóm 1"
    }
  },
  {
    "id": 25,
    "createdAt": "2024-05-09T16:16:07.000Z",
    "updatedAt": "2024-05-09T16:16:07.000Z",
    "name": "Đi đúng giờ",
    "description": "....",
    "type": "rating_scale",
    "status": "active",
    "criteriaValues": [
      {
        "scoreMin": 8,
        "scoreMax": 9,
        "description": "Khá"
      },
      {
        "scoreMin": 8,
        "scoreMax": 9,
        "description": "TB"
      }
    ],
    "kpiCriteriaGroup": {
      "id": 4,
      "name": "nhóm 1"
    }
  },
  {
    "id": 8,
    "createdAt": "2024-05-08T16:56:32.000Z",
    "updatedAt": "2024-05-08T16:56:32.000Z",
    "name": "Khả năng code nhanh",
    "description": "Thường xuyên hoàn thành task trước thời gian estimate",
    "type": "grading_level",
    "status": "active",
    "criteriaValues": [
      {
        "level": "A",
        "description": "Là hoàn thành xuất sắc"
      },
      {
        "level": "B",
        "description": "Là hoàn thành mức độ khá"
      }
    ],
    "kpiCriteriaGroup": {
      "id": 1,
      "name": "Chuyên môn"
    }
  },
  {
    "id": 7,
    "createdAt": "2024-05-08T16:30:03.000Z",
    "updatedAt": "2024-05-09T13:33:04.000Z",
    "name": "sdsd",
    "description": "sdsd",
    "type": "grading_level",
    "status": "active",
    "criteriaValues": [
      {
        "level": "A",
        "description": "tốt"
      },
      {
        "level": "B",
        "description": "Khá"
      }
    ],
    "kpiCriteriaGroup": {
      "id": 3,
      "name": "Khác"
    }
  },
  {
    "id": 6,
    "createdAt": "2024-05-08T16:12:24.000Z",
    "updatedAt": "2024-05-08T16:12:24.000Z",
    "name": "Đi đúng giờ",
    "description": "....",
    "type": "grading_level",
    "status": "active",
    "criteriaValues": [
      {
        "level": "A",
        "description": "Tốt"
      },
      {
        "level": "B",
        "description": "Khá"
      }
    ],
    "kpiCriteriaGroup": {
      "id": 2,
      "name": "Chuyên cần"
    }
  },
  {
    "id": 5,
    "createdAt": "2024-05-07T16:56:42.000Z",
    "updatedAt": "2024-05-07T16:56:42.000Z",
    "name": "Đi đúng giờ",
    "description": "....",
    "type": "grading_level",
    "status": "active",
    "criteriaValues": [
      {
        "level": "A",
        "description": "Tốt"
      },
      {
        "level": "B",
        "description": "Khá"
      }
    ],
    "kpiCriteriaGroup": {
      "id": 2,
      "name": "Chuyên cần"
    }
  },
  {
    "id": 2,
    "createdAt": "2024-05-07T14:36:08.000Z",
    "updatedAt": "2024-05-07T14:36:08.000Z",
    "name": "Khả năng code nhanh",
    "description": "Thường xuyên hoàn thành task trước thời gian estimate",
    "type": "grading_level",
    "status": "active",
    "criteriaValues": [
      {
        "level": "A",
        "description": "Là hoàn thành xuất sắc"
      },
      {
        "level": "B",
        "description": "Là hoàn thành mức độ khá"
      }
    ],
    "kpiCriteriaGroup": {
      "id": 1,
      "name": "Chuyên môn"
    }
  }
])
const Name = ref(["Chuyên cần", "Chuyên môn", "Khác", "nhóm 1"])
const data = Name.value.map((name: any) => {
  const levelData = {
    name: '',
    items: [] as any[],
  };
  levelData.name = name;
  levelData.items = items.value.filter(
    (item: any) => item.kpiCriteriaGroup.name === name,
  );
  return levelData;
});
const assets: any[] = data.reduce((arr, item) => {
  const { items } = item
  return arr.concat(
    items.map((value: any, index: number) => ({
      asset: value,
      rowspan: index == 0 ? items.length : 0,
      colspan: index == 0 ? 1 : 0
    }))
  )
}, [])
onMounted(() => {
  console.log(assets);
})
const tableData: User[] = [
  {
    id: '12987122',
    name: 'Tom',
    amount1: '234',
    amount2: '3.2',
    amount3: 10,
  },
  {
    id: '12987123',
    name: 'Tom',
    amount1: '165',
    amount2: '4.43',
    amount3: 12,
  },
  {
    id: '12987124',
    name: 'Tom',
    amount1: '324',
    amount2: '1.9',
    amount3: 9,
  },
  {
    id: '12987125',
    name: 'Tom',
    amount1: '621',
    amount2: '2.2',
    amount3: 17,
  },
  {
    id: '12987126',
    name: 'Tom',
    amount1: '539',
    amount2: '4.1',
    amount3: 15,
  },
]
</script>
