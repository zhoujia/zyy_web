<style lang="less" scoped>
@import url(./layout.less);
</style>
<template>
  <section class="admin-layout-container">
    <div class="layout">
      <Layout>
        <Sider ref="side1"
               hide-trigger
               collapsible
               :collapsed-width="78"
               v-model="isCollapsed"
               style="background: rgb(73, 80, 96);">
          <div class="logo">
            <!--<img :src="logo" width="100" v-if="!isCollapsed" />-->
            <Avatar :title="user"
                    icon="ios-person"
                    size="large" />
            <span style="margin-left:15px;color:#fff"
                  v-if="!isCollapsed">{{user}}</span>
          </div>
          <Menu ref="side_menu"
                :active-name="activeMenuName"
                :open-names="openMenuName"
                theme="dark"
                width="100%"
                :class="menuitemClasses"
                @on-select="choosedMenu"
                v-if="!isCollapsed">
            <template v-for="(menu,menu_index) in menus">
              <Submenu :name="menu.name"
                       v-if="menu.children">
                <template slot="title">
                  <Icon :size="20"
                        :type="menu.icon"></Icon>
                  {{menu.title}}
                </template>
                <MenuItem :name="child.name"
                          v-for="(child ,child_index) in menu.children"
                          :key="child_index">
                <Icon :size="20"
                      :type="child.icon"></Icon>
                {{child.title}}
                </MenuItem>
              </Submenu>
              <MenuItem :name="menu.name"
                        v-if="!menu.children && menu.showInMenus">
              <Icon :size="20"
                    :type="menu.icon"></Icon>
              {{menu.title}}
              </MenuItem>
            </template>
          </Menu>
          <div class="dropdown-wrap">
            <template v-for="(menu,menu_index) in menus"
                      v-if="isCollapsed">
              <Dropdown transfer
                        placement="right-start"
                        v-if="menu.children"
                        @on-click="dropdownClick">
                <Button style="width: 85px;margin-left: -5px;padding:10px 0;"
                        type="text">
                  <Icon :size="25"
                        color="#fff"
                        :type="menu.icon"></Icon>
                </Button>
                <DropdownMenu style="width: 200px;"
                              slot="list">
                  <template v-for="(child, i) in menu.children">
                    <DropdownItem :name="child.name">
                      <div style="display:flex;align-items:center;">
                        <Icon :size="16"
                              :type="child.icon"></Icon>
                        <span style="padding-left:10px;">
                          {{ child.title }}
                        </span>
                      </div>
                    </DropdownItem>
                  </template>
                </DropdownMenu>
              </Dropdown>
              <Dropdown transfer
                        v-if="!menu.children && menu.showInMenus"
                        placement="right-start"
                        @on-click="dropdownClick">
                <Button style="width: 85px;margin-left: -5px;padding:10px 0;"
                        type="text">
                  <Icon :size="25"
                        color="#fff"
                        :type="menu.icon"></Icon>
                </Button>
                <DropdownMenu style="width: 200px;"
                              slot="list">
                  <DropdownItem :name="menu.name">
                    <div style="display:flex;align-items:center;">
                      <Icon :size="16"
                            :type="menu.icon"></Icon>
                      <span style="padding-left:10px;">
                        {{ menu.title }}
                      </span>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </template>
          </div>
        </Sider>
        <Layout>
          <Header :style="{position: 'fixed',
                                                        width: isCollapsed?'calc(100% - 78px)':'calc(100% - 200px)',
                                                        padding: 0,
                                                        display:'flex',
                                                        flexDirection:'column',
                                                        zIndex:20
                                                    }"
                  class="layout-header-bar">
            <div style="
                                                        display:flex;
                                                        align-tems:center;
                                                        justify-content:space-between;
                                                        position: relative;
                                                        height:60px;
                                                        line-height: 60px;
                                                        z-index: 1;
                                                        box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);">
              <div style="display:flex;align-items:center;">
                <Icon @click.native="collapsedSider"
                      :class="rotateIcon"
                      :style="{margin: '0 20px 0'}"
                      type="md-menu"
                      size="24"></Icon>
                <span style="font-size:18px;font-weight:bold">中医药大学大数据分析后台管理系统</span>
              </div>
              <div style="margin-right:20px">
                <Button type="text"
                        icon="ios-home"
                        to="/"
                        size="large">前台首页</Button>
                <Button type="text"
                        icon="ios-log-out"
                        size="large"
                        @click="quit">退出系统</Button>
              </div>
            </div>
            <!--<div style="display: flex;
                                                                position: relative;
                                                                padding-left:10px;
                                                                height: 40px;
                                                                background: #f5f7f9;
                                                                align-items: center;
                                                                box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);">
                                        <template v-for="(tab,tab_index) in tags">
                                            <Tag type="dot" :closable="tab.closable" :color="tab.choosed ? 'blue':'#e9eaec'" :name="tab.name" @click.native="clickTag(tab)" @on-close="closeTag">
                                                {{tab.title}}
                                            </Tag>
                                        </template>
                                    </div>-->
            <div class="tags-nav">
              <div class="btn-con left-btn">
                <Button type="text"
                        @click="handleScroll(240)">
                  <Icon :size="18"
                        type="ios-arrow-back" />
                </Button>
              </div>
              <div class="btn-con right-btn">
                <Button type="text"
                        @click="handleScroll(-240)">
                  <Icon :size="18"
                        type="ios-arrow-forward" />
                </Button>
              </div>
              <div class="scroll-outer"
                   ref="scrollOuter"
                   @DOMMouseScroll="handlescroll"
                   @mousewheel="handlescroll">
                <div ref="scrollBody"
                     class="scroll-body"
                     :style="{left: tagBodyLeft + 'px'}">
                  <transition-group name="taglist-moving-animation">
                    <Tag type="dot"
                         v-for="(item, index) in tags"
                         ref="tagsPageOpened"
                         :key="`tag-nav-${index}`"
                         :name="item.name"
                         :data-route-item="item"
                         @on-close="closeTag"
                         @click.native="clickTag(item)"
                         :closable="item.closable"
                         :color="item.choosed ? 'blue':'#e9eaec'">{{ item.title }}</Tag>
                  </transition-group>
                </div>
              </div>
            </div>

          </Header>
          <Content :style="{
                                                    height: 'calc(100% - 100px)',
                                                    position: 'absolute',
                                                    top: '100px',
                                                    overflow: 'auto',
                                                    padding: '10px',
                                                    width:isCollapsed?'calc(100% - 78px)':'calc(100% - 200px)'
                                                    }">
            <!--保存组件状态到内存，避免重新渲染-->
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </Content>
        </Layout>
      </Layout>
    </div>
  </section>
</template>
<script>
import { routeEqual } from '@/libs/util'
import { readUser, deleteToken, deleteUser } from '../libs/cookie'
export default {
  data () {
    return {
      isCollapsed: false,
      user: readUser(),
      tagBodyLeft: 0,
      outerPadding: 4,
      // ------------------------------  菜单操作开始  --------------------------------
      title: '首页',
      activeMenuName: 'home',
      openMenuName: [],
      menus: [
        {
          title: '首页',
          num: 1,
          name: 'Home',
          icon: 'md-home',
          href: '/admin',
          closable: false,
          showInTags: true,
          showInMenus: true,
          choosed: true,
        },
        {
          title: '个人信息',
          name: 'UserInfo',
          icon: 'ios-contact',
          href: '/admin/UserInfo',
          closable: true,
          showInTags: false,
          showInMenus: true,
          choosed: false,
        },
        {
          title: '用户管理',
          name: 'User',
          icon: 'ios-people',
          href: '/admin/User',
          closable: true,
          showInTags: false,
          showInMenus: true,
          choosed: false,
        },
        {
          title: '系统设置',
          name: 'Seting',
          icon: 'md-settings',
          href: '/admin/Seting',
          closable: true,
          showInTags: false,
          showInMenus: true,
          choosed: false,
        }

      ]
      // ------------------------------  菜单操作结束  --------------------------------   
    }
  },
  computed: {
    // 筛选menus中选中的menu
    tags () {
      let tags = [];
      // 将menus中showInTags=true的标签放到tags数组中
      this.menus.forEach(menu => {
        if (menu.showInTags) {
          tags.push(menu);
        } else if (menu.children) {
          menu.children.forEach(child => {
            if (child.showInTags) {
              tags.push(child)
            }
          })
        }
      });
      console.log('tags=>', tags)

      //标签数组排序，从小到到
      tags.sort((a, b) => {
        return (a.num - b.num)
      })
      return tags;
    },
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  // ------------------------------  菜单操作开始  --------------------------------
  //刷新页面之后保存并选中最后一次菜单和标签
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      let activeMenuName = localStorage.activeMenuName;
      vm.activeMenuName = activeMenuName;

      let tags_last_num = vm.tags[vm.tags.length - 1].num;

      if (activeMenuName && activeMenuName.length != 0) {
        vm.menus.forEach(_menu => {
          if (activeMenuName == _menu.name) {
            _menu.choosed = true;
            _menu.showInTags = true;
            _menu.num = tags_last_num + 1;
          }
          else if (_menu.children) {
            _menu.children.forEach(child => {
              if (activeMenuName == child.name) {
                child.choosed = true;
                child.showInTags = true;
                child.num = tags_last_num + 1;
                vm.openMenuName = [_menu.name];
              }
            })
          }
          else {
            // 排除首页
            if (_menu.name != 'home') {
              _menu.choosed = false;
              _menu.showInTags = false;
            } else {
              _menu.choosed = false;
            }
          }
        })
      }
      // vm.$nextTick(() => {
      //     vm.$refs.side_menu.updateOpened();
      //     vm.$refs.side_menu.updateActiveName();
      // });
    })
  },
  // ------------------------------  菜单操作结束  --------------------------------
  methods: {
    handlescroll (e) {
      var type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    },
    handleScroll (offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    quit () {
      let _this = this;
      this.$Modal.confirm({
        title: '您确定退出系统',
        content: '当前用户' + _this.user + '，是否继续退出系统？',
        onOk: () => {
          //this.$Message.info('Clicked ok');
          deleteToken()
          deleteUser()
          this.$store.commit('del_token')
          if (readUser() == undefined) {
            _this.$Message.success('用户退出系统成功！');
            setTimeout(function () {
              _this.$router.replace({ path: '/Login' })
            }, 500)
          }

        },
        onCancel: () => {
          //this.$Message.info('Clicked cancel');
        }
      });
    },
    clickNotice () {
      this.choosedMenu('notice');
    },
    collapsedSider () {
      this.$refs.side1.toggleCollapse();
    },
    // ------------------------------  菜单操作开始  --------------------------------
    closeTag (event, name) {
      // 判断该标签是否是选中状态
      // 如果是那么就要设置标签数组中最后一个标签成选中状态
      // 如果否那么就直接删除就好
      let is_choosed = false;
      this.menus.forEach((menu, _index) => {
        if (menu.name == name) {
          is_choosed = menu.choosed;
          menu.showInTags = false;
        } else if (menu.children) {
          menu.children.forEach(child => {
            if (child.name == name) {
              is_choosed = child.choosed;
              child.showInTags = false;
            }
          })
        }
      })
      // 关闭标签并选中tags中最后一个标签高亮  
      if (is_choosed) {
        let last_tag = this.tags[this.tags.length - 1];
        last_tag.choosed = true;
        this.$router.push(last_tag.href);
        this.activeMenuName = last_tag.name;
        localStorage.activeMenuName = this.activeMenuName;
      }
    },
    clickTag (tag) {
      this.tags.forEach(_tag => {
        if (_tag.name == tag.name) {
          _tag.choosed = true;
        } else {
          _tag.choosed = false;
        }
      })
      // 设置菜单选中name
      this.activeMenuName = tag.name;
      localStorage.activeMenuName = this.activeMenuName;
      // 刷新菜单
      this.$nextTick(() => {
        if (this.$refs.side_menu) {
          this.$refs.side_menu.updateActiveName()
        }
      });
      //点击tab跳转
      this.$router.push(`${tag.href}`);
    },
    choosedMenu (name) {
      // 获取标签数组最后一个元素的num
      let tags_last_num = this.tags[this.tags.length - 1].num;
      // 设置选中菜单name
      this.activeMenuName = name;
      localStorage.activeMenuName = this.activeMenuName;
      let if_tab = false;

      //根据name查找对应的菜单对象
      let menu = null;
      this.menus.forEach(_menu => {
        if (_menu.name == name) {
          // 只有不在tags数组中的元素才能设置num                 
          if (!_menu.showInTags) {
            _menu.num = tags_last_num + 1;
          }
          menu = _menu;
          _menu.showInTags = true;
          _menu.choosed = true;

        }
        else if (_menu.children) {
          _menu.children.forEach(child => {
            if (child.name == name) {
              // 只有不在tags数组中的元素才能设置num                       
              if (!_menu.showInTags) {
                child.num = tags_last_num + 1;
              }
              menu = child;
              child.showInTags = true;
              child.choosed = true;

            } else {
              child.choosed = false;
            }
          })
        }
        else {
          _menu.choosed = false;
        }
      })
      this.$router.push(`${menu.href}`);
    },
    dropdownClick (name) {
      this.choosedMenu(name);
    },
    // ------------------------------  菜单操作结束  --------------------------------
    moveToView (tag) {
      console.log('move')
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
      } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
      }
    },
    getTagElementByName (route) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened
        console.log('nextTick')
        this.refsTag.forEach((item, index) => {
          console.log(item)
          if (routeEqual(route, item.$attrs['data-route-item'])) {
            let tag = this.refsTag[index].$el
            this.moveToView(tag)
          }
        })
      })
    }
  },
  watch: {
    '$route' (to) {

      this.getTagElementByName(to)

    },
  },
}
</script>
