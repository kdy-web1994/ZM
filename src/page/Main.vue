<template>
    <div id="Main">
        
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
       
  }
  </style>
  