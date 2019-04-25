<template>
  <div class="header">
    <a href="/">Fight<span class="lighter">Me</span><span class="lightest">!</span></a>
  </div>
</template>

<script>
import { eventBus } from '../main';
export default {
}
</script>

<style>
.header {
  text-align: left;
  padding: 30px 30px 0 30px;;
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
}
.header a {
  color: #30c0ff !important;
}
.lighter {
  opacity: 0.5;
}
.lightest {
  opacity: 0.3;
}
@media only screen and (min-width: 768px) {
  

}
</style>
