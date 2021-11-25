<template>
  <div>
    <v-row
        align="center"
        justify="space-around"
        style="margin-bottom: 20px;width: 24%;"
    >
      <v-btn
          tile
          color="info"
          @click="addDNS()"
      >
        <v-icon left>
          mdi-plus-thick
        </v-icon>
        添加
      </v-btn>
      <v-btn
          tile
          color="success"
          @click="editDNS()"

      >
        <v-icon left>
          mdi-pencil
        </v-icon>
        编辑
      </v-btn>
      <v-btn
          tile
          color="error"
          @click="deleteDNS()"
      >
        <v-icon left>
          mdi-trash-can-outline
        </v-icon>
        删除
      </v-btn>
    </v-row>
    <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
        show-select
        :single-select="false"
        item-key="name"

    ></v-data-table>
  </div>
</template>

<script>
export default {
  name: "Dns",
  data () {
    return {
      selected: [],
      headers: [
        {
          text: 'DNS列表',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: '源网址', value: 'calories' },
        { text: '目的网址', value: 'fat' },
        // { text: 'Carbs (g)', value: 'carbs' },
        // { text: 'Protein (g)', value: 'protein' },
        // { text: 'Iron (%)', value: 'iron' },
      ],
      desserts: []
    }
  },
}
</script>

<style scoped>

</style>