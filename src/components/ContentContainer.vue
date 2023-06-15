<script setup>
import { IonContent } from '@ionic/vue'
import { onMounted, ref } from 'vue';
import sanity from '../sanity'
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);

let posts = ref([])

const query = `*[ _type == 'post']{
        _id,
        title,
        slug,
        "image": mainImage{
        asset->{
        _id,
        url,
      }
    },
}[0...20]`;

/* Sanity Image Builder */
const imageUrlFor = (source) => {
    return imageBuilder.image(source);
};

/* Fetch Sanity Posts */
function fetchData() {
    sanity.fetch(query).then(
        postResults => {
            posts.value = postResults;
        }
    );
}

onMounted(() => {
    fetchData()
})

</script>

<template>
    <ion-content class="ion-padding">
        <!-- <h1>{{ title }}</h1> -->
        <div class="content" v-if="posts">
            <div v-for="post in posts" class="post-item" :key="post._id">
                <!-- <router-link :to="{name: 'Post', params: { slug } }"> -->
                <router-link :to="`/posts/${post.slug.current}`">
                    <div>
                        <img style="width:400px;" :src="imageUrlFor(post.image)" alt="post image" />
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">{{ post.title }}</div>
                          <!--  <p class="text-gray-700 text-base">
                                {{ post.excerpt }}
                            </p> -->
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </ion-content>
</template>

<style>
.post-item {
    display: flex;
}
</style>