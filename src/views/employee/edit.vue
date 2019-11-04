<template>
  <brand-detail :is-edit="true" />
</template>

<script>
import BrandDetail from './components/EmployeeDetail'

export default {
  name: 'EditForm',
  components: { BrandDetail }
}
</script>

