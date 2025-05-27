document.addEventListener('DOMContentLoaded', () => {
    // Элементы управления
    const audio = new Audio();
    const playBtn = document.getElementById('masterPlay');
    const prevBtn = document.getElementById('previous');
    const nextBtn = document.getElementById('next');
    const progress = document.getElementById('progress');
    const progressDot = document.getElementById('progressDot');
    const progressContainer = document.querySelector('.progress-bar');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const songNameEl = document.getElementById('masterSongName');
    const gifEl = document.getElementById('gif');
    const volumeIcon = document.getElementById('volumeIcon');
const volumeProgress = document.getElementById('volumeProgress');
const volumeDot = document.getElementById('volumeDot');
const volumeBar = document.querySelector('.volume-bar');
    // Песни
    const songs = [
       { songName: "Siouxsie & The Banshees - Happy House", filePath: "songs/4.mp3", coverPath: "covers/Siouxsie & The Banshees - Happy House.jpg" },
    { songName: "Siouxsie & The Banshees - Spellbound", filePath: "songs/5.mp3", coverPath: "covers/Siouxsie & The Banshees - Spellbound.jpeg" },
    { songName: "Siouxsie & The Banshees - She's a Carnival", filePath: "songs/28.mp3", coverPath: "covers/Siouxsie & The Banshees - She's a Carnival.jpg" },
    { songName: "Siouxsie & The Banshees - Cities in Dust", filePath: "songs/63.mp3", coverPath: "covers/Siouxsie & The Banshees - Cities in Dust.png" },

    { songName: "Type O Negative - Love You to Death", filePath: "songs/11.mp3", coverPath: "covers/Type O Negative - Love You to Death.jpg" },
    { songName: "Type O Negative - Green Man", filePath: "songs/12.mp3", coverPath: "covers/Type O Negative - Green Man.png" },
    { songName: "Type O Negative - Nettie", filePath: "songs/17.mp3", coverPath: "covers/Type O Negative - Nettie.png" },
    { songName: "Type O Negative - Wolf Moon (including Zoanthropic Paranoia)", filePath: "songs/31.mp3", coverPath: "covers/Type O Negative - Wolf Moon (including Zoanthropic Paranoia).png" },

    { songName: "Depeche Mode - Stripped", filePath: "songs/13.mp3", coverPath: "covers/Depeche Mode - Stripped.jpg" },
    { songName: "Depeche Mode - Never Let Me Down Again", filePath: "songs/43.mp3", coverPath: "covers/Depeche Mode - Never Let Me Down Again.jpg" },
    { songName: "Depeche Mode - Enjoy The Silence", filePath: "songs/44.mp3", coverPath: "covers/Depeche Mode - Enjoy The Silence.jpg" },
    { songName: "Depeche Mode - Walking in My Shoes", filePath: "songs/60.mp3", coverPath: "covers/Depeche Mode - Walking in My Shoes.jpg" },

    { songName: "The Cure - Disintegration", filePath: "songs/1.mp3", coverPath: "covers/The Cure - Disintegration.jpg" },
    { songName: "The Cure - Wathing Me Fall", filePath: "songs/9.mp3", coverPath: "covers/The Cure - Wathing Me Fall.jpg" },
    { songName: "The Cure - Let's Go To Bed", filePath: "songs/58.mp3", coverPath: "covers/The Cure - Let's Go To Bed.jpg" },

    { songName: "KMFDM - Help Us, Save Us, Take Us Away", filePath: "songs/2.mp3", coverPath: "covers/KMFDM - Help Us, Save Us, Take Us Away.jpg" },
    { songName: "KMFDM - Professional Killer", filePath: "songs/68.mp3", coverPath: "covers/KMFDM - Professional Killer.jpg" },
    { songName: "KMFDM - Stray Bullet", filePath: "songs/10.mp3", coverPath: "covers/KMFDM - Stray Bullet.png" },

    { songName: "She Wants Revenge - Tear You Apart", filePath: "songs/21.mp3", coverPath: "covers/She Wants Revenge - Tear You Apart.jpg" },
    { songName: "She Wants Revenge - Checking Out", filePath: "songs/45.mp3", coverPath: "covers/She Wants Revenge - Checking Out.jpg" },
    { songName: "She Wants Revenge - Your Love", filePath: "songs/55.mp3", coverPath: "covers/She Wants Revenge - Your Love.png" },

    { songName: "HIM - Too Happy To Be Alive", filePath: "songs/19.mp3", coverPath: "covers/HIM - Too Happy To Be Alive.jpg" },
    { songName: "HIM - Join Me in Death", filePath: "songs/20.mp3", coverPath: "covers/HIM - Join Me in Death.jpg" },
    { songName: "HIM - Pretending", filePath: "songs/48.mp3", coverPath: "covers/HIM - Pretending.jpg" },

    { songName: "The Neighbourhood - A Little Death", filePath: "songs/24.mp3", coverPath: "covers/The Neighbourhood - A Little Death.jpg" },
    { songName: "The Neighbourhood - Afraid", filePath: "songs/65.mp3", coverPath: "covers/The Neighbourhood - Afraid.jpeg" },
    { songName: "The Neighbourhood - Sweater Weather", filePath: "songs/30.mp3", coverPath: "covers/The Neighbourhood - Sweater Weather.jpg" },

    { songName: "Lana Del Rey - Born To Die", filePath: "songs/23.mp3", coverPath: "covers/Lana Del Rey - Born To Die.jpg" },
    { songName: "Lana Del Rey - West Coast", filePath: "songs/26.mp3", coverPath: "covers/Lana Del Rey - West Coast.png" },

    { songName: "Lana Del Rey - Young And Beautiful", filePath: "songs/39.mp3", coverPath: "covers/Lana Del Rey - Young And Beautiful.jpeg" },
    { songName: "Deftones - Change (In the House of Flies)", filePath: "songs/53.mp3", coverPath: "covers/Deftones - Change (In the House of Flies).jpeg" },

    { songName: "Deftones - Beauty School", filePath: "songs/40.mp3", coverPath: "covers/Deftones - Beauty School.jpg" },
    { songName: "Deftones - (L)MIRL", filePath: "songs/64.mp3", coverPath: "covers/Deftones - (L)MIRL.jpg" },

    { songName: "Nirvana - Heart-Shaped Box", filePath: "songs/42.mp3", coverPath: "covers/Nirvana - Heart-Shaped Box.jpg" },
    { songName: "Nirvana - Something In The Way", filePath: "songs/70.mp3", coverPath: "covers/Nirvana - Something In The Way.jpg" },

    { songName: "Nirvana - Love Buzz", filePath: "songs/50.mp3", coverPath: "covers/Nirvana - Love Buzz.jpg" },
    { songName: "Björk - Play Dead", filePath: "songs/61.mp3", coverPath: "covers/Björk - Play Dead.jpg" },

    { songName: "Björk - Army Of Me", filePath: "songs/62.mp3", coverPath: "covers/Björk - Army Of Me.jpg" },
    { songName: "Björk - Hidden Place", filePath: "songs/69.mp3", coverPath: "covers/Björk - Hidden Place.jpg" },

    { songName: "Adele - Rolling In The Deep", filePath: "songs/25.mp3", coverPath: "covers/Adele - Rolling In The Deep.jpg" },
    { songName: "Adele - I Miss You", filePath: "songs/29.mp3", coverPath: "covers/Adele - I Miss You.jpg" },

    { songName: "Adele - Skyfall", filePath: "songs/3.mp3", coverPath: "covers/Adele - Skyfall.jpg" },
    { songName: "New Order - True Faith", filePath: "songs/6.mp3", coverPath: "covers/New Order - True Faith.jpg" },
    { songName: "New Order - Blue Monday", filePath: "songs/7.mp3", coverPath: "covers/New Order - Blue Monday.jpg" },
    { songName: "New Order - Regret", filePath: "songs/8.mp3", coverPath: "covers/New Order - Regret.jpg" },   
    { songName: "Duran Duran - Come Undone", filePath: "songs/14.mp3", coverPath: "covers/Duran Duran - Come Undone.jpeg" },
    { songName: "Duran Duran - INVISIBLE", filePath: "songs/15.mp3", coverPath: "covers/Duran Duran - INVISIBLE.jpg" },
    { songName: "Duran Duran - Ordinary World", filePath: "songs/16.mp3", coverPath: "covers/Duran Duran - Ordinary World.jpg" },
    { songName: "The Cranberries - Linger", filePath: "songs/18.mp3", coverPath: "covers/The Cranberries - Linger.jpg" },  
    { songName: "The Cranberries - Dreams", filePath: "songs/22.mp3", coverPath: "covers/The Cranberries - Dreams.jpg" },       
    { songName: "The Cranberries - Zombie", filePath: "songs/27.mp3", coverPath: "covers/The Cranberries - Zombie.jpg" },
    { songName: "Radiohead - Just", filePath: "songs/32.mp3", coverPath: "covers/Radiohead - Just.jpg" },
    { songName: "Radiohead - Exit Music (For A Film)", filePath: "songs/33.mp3", coverPath: "covers/Radiohead - Exit Music (For A Film).jpg" },
    { songName: "Radiohead - All I Need", filePath: "songs/34.mp3", coverPath: "covers/Radiohead - All I Need.jpg" },
    { songName: "Soundgarden - Black Hole Sun", filePath: "songs/35.mp3", coverPath: "covers/Soundgarden - Black Hole Sun.jpeg" },
    { songName: "Soundgarden - Outshined", filePath: "songs/36.mp3", coverPath: "covers/Soundgarden - Outshined.jpg" },
    { songName: "Soundgarden - Blow Up The Outside World", filePath: "songs/37.mp3", coverPath: "covers/Soundgarden - Blow Up The Outside World.jpg" },
    { songName: "Alice In Chains - Bleed The Freak", filePath: "songs/38.mp3", coverPath: "covers/Alice In Chains - Bleed The Freak.jpeg" },    
    { songName: "Alice In Chains - Would", filePath: "songs/41.mp3", coverPath: "covers/Alice In Chains - Would.jpeg" },
    { songName: "Alice In Chains - Grind", filePath: "songs/46.mp3", coverPath: "covers/Alice In Chains - Grind.png" },
    { songName: "Boa - Fool", filePath: "songs/47.mp3", coverPath: "covers/Boa - Fool.jpg" },
    { songName: "Boa - Twilight", filePath: "songs/49.mp3", coverPath: "covers/Boa - Twilight.jpg" },
    { songName: "Boa - Duvet", filePath: "songs/51.mp3", coverPath: "covers/Boa - Duvet.jpg" },
    { songName: "Daughter - All I Wanted", filePath: "songs/52.mp3", coverPath: "covers/Daughter - All I Wanted.png" },
    { songName: "Daughter - No Care", filePath: "songs/54.mp3", coverPath: "covers/Daughter - No Care.png" },
    { songName: "Daughter - Burn it Down", filePath: "songs/56.mp3", coverPath: "covers/Daughter - Burn it Down.png" },
    { songName: "Brody Dalle - Don't Mess With Me", filePath: "songs/57.mp3", coverPath: "covers/Brody Dalle - Don't Mess With Me.jpg" },
    { songName: "Pretty Vicious - Are You Ready For Me", filePath: "songs/66.mp3", coverPath: "covers/Pretty Vicious - Are You Ready For Me.png" },
    { songName: "Wolf Alice - Bros", filePath: "songs/67.mp3", coverPath: "covers/Wolf Alice - Bros.jpg" },
    { songName: "Speedy Ortiz - No Below", filePath: "songs/71.mp3", coverPath: "covers/Speedy Ortiz - No Below.png" },
    { songName: "Lanterns on the Lake - Through The Cellar Door", filePath: "songs/72.mp3", coverPath: "covers/Lanterns on the Lake - Through The Cellar Door.png" },
    { songName: "Syd Matters - Obstacles", filePath: "songs/59.mp3", coverPath: "covers/Syd Matters - Obstacles.png" },
       
    ];
    
    let songIndex = 0;
    
	
    // Загрузка песни
    function loadSong(song) {
        songNameEl.textContent = song.songName;
        audio.src = song.filePath;
    }
    
    // Воспроизведение
    function playSong() {
        playBtn.classList.remove('fa-play-circle');
        playBtn.classList.add('fa-pause-circle');
        gifEl.style.opacity = 1;
        audio.play();
    }
    
    // Пауза
    function pauseSong() {
        playBtn.classList.remove('fa-pause-circle');
        playBtn.classList.add('fa-play-circle');
        gifEl.style.opacity = 0;
        audio.pause();
    }
    
    // Обновление прогресс-бара
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        progressDot.style.left = `${progressPercent}%`;
        
        // Обновление времени
        currentTimeEl.textContent = formatTime(currentTime);
        
        // Автопереход к следующей песне
        if (duration - currentTime < 0.5) {
            nextSong();
        }
    }
    
    // Форматирование времени
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Установка прогресса при клике
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }
    
    // Следующая песня
    function nextSong() {
        songIndex = (songIndex + 1) % songs.length;
        loadSong(songs[songIndex]);
        playSong();
    }
    
    // Предыдущая песня
    function prevSong() {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        loadSong(songs[songIndex]);
        playSong();
    }
    
    // Инициализация
    loadSong(songs[songIndex]);
    
    // События
    playBtn.addEventListener('click', () => {
        audio.paused ? playSong() : pauseSong();
    });
    
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
    });
    
    progressContainer.addEventListener('click', setProgress);
    
    // Инициализация элементов песен
    document.querySelectorAll('.songItemPlay').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            playSong();
        });
    });
	// Установка начальной громкости
audio.volume = 0.8;

// Функция обновления иконки громкости
function updateVolumeIcon() {
  if (audio.volume === 0) {
    volumeIcon.classList.remove('fa-volume-up');
    volumeIcon.classList.remove('fa-volume-down');
    volumeIcon.classList.add('fa-volume-mute');
  } else if (audio.volume < 0.5) {
    volumeIcon.classList.remove('fa-volume-up');
    volumeIcon.classList.add('fa-volume-down');
    volumeIcon.classList.remove('fa-volume-mute');
  } else {
    volumeIcon.classList.add('fa-volume-up');
    volumeIcon.classList.remove('fa-volume-down');
    volumeIcon.classList.remove('fa-volume-mute');
  }
}

// Установка громкости
function setVolume(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const volume = clickX / width;
  audio.volume = volume;
  volumeProgress.style.width = `${volume * 100}%`;
  volumeDot.style.left = `${volume * 100}%`;
  updateVolumeIcon();
}

// Клик по иконке громкости - mute/unmute
volumeIcon.addEventListener('click', () => {
  if (audio.volume > 0) {
    audio.volume = 0;
    volumeProgress.style.width = '0%';
    volumeDot.style.left = '0%';
  } else {
    audio.volume = 0.8;
    volumeProgress.style.width = '80%';
    volumeDot.style.left = '80%';
  }
  updateVolumeIcon();
});

// Перетаскивание ползунка громкости
volumeBar.addEventListener('click', setVolume);

let isVolumeDragging = false;

volumeDot.addEventListener('mousedown', () => {
  isVolumeDragging = true;
});

document.addEventListener('mousemove', (e) => {
  if (isVolumeDragging) {
    const volumeRect = volumeBar.getBoundingClientRect();
    let volume = (e.clientX - volumeRect.left) / volumeRect.width;
    volume = Math.max(0, Math.min(1, volume));
    audio.volume = volume;
    volumeProgress.style.width = `${volume * 100}%`;
    volumeDot.style.left = `${volume * 100}%`;
    updateVolumeIcon();
  }
});

document.addEventListener('mouseup', () => {
  isVolumeDragging = false;
});

// Инициализация
updateVolumeIcon();
});
// Интеграция с закладками
function updateBookmarkButtons() {
    document.querySelectorAll('.save-btn').forEach(btn => {
        const songId = btn.getAttribute('data-song-id');
        const isSaved = BookmarkManager.isSongSaved(songId);
        
        if (isSaved) {
            btn.innerHTML = '<i class="fas fa-bookmark"></i>';
            btn.classList.add('saved');
        } else {
            btn.innerHTML = '<i class="far fa-bookmark"></i>';
            btn.classList.remove('saved');
        }
    });
}

// Вызывать при смене песни
audio.addEventListener('play', updateBookmarkButtons);