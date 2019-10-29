<template>
  <service-detail :is-edit="true" />
</template>

<script>
import ServiceDetail from './components/CustomerDetail'

export default {
  name: 'EditForm',
  components: { ServiceDetail }
}
</script>

