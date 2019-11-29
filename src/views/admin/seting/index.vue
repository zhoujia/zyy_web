<style lang="less" scoped>
.home-container {
}
</style>
<template>
  <section class="home-container">
    <MasterPage title="系统设置">
      <div slot="title-icon">
        <Icon size=25
              type="md-settings" />
      </div>
      <!--<div slot="title-toolbar">
                <Button type="primary" icon="md-add">新增用户</Button>
            </div>-->
      <div slot="btns">
        <!--<Button type="primary" icon="md-add">添加</Button>-->
      </div>
      <div slot="paddingContent">
        系统设置
      </div>

    </MasterPage>
  </section>
</template>
<script>
import MasterPage from '@/components/Master'
import Tables from '@/components/tables/index.js'
export default {
  components: {
    MasterPage,
    Tables
  },
  data () {
    return {
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      },
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
                    this.remove(params.index)
                  }
                }
              }, 'Delete')
            ]);
          }
        }
      ],
      data: [
        {
          id: '1',
          name: 'admin',
          time: '2018-12-15 12:15:20',
          remarks: '管理员'
        },
        {
          id: '2',
          name: 'dev',
          time: '2018-12-12 10:10:06',
          remarks: '测试'
        }

      ]
    }
  },
  methods: {
  }
}
</script>


