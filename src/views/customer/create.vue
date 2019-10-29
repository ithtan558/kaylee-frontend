<template>
  <service-detail :is-edit="false" />
</template>

<script>
import ServiceDetail from './components/CustomerDetail'

export default {
  name: 'CreateForm',
  components: { ServiceDetail }
}
</script>

