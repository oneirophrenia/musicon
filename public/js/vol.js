document.addEventListener('DOMContentLoaded', function() {
    const vol = document.getElementById('vol');
    const vol_bar = document.querySelector('.vol_bar');
    const vol_dot = document.getElementById('vol_dot');
    const vol_icon = document.getElementById('vol_icon');
    
    // Set initial volume
    audioElement.volume = vol.value / 100;
    
    vol.addEventListener('input', function() {
        const value = this.value;
        vol_bar.style.width = value + '%';
        vol_dot.style.left = value + '%';
        audioElement.volume = value / 100;
        
        // Change icon based on volume level
        if (value > 50) {
            vol_icon.classList.remove('bi-volume-down-fill');
            vol_icon.classList.add('bi-volume-up-fill');
        } else if (value > 0) {
            vol_icon.classList.remove('bi-volume-up-fill');
            vol_icon.classList.add('bi-volume-down-fill');
        } else {
            vol_icon.classList.remove('bi-volume-down-fill');
            vol_icon.classList.add('bi-volume-mute-fill');
        }
    });
});