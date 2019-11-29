<style lang="less" scoped>
.home-container {
}
</style>
<template>
  <section class="home-container">
    <MasterPage title="用户管理">
      <div slot="title-icon">
        <Icon size=25
              type="ios-people" />
      </div>
      <div slot="title-toolbar">
        <Button type="primary"
                icon="md-add"
                @click="addUser()">新增用户</Button>
      </div>

      <div slot="btns">
        <!--<Button type="primary" icon="md-add">添加</Button>-->
      </div>
      <div slot="paddingContent">
        <Tables :value="data"
                :columns="columns"></Tables>
      </div>
      <div slot="pager">
        <Page :total="total"
              :page-size="pageSize"
              show-total
              @on-change="changepage" />
      </div>
    </MasterPage>
  </section>
</template>
<script>
import MasterPage from '@/components/Master'
import Tables from '@/components/tables/index.js'
import { setTimeout } from 'timers';
import { readUser } from '@/libs/cookie'
import addUser from './addUser.vue'
import qs from 'qs'
export default {
  components: {
    MasterPage,
    Tables,
    addUser
  },
  data () {
    return {
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],//接口获取的总数据
        dataSize: '',// 总数据的条目
        page: 1,
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: '',
        ids: [],
      },
      userName: '',
      password: '',
      nickName: '',
      description: '',
      columns: [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: '用户名',
          key: 'name'
        },
        {
          title: '创建时间',
          key: 'time',
          sortable: true
        },
        {
          title: '备注',
          key: 'remarks',

        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, 'View'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    // _this = this
                    this.$Modal.confirm({
                      title: '您确定删除该用户？',
                      content: '当前用户' + this.user + '，是否继续删除该用户？',
                      onOk: () => {
                        this.remove(params)
                        if (readUser() == undefined) {
                          this.$Message.success('用户删除成功！');
                        }
                      }
                    })

                  }
                }
              }, 'Delete')
            ]);
          }
        }
      ],
      data: [],
      total: 0,
      page: 1,
      pageSize: 10
    }
  },
  created () {
    this.sends()
  },
  methods: {
    sends () {
      console.log(this.page)
      this.$ajax.get('api/user/userList', {
        params: {
          page: this.page,
          pageSize: this.pageSize,
        }
      }).then(res => {
        this.checkbox = res.data.data.list
        this.total = res.data.data.total
        console.log(this.checkbox)
        /*this.dataCount = this.checkbox.length
        if (this.dataCount < 10) {
          this.checkbox = res.data.data.list
        } else {
          this.page += 1
          this.checkbox = res.data.data.list.slice(0, 10)
        }*/

        this.ids = []
        for (let index = 0; index < this.checkbox.length; index++) {
          this.ids.push({
            id: this.checkbox[index].id,
            name: this.checkbox[index].userName,
            time: this.checkbox[index].createTime,
            remarks: this.checkbox[index].description,
          })
        }
        this.data = this.ids
        console.log(this.params)
      }).catch((error) => {
        console.log(error)
      })
    },
    //页数变化的时候改变每一页的内容
    changepage (page) {
      this.page = page
      this.sends()
      /*var _start = (index - 1) * 10;
      var _end = index * 10;
      this.checkbox = res.data.data.list.slice(_start, _end);*/
    },
    remove ({ index, row }) {
      this.$ajax.get('api/user/delAdminUser', {
        params: {
          userId: row.id
        }
      }).then(res => {
        this.data.splice(index, 1)
        console.log(res.data.data);
      }).catch((error) => {
        console.log(error)
      })
    },
    addUser () {
      let form = {}
      this.$Modal.confirm({
        title: '新增用户',
        render: (h) => {
          return h(addUser, {
            on: {
              onChange (data) {
                form = data
              }
            }
          })
        },
        onOk: () => {
          // console.log(form)
          if (form.userName == '') {
            this.$Message.warning('账号不能为空');
            return false
          } else if (form.password == '') {
            this.$Message.warning('密码不能为空');
            return false
          } else if (form.nickName == '') {
            this.$Message.warning('昵称不能为空');
            return false
          } else if (form.description == '') {
            this.$Message.warning('备注不能为空');
            return false
          } {
            // ajax 登录接口
            console.log(form)
            this.$ajax.post('/api/user/addAdminUser', qs.stringify({
              userName: form.userName,
              password: form.password,
              nickName: form.nickName,
              description: form.description,
            })).then(res => {
              console.log(res.data)
            })
            this.sends()
          }
        }
      })
    }
  }
}
</script>


