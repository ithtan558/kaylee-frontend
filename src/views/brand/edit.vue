<template>
  <brand-detail :is-edit="true" />
</template>

<script>
import BrandDetail from './components/BrandDetail'

export default {
  name: 'EditForm',
  components: { BrandDetail }
}
</script>

