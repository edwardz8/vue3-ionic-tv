<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Single Blog Post</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Sanity -->
      <div class="container">
       <!--  <div class="loading" v-if="loading">Loading...</div> -->
        <div v-if="post">
          <h1>{{ post.title }}</h1>
          <img v-if="post.image" :src="imageUrlFor(post.image).width(440)" />
          <h6>Provided by: {{ post.name }}</h6>
          <SanityBlocks :blocks="blocks" />
        </div>
      </div>
      <!-- <ExploreContainer name="Tab 2 page" /> -->
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
// import ExploreContainer from '@/components/ExploreContainer.vue';

import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { SanityBlocks } from "sanity-blocks-vue-component";
import sanity from "../sanity";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);

const post = ref([]);
const blocks = ref([])

const route = useRoute()

const query = `*[slug.current == $slug] {
  _id,
  title,
  slug,
  body,
 "image": mainImage{
  asset->{
  _id,
  url
}
},
"name":author->name,
"authorImage":author->image
}[0]
`;

/* Sanity Image Builder */
const imageUrlFor = (source) => {
  return imageBuilder.image(source);
};

/* Fetch Sanity Post */
function fetchData() {
  sanity.fetch(query, { slug: route.params.slug }).then(
    (post) => {
      post.value = post
      blocks.value = post.body
    }
  );
}

onMounted(() => {
  fetchData()
})
</script>
