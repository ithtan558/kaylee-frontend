<template>
  <service-category-detail :is-edit="false" />
</template>

<script>
import ServiceCategoryDetail from './components/ServiceCategoryDetail'

export default {
  name: 'CreateForm',
  components: { ServiceCategoryDetail }
}
</script>

