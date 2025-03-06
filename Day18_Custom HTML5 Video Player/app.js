// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled'); // Fix selector
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Toggle Play/Pause
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

// Update Play/Pause Button
function updateBtn() {
    toggle.textContent = video.paused ? '⏵' : '⏸';
}

// Skip Forward or Backward
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// Handle Volume & Speed Range Inputs
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// Update Progress Bar
function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
}

// Seek Video When Clicking on Progress Bar
function seekVideo(event) {
    const clickX = event.offsetX;
    const progressWidth = progress.clientWidth;
    const seekTime = (clickX / progressWidth) * video.duration;
    video.currentTime = seekTime;
}

// Event Listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeupdate', handleProgress); // Update progress bar

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
progress.addEventListener('click', seekVideo);
