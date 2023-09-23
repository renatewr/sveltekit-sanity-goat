<script lang="ts">
  import { previewSubscription } from "$lib/config/sanity";
  import { postQuery } from "$lib/config/sanity/queries";
  import { urlForImage } from "$lib/config/sanity";
  import type { PageData } from "./$types";
  import Header from "$lib/components/Header.svelte";
  import {PortableText} from '@portabletext/svelte';
  import Body from '$lib/components/Body.svelte';
  import Video from '$lib/components/Video.svelte';
  import Image from '$lib/components/Image.svelte';
  
  export let data: PageData;

  $: ({ initialData, previewMode, slug } = data);
  $: ({ data: postData } = previewSubscription(postQuery, {
    params: { slug },
    initialData,
    enabled: previewMode && !!slug,
  }));
</script>

<svelte:head>
  <title>{$postData?.post?.title || "Post"}</title>
</svelte:head>
<Header />

{#if $postData?.post}
  <div class="relative w-full bg-white min-h-screen px-4 pt-4 pb-20 sm:px-6 lg:px-8 lg:pt-8 lg:pb-28">
    <div class="relative mx-auto max-w-2xl">
      <article class="w-full space-y-2 text-brand text-4lg">
        <div>
          <a href="/" class="hover:underline font-bold text-sm text-brand">← Back to home</a>
        </div>
        <div>
          <h1 class="text-4xl font-bold text-brand">{$postData.post.title}</h1>
          <div class="mt-3 flex items-center">
            <!-- <div class="ml-3">
              <p class="text-sm font-medium text-white">{$postData.post.author.name}</p>
              <div class="flex space-x-1 text-sm text-gray-400">
                <time datetime="2020-03-16">
                  {new Date($postData.post.date).toLocaleDateString()}
                </time>
              </div>
            </div> -->
          </div>
        </div>
        {#if $postData.post.coverImage}
        <img
          class="h-150 w-full object-cover rounded-xl mb-10"
          src={urlForImage($postData.post.coverImage).crop("focalpoint").width(1344).url()}
          alt=""
        />
        {/if}
        <p class="mt-3 text-base text-brand">
          {$postData.post.postContent}
        </p>
        <PortableText
  value={$postData.post.body}
  components={{
    types: {
      image: Image,
      videoAnimation: Video,
    },
    marks: {
      body: Body,
    }
  }}
  
/>
{#if $postData.post.author}
<div class="flex-shrink-0">
  <span class="sr-only">Image</span>
  <img
    class="h-10 w-10 rounded-full"
    src={urlForImage($postData.post.author.picture).crop("focalpoint").width(256).height(256).url()}
    alt=""
  />
</div>
{/if}
      </article>
    </div>
  </div>
{/if}
