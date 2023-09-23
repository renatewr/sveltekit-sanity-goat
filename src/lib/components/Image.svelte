<script>
    import { urlForImage } from "$lib/config/sanity";
    export let portableText;
</script>

<img class="h-150 w-full object-cover rounded-xl mb-10" src={urlForImage(portableText.value).url()} alt="" />