
<script setup>
import { ref, computed } from 'vue'

// CSVファイルのヘッダー部を定義しておきます
const headers = ref([
        {
          text: "Code",
          align: "left",
          sortable: false,
          value: "code"
        },
        { text: "Name", align: "left", value: "name" },
        { text: "WorkerType", align: "left", value: "workerType" }
      ]);
const workers = ref([]);

const fileChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      const workers = [];

      const loadFunc = () => {
        const lines = reader.result.split("\n");
        lines.forEach(element => {
          const workerData = element.split(",");
          if (workerData.length != 3) return;
          const worker = {
            code: workerData[0],
            name: workerData[1],
            workerType: workerData[2]
          };
          workers.push(worker);
        });
        workers.value = workers;
      };

      // onloadはreadAsBinaryStringでファイルを読み込んだ後に実行されます.
      reader.onload = loadFunc;

      reader.readAsBinaryString(file);
    }

</script>

