var audioStatus = {};

function playAudio(audioId) {
  // Cek apakah audio sedang diputar
  if (!audioStatus[audioId]) {
    // Lakukan tindakan atau logika pemutaran audio di sini
    console.log('Audio ' + audioId + ' belum diputar.');

    // Nonaktifkan tombol setelah audio selesai
    document.getElementById('playButton' + audioId.charAt(audioId.length - 1)).disabled = true;

    // Mulai pemutaran audio
    var audioElement = document.getElementById(audioId);
    audioElement.play();

    // Tambahkan event listener untuk menangani ketika audio selesai diputar
    audioElement.addEventListener('ended', function () {
      audioEnded(audioId);
    });

    // Setel status pemutaran untuk audio tertentu
    audioStatus[audioId] = true;

    // Nonaktifkan tombol pemutaran audio lainnya
    for (var i = 1; i <= 2; i++) {
      if ('audio' + i !== audioId) {
        document.getElementById('playButton' + i).disabled = true;
      }
    }

    // Simpan status pemutaran ke localStorage
    localStorage.setItem('audioStatus', JSON.stringify(audioStatus));
  } else {
    console.log('Audio ' + audioId + ' sudah diputar.');
  }
}

function resetAudio(audioId) {
  // Hapus status pemutaran untuk audio tertentu dari localStorage
  delete audioStatus[audioId];

  // Aktifkan kembali tombol pemutaran
  document.getElementById('playButton' + audioId.charAt(audioId.length - 1)).disabled = false;

  // Aktifkan kembali tombol pemutaran audio lainnya
  for (var i = 1; i <= 2; i++) {
    if ('audio' + i !== audioId) {
      document.getElementById('playButton' + i).disabled = false;
    }
  }

  // Simpan status pemutaran yang diperbarui ke localStorage
  localStorage.setItem('audioStatus', JSON.stringify(audioStatus));
}

function resetAllAudio() {
  // Hapus status pemutaran untuk semua audio dari localStorage
  audioStatus = {};

  // Aktifkan kembali tombol pemutaran untuk semua audio
  for (var i = 1; i <= 2; i++) {
    var audioId = 'audio' + i;
    document.getElementById('playButton' + i).disabled = false;
  }

  // Simpan status pemutaran yang diperbarui ke localStorage
  localStorage.setItem('audioStatus', JSON.stringify(audioStatus));
}

// Fungsi yang akan dipanggil ketika audio selesai diputar
function audioEnded(audioId) {
  console.log('Audio ' + audioId + ' selesai diputar.');

  // Tambahkan logika atau tindakan setelah audio selesai diputar

  // Aktifkan kembali tombol pemutaran audio lainnya
  for (var i = 1; i <= 2; i++) {
    if ('audio' + i !== audioId) {
      document.getElementById('playButton' + i).disabled = false;
    }
  }
}

// Cek status pemutaran dari localStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', function () {
  var storedAudioStatus = localStorage.getItem('audioStatus');
  if (storedAudioStatus) {
    audioStatus = JSON.parse(storedAudioStatus);

    // Nonaktifkan tombol untuk audio yang sudah diputar
    for (var audioId in audioStatus) {
      if (audioStatus[audioId]) {
        document.getElementById('playButton' + audioId.charAt(audioId.length - 1)).disabled = true;
        console.log('Audio ' + audioId + ' sudah diputar.');
      }
    }
  }
});

// Larangan Reload Browser
window.addEventListener('beforeunload', function (event) {
  // Membuat pesan peringatan kustom
  var warningMessage = 'Apakah Anda yakin ingin me-reload halaman?';

  // Standar untuk menampilkan pesan peringatan
  event.returnValue = warningMessage; // For some browsers
  return warningMessage;
});
