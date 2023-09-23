<!-- Video.svelte -->
<script lang="ts">
    import {buildFileUrl} from '@sanity/asset-utils'
  export let portableText;
  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
  const dataset = import.meta.env.VITE_SANITY_DATASET;
  console.log(portableText.value.fallback.asset['_ref']);
  console.log(`https://${projectId}.apicdn.sanity.io/v<YYYY-MM-DD>/<path>`)
  const [_file, id, extension] = portableText.value.fallback.asset._ref.split('-');
      // The URL to access your file should be of the form
      // https://cdn.sanity.io/files/{PROJECT_ID}/{DATASET}/{FILE ID}.{FILE EXTENSION}
    //   return (
    //     <a href={`https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${extension}?dl=${id}.${extension}`}>
    //       {children}
    //     </a>
    //   );
    let fileUrl = buildFileUrl({assetId: id, projectId, dataset,extension});
    
    // These values are bound to properties of the video
	let time = 0;
	let duration: number;
	let paused = true;

	let showControls = true;
	let showControlsTimeout;

	// Used to track time of last mouse down event
	let lastMouseDown;

	function handleMove(e) {
		// Make the controls visible, but fade out after
		// 2.5 seconds of inactivity
		clearTimeout(showControlsTimeout);
		showControlsTimeout = setTimeout(() => (showControls = false), 2500);
		showControls = true;

		if (!duration) return; // video not loaded yet
		if (e.type !== 'touchmove' && !(e.buttons & 1)) return; // mouse not down

		const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
		const { left, right } = this.getBoundingClientRect();
		time = (duration * (clientX - left)) / (right - left);
	}

	// we can't rely on the built-in click event, because it fires
	// after a drag — we have to listen for clicks ourselves
	function handleMousedown(e) {
		lastMouseDown = new Date();
	}

	function handleMouseup(e) {
		if (new Date() - lastMouseDown < 300) {
			if (paused) e.target.play();
			else e.target.pause();
		}
	}

	function format(seconds) {
		if (isNaN(seconds)) return '...';

		const minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);
		if (seconds < 10) seconds = '0' + seconds;

		return `${minutes}:${seconds}`;
	}
</script>

<div>
<video
  title={""} muted playsInline
  src={fileUrl}
  on:mousemove={handleMove}
  on:touchmove|preventDefault={handleMove}
  on:mousedown={handleMousedown}
  on:mouseup={handleMouseup}
  bind:currentTime={time}
  bind:duration
  bind:paused
  >
  <!-- <source data-src={portableText.value.webmAsset.url} type={`video/${portableText.value.webmAsset.extension}`} /> -->
  <source data-src={fileUrl} type={`video/mp4`} />
  <track kind="captions" />

</video>
<div class="controls" style="opacity: {duration && showControls ? 1 : 0}">
    <progress value={time / duration || 0} />

    <div class="info">
        <span class="time">{format(time)}</span>
        <span>click anywhere to {paused ? 'play' : 'pause'} / drag to seek</span>
        <span class="time">{format(duration)}</span>
    </div>
</div>
</div>

<style>
	div {
		position: relative;
	}

	.controls {
		position: absolute;
		top: 0;
		width: 100%;
		transition: opacity 1s;
	}

	.info {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}

	span {
		padding: 0.2em 0.5em;
		color: white;
		text-shadow: 0 0 8px black;
		font-size: 1.4em;
		opacity: 0.7;
	}

	.time {
		width: 3em;
	}

	.time:last-child {
		text-align: right;
	}

	progress {
		display: block;
		width: 100%;
		height: 10px;
		-webkit-appearance: none;
		appearance: none;
	}

	progress::-webkit-progress-bar {
		background-color: rgba(0, 0, 0, 0.2);
	}

	progress::-webkit-progress-value {
		background-color: rgba(255, 255, 255, 0.6);
	}

	video {
		width: 100%;
	}
</style>
