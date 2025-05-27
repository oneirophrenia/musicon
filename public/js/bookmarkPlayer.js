document.addEventListener('DOMContentLoaded', () => {
    // Элементы управления
    const audio = new Audio();
    const playBtn = document.getElementById('bookmarkMasterPlay');
    const prevBtn = document.getElementById('bookmarkPrevious');
    const nextBtn = document.getElementById('bookmarkNext');
    const progress = document.getElementById('bookmarkProgress');
    const progressDot = document.getElementById('bookmarkProgressDot');
    const progressContainer = document.querySelector('.bookmark-progress-container');
    const currentTimeEl = document.getElementById('bookmarkCurrentTime');
    const durationEl = document.getElementById('bookmarkDuration');
    const songNameEl = document.getElementById('bookmarkMasterSongName');
    const gifEl = document.getElementById('bookmarkGif');
    const volumeIcon = document.getElementById('bookmarkVolumeIcon');
    const volumeProgress = document.getElementById('bookmarkVolumeProgress');
    const volumeDot = document.getElementById('bookmarkVolumeDot');
    const volumeBar = document.querySelector('.bookmark-volume-bar');

    // Состояние плеера
    let currentSongIndex = 0;
    let savedSongs = JSON.parse(localStorage.getItem('savedSongs')) || [];
    let isDraggingProgress = false;
    let isDraggingVolume = false;

    // Основные функции плеера
    function loadSong() {
        if (savedSongs.length === 0) return;
        
        const songId = savedSongs[currentSongIndex];
        const song = window.songs.find(s => s.filePath === songId);
        
        if (!song) return;
        
        songNameEl.textContent = song.songName;
        audio.src = song.filePath;
        audio.load();
    }

    function playSong() {
        if (savedSongs.length === 0) return;
        
        playBtn.classList.remove('fa-play-circle');
        playBtn.classList.add('fa-pause-circle');
        gifEl.style.opacity = 1;
        audio.play();
    }

    function pauseSong() {
        playBtn.classList.remove('fa-pause-circle');
        playBtn.classList.add('fa-play-circle');
        gifEl.style.opacity = 0;
        audio.pause();
    }

    function updateProgress(e) {
        if (isDraggingProgress) return;
        
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        progressDot.style.left = `${progressPercent}%`;
        currentTimeEl.textContent = formatTime(currentTime);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    function nextSong() {
        if (savedSongs.length === 0) return;
        
        currentSongIndex = (currentSongIndex + 1) % savedSongs.length;
        loadSong();
        playSong();
    }

    function prevSong() {
        if (savedSongs.length === 0) return;
        
        currentSongIndex = (currentSongIndex - 1 + savedSongs.length) % savedSongs.length;
        loadSong();
        playSong();
    }

    // Управление громкостью
    function setVolume(e) {
        const width = volumeBar.clientWidth;
        const clickX = e.offsetX;
        const volume = Math.min(1, Math.max(0, clickX / width));
        audio.volume = volume;
        updateVolumeUI(volume);
    }

    function updateVolumeUI(volume) {
        volumeProgress.style.width = `${volume * 100}%`;
        volumeDot.style.left = `${volume * 100}%`;
        
        if (volume === 0) {
            volumeIcon.classList.remove('fa-volume-up', 'fa-volume-down');
            volumeIcon.classList.add('fa-volume-mute');
        } else if (volume < 0.5) {
            volumeIcon.classList.remove('fa-volume-up', 'fa-volume-mute');
            volumeIcon.classList.add('fa-volume-down');
        } else {
            volumeIcon.classList.remove('fa-volume-down', 'fa-volume-mute');
            volumeIcon.classList.add('fa-volume-up');
        }
    }

    function toggleMute() {
        if (audio.volume > 0) {
            audio.volume = 0;
            updateVolumeUI(0);
        } else {
            audio.volume = 0.8;
            updateVolumeUI(0.8);
        }
    }

    // Инициализация
    function initPlayer() {
        if (savedSongs.length > 0) {
            loadSong();
            audio.volume = 0.8;
            updateVolumeUI(0.8);
        } else {
            songNameEl.textContent = "Нет сохраненных песен";
        }

        // Обработчики событий
        playBtn.addEventListener('click', () => audio.paused ? playSong() : pauseSong());
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', nextSong);
        audio.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(audio.duration);
        });

        progressContainer.addEventListener('click', setProgress);
        volumeBar.addEventListener('click', setVolume);
        volumeIcon.addEventListener('click', toggleMute);

        // Перетаскивание прогресс-бара
        progressDot.addEventListener('mousedown', () => isDraggingProgress = true);
        document.addEventListener('mousemove', (e) => {
            if (isDraggingProgress) {
                const rect = progressContainer.getBoundingClientRect();
                const percent = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
                progress.style.width = `${percent * 100}%`;
                progressDot.style.left = `${percent * 100}%`;
                audio.currentTime = percent * audio.duration;
                currentTimeEl.textContent = formatTime(audio.currentTime);
            }
        });
        document.addEventListener('mouseup', () => isDraggingProgress = false);

        // Перетаскивание громкости
        volumeDot.addEventListener('mousedown', () => isDraggingVolume = true);
        document.addEventListener('mousemove', (e) => {
            if (isDraggingVolume) {
                const rect = volumeBar.getBoundingClientRect();
                const volume = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
                audio.volume = volume;
                updateVolumeUI(volume);
            }
        });
        document.addEventListener('mouseup', () => isDraggingVolume = false);
    }

    // Обновляем при изменении закладок
    window.addEventListener('storage', () => {
        savedSongs = JSON.parse(localStorage.getItem('savedSongs')) || [];
        currentSongIndex = 0;
        initPlayer();
    });

    // Воспроизведение из списка
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('bookmark-play-btn')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            if (!isNaN(index) && index >= 0 && index < savedSongs.length) {
                currentSongIndex = index;
                loadSong();
                playSong();
            }
        }
    });

    initPlayer();
});
