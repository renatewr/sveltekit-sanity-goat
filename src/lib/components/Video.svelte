<!-- Video.svelte -->
<script lang="ts">
    import {buildFileUrl} from '@sanity/asset-utils'
	export let portableText;
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  const dataset = import.meta.env.VITE_SANITY_DATASET;
  const {muted, caption}  = portableText.value;
  const [_file, id, extension] = portableText.value.fallback.asset._ref.split('-');

  export let fileUrl  = buildFileUrl({assetId: id, projectId, dataset,extension});
    
    
    // These values are bound to properties of the video
	
	
</script>

<div>
	{#if fileUrl}
<video
  title="{caption}" 
  muted 
  playsInline 
  controls
  autoplay 
  loop
  src={fileUrl}
  >
  <!-- <source data-src={portableText.value.webmAsset.url} type={`video/${portableText.value.webmAsset.extension}`} /> -->
    <source data-src={fileUrl} type={`video/mp4`} />
  </video>
{/if}
</div>

<style>


	video {
		width: 100%;
	}
</style>
