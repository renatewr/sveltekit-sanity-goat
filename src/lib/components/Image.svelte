<script>
    import { urlForImage } from "$lib/config/sanity";
    export let portableText;
    
    const {caption, attribution, alt} = portableText.value;

</script>

<figure>
    {#if portableText.value}
    <img class="h-150 w-full object-cover rounded-xl mb-2" src={urlForImage(portableText.value).url()} alt="" />
    {/if}
    <figcaption class="flex items-center justify-between">
        <span class="shrink-0">{#if caption}{caption}{/if}</span><span class="shrink-0">{#if attribution}📷 {attribution}{/if}</span>
    </figcaption>
</figure>