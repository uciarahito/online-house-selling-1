import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Content from '@/components/Content'
import DetailHouse from '@/components/DetailHouse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/',
      name: 'Content',
      component: Content
    },
    {
      path: '/detailhouse/:id',
      props: true,
      name: 'DetailHouse',
      component: DetailHouse
    }
  ]
})
