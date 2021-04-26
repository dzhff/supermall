<template>
  <div id="app">
    <!-- 头部 -->
    <Row class="head" type="flex">
      <Col span="15">
        <router-link to='/admintor' tag="button">管理员登录</router-link>
      </Col>
    </Row>
    <!-- 简介 -->
    <Row type="flex" class="jianjie">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.app{
  background-color: whitesmoke;

}
.head{
  justify-content: center;
  background-color: white;
  font-size: 15px;
  padding: 8px 0px;
  
}
.jianjie{
  background-color: white;
  font-size: 15px;
}

</style>
