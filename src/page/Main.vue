<template>
    <div id="Main">
         <Footer />
      <keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </template>
  <script>
  export default {
    
     
  }
  </script>
  <style lang="scss" scoped>
  #Main {
       width: 100%;
       height: 100%;
  }
  </style>
  