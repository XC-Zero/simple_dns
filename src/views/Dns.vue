<template>
  <div>
    <v-row
        align="center"
        justify="space-around"
        style="margin-bottom: 20px;width: 24%;"
    >
      <v-dialog
          v-model="dialogVisible"
          persistent
          width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              tile
              color="info"
              v-bind="attrs"
              v-on="on"
          >
            <v-icon left>
              mdi-plus-thick
            </v-icon>
            添加
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5">
            Create New DNS Record
          </v-card-title>

          <v-card-text>
            <v-form
                style="width: 100%;"
                ref="form"
                v-model="valid"
            >
              <v-text-field
                  v-model="newDNSData.domain"
                  :rules="domainRules"
                  label="域名"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="newDNSData.addr"
                  :rules="addrRules"
                  label="地址"
                  required
              ></v-text-field>
              <v-select
                  :items="selectTypeList"
                  label="访问类型"
                  v-model="newDNSData.query_type"
                  :rules="query_typeRules"
                  required
              ></v-select>
              <v-text-field
                  @keydown.enter.prevent="addDNS"
                  v-model="newDNSData.ttl"
                  label="TTL"
                  :rules="ttlRules"
                  type="number"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <span slot="footer" class="dialog-footer">
               <v-btn color="error" style="margin-right: 15px" @click="dialogVisible=false">Cancel</v-btn>
    <v-btn color="info" @click="addDNS">Submmit</v-btn>
  </span>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
          v-model="editVisible"
          persistent
          width="500"
      >
        <template v-slot:activator="{  attrss }">
          <v-btn
              tile
              color="success"
              v-bind="attrss"
              @click="openEdit()"
          >
            <v-icon left>
              mdi-pencil
            </v-icon>
            编辑
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5">
            Edit DNS Record
          </v-card-title>

          <v-card-text v-if="selected.length===1">
            <v-form
                style="width: 100%;"
                ref="form"
                v-model="valid"
            >
              <v-text-field
                  v-model="selected[0].domain"
                  :rules="domainRules"
                  label="域名"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="selected[0].addr"
                  :rules="addrRules"
                  label="地址"
                  required
              ></v-text-field>
              <v-select
                  :items="selectTypeList"
                  label="访问类型"
                  v-model="selected[0].query_type"
                  :rules="query_typeRules"
                  required
              ></v-select>
              <v-text-field
                  @keydown.enter.prevent="editDNS"
                  v-model="selected[0].ttl"
                  label="TTL"
                  :rules="ttlRules"
                  type="number"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <span slot="footer" class="dialog-footer">
               <v-btn color="error" style="margin-right: 15px" @click="editVisible=false">Cancel</v-btn>
    <v-btn color="info" @click="editDNS">Submmit</v-btn>
  </span>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
    <v-card>
    <v-card-title style="width: 20%">
      <v-text-field

          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
        show-select
        item-key="id"
        :search="search"
    ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import router from "../router";
import Cookies from "js-cookie";

export default {
  name: "Dns",
  data() {
    return {
      //常量
      typeList: {
        1: "A",
        2: "NS",
        5: "CNAME",
        6: "SOA",
        12: "PTR",
        15: "MX",
        16: "TXT",
        28: "AAAA",
        33: "SRV",
        41: "OPT"
        ,
      },
      retypeList: {
        "A": 1,
        "NS": 2,
        "CNAME": 5,
        "SOA": 6,
        "PTR": 12,
        "MX": 15,
        "TXT": 16,
        "AAAA": 28,
        "SRV": 33,
        "OPT": 41,
      },
      selectTypeList: [
        "A",
        "NS",
        "CNAME",
        "SOA",
        "PTR",
        "MX",
        "TXT",
        "AAAA",
        "SRV",
        "OPT"
        ,
      ],
      search:"",
      editVisible: false,
      dialogVisible: false,
      selected: [],
      headers: [
        {
          text: "ID",
          align: 'start',
          sortable: true,
          filterable: false,
          value: 'id',
        },
        {text: '域名', value: 'domain'},
        {text: '地址', value: 'addr'},
        {text: '访问类型', value: 'query_type'},
        {text: 'TTL', value: 'ttl'},

      ],
      desserts: [
        {
          source: "www.baidu.com",
          target: "8.8.8.8"
        }
      ],
      valid: false,
      domainRules: [
        v => !!v || '域名为空',
      ],
      addrRules: [
        v => !!v || '地址为空',
      ],
      query_typeRules: [
        v => !!v || '访问类型为空',
      ],
      ttlRules: [
        v => !!v || 'TTL为空',
      ],
      newDNSData: {
        ttl:10,
        query_type:"A"
      },
    }
  },
  methods: {

    deleteDNS() {
      let that = this

      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: 'Delete',
        cancelButtonText:'Cancel',
        type: 'warning',
      }).then(()=>{
        for (let i = 0; i < this.selected.length; i++) {
          this.$http({
            url: '/api/del',
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              'token': that.$Cookies.get("token")
            },
            data: {
              "id": that.selected[i].id
            }
          }).then(() => {
            this.$message({
              message: '删除 ' + that.selected[i].id + ' 成功',
              type: 'success',
            });
          }).catch(err => {
            if (err.response.status===401){
              router.push({path: '/'});
              Cookies.remove("token")
              this.$message({
                message: err.response.data,
                type: 'error',
              });
            }
          })
        }
        this.getAllDNS()
      });

    },
    addDNS() {
      let that = this
      this.$refs.form.validate()

      if (that.valid) {
        that.newDNSData.query_type = that.retypeList[that.newDNSData.query_type]
        that.newDNSData.ttl = Number(that.newDNSData.ttl)
        this.$http({
          url: '/api/add',
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'token': that.$Cookies.get("token")
          },
          data: that.newDNSData
        }).then(() => {
          this.$message({
            message: "添加成功！",
            type: 'success',
          });
        }).catch(err => {
          if (err.response.status===401){
            router.push({path: '/'});
            Cookies.remove("token")
            this.$message({
              message: err.response.data,
              type: 'error',
            });
          }
        })
        this.dialogVisible = false
        that.desserts = []
        that.newDNSData = {
          ttl:10,
          query_type:"A"
        }
        this.getAllDNS()
      }

    },
    openEdit() {
      if (this.selected.length === 1) {
        this.editVisible = true
      } else {
        this.$message({
          message: "请选择一个进行更改",
          type: 'error',
        });
      }
    },
    editDNS() {
      let that = this
      that.selected[0].query_type = that.retypeList[that.selected[0].query_type]
      that.selected[0].ttl = Number(that.selected[0].ttl)
      this.$http({
        url: '/api/update',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'token': that.$Cookies.get("token")
        },
        data:that.selected[0]
      }).then(() => {
        this.$message({
          message: "修改成功！",
          type: 'success',
        });
      }).catch(err => {
        if (err.response.status===401){
          router.push({path: '/'});
          Cookies.remove("token")
          this.$message({
            message: err.response.data,
            type: 'error',
          });
        }
      })
      that.selected=[]
      that.editVisible=false
      this.getAllDNS()
    },
    getAllDNS() {
      let that = this
      this.$http({
        url: '/api/list',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'token': that.$Cookies.get("token")
        },
      }).then((res) => {
        let temp = res.data
        for (let i = 0; i < temp.length; i++) {
          temp[i].query_type = that.typeList[temp[i].query_type]
        }
        that.desserts = temp
        that.selected = []
      }).catch(err => {
        if (err.response.status===401){
          router.push({path: '/'});
          Cookies.remove("token")
          this.$message({
            message: err.response.data,
            type: 'error',
          });
        }
      })
    }
  },
  mounted() {
    this.getAllDNS()
  }
}
</script>

<style scoped>

</style>