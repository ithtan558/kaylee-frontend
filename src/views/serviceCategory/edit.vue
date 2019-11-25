<template>
  <service-category-detail :is-edit="true" />
</template>

<script>
import ServiceCategoryDetail from './components/ServiceCategoryDetail'

export default {
  name: 'EditForm',
  components: { ServiceCategoryDetail }
}
</script>

