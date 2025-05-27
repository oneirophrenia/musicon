document.addEventListener('DOMContentLoaded', () => {
    // Инициализация сохраненных песен
    let savedSongs = JSON.parse(localStorage.getItem('savedSongs')) || [];
    
    // Функция для сохранения/удаления песни
    function toggleSaveSong(songId) {
        const index = savedSongs.indexOf(songId);
        if (index === -1) {
            savedSongs.push(songId);
        } else {
            savedSongs.splice(index, 1);
        }
        localStorage.setItem('savedSongs', JSON.stringify(savedSongs));
        updateSaveButtons();
        if (window.location.pathname === '/library') {
            updateSavedSongsList();
        }
    }

    // Обновление состояния кнопок сохранения
    function updateSaveButtons() {
        document.querySelectorAll('.save-btn').forEach(btn => {
            const songId = btn.getAttribute('data-song-id');
            btn.classList.toggle('saved', savedSongs.includes(songId));
        });
    }

    // Обновление списка сохраненных песен (для страницы библиотеки)
    function updateSavedSongsList() {
        const savedSongsList = document.getElementById('savedSongsList');
        if (!savedSongsList) return;
        
        savedSongsList.innerHTML = '';
        
        if (savedSongs.length === 0) {
            savedSongsList.innerHTML = '<p class="no-songs">Нет сохраненных песен</p>';
            return;
        }

        savedSongs.forEach(songId => {
            const song = window.songs.find(s => s.filePath === songId);
            if (song) {
                const songItem = document.createElement('div');
                songItem.className = 'songitem';
                songItem.innerHTML = `
                    <img src="${song.coverPath}" alt="${song.songName}" />
                    <span class="songName">${song.songName}</span>
                    <span class="songlistplay">
                        <i class="far fa-play-circle songItemPlay" data-song-id="${song.filePath}"></i>
                        <i class="fas fa-bookmark saved remove-bookmark" data-song-id="${song.filePath}" title="Удалить из закладок"></i>
                    </span>
                `;
                savedSongsList.appendChild(songItem);
            }
        });

        // Добавляем обработчики для новых элементов
        document.querySelectorAll('.remove-bookmark').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const songId = this.getAttribute('data-song-id');
                toggleSaveSong(songId);
            });
        });
    }

    // Обработчик кликов для кнопок сохранения
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('save-btn')) {
            const songId = e.target.getAttribute('data-song-id');
            e.target.classList.toggle('saved');
            toggleSaveSong(songId);
        }
    });

    // Инициализация
    updateSaveButtons();
    if (window.location.pathname === '/library') {
        updateSavedSongsList();
    }
});