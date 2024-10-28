<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'

const getError = (error: any, key: string) => {
  return error?.[key]?.join(',')
}

const form = useForm<{
  images: { file: File | undefined; title: string }[]
}>({
  images: [{ file: undefined, title: '' }],
})
</script>

<template>
  <Head>
    <title>Home</title>
  </Head>
  <h1>Form</h1>
  <div>
    <form
      @submit.prevent="form.post('/upload')"
      style="display: flex; flex-direction: column; gap: 1rem; padding: 3rem"
    >
      <template v-for="(_, index) in form.images" :key="index">
        <input type="text" placeholder="Title" v-model="form.images[index].title" />
        <span>{{ getError(form.errors, `images.${index}.title`) }}</span>
        <input
          type="file"
          @input="form.images[index].file = ($event.target as HTMLInputElement)?.files?.[0]"
        />
        <span>{{ getError(form.errors, `images.${index}.file`) }}</span>
      </template>
      <button type="button" @click="form.images.push({ file: undefined, title: '' })">
        Add image
      </button>
      <button type="submit" :disabled="form.processing">Submit</button>
    </form>
  </div>
</template>
