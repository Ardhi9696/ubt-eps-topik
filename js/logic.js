var audio;
// Ambil tombol audio
var playButton = document.getElementById('playButton');
// Cek status pemutaran audio di localStorage
var audioPlayed = localStorage.getItem('audioPlayed') === 'true';

const btnPlay = document.querySelector('.btn-play');
const btnPlaying = document.querySelector('.btn-playing');
const btnEnded = document.querySelector('.btn-ended');

// Tampilkan tombol audio sesuai dengan status pemutaran
if (audioPlayed) {
  btnEnded.classList.toggle('d-none');
  btnPlay.classList.toggle('d-none');
  playButton.disabled = true;
}

function playAudio() {
  // Cek apakah audio sudah diputar
  if (!audio) {
    // Buat elemen audio
    audio = new Audio('Audio/Soal-1/soal-1.mp3');

    // Putar audio
    audio.play();
    btnPlaying.classList.toggle('d-none');
    btnPlay.classList.toggle('d-none');

    console.log('Audio diputar!');

    // Setel status pemutaran di localStorage
    localStorage.setItem('audioPlayed', 'true');

    // Tambahkan event listener untuk mendeteksi saat audio selesai
    audio.addEventListener('ended', function () {
      btnEnded.classList.toggle('d-none');
      btnPlaying.classList.toggle('d-none');
      // Setel variabel audio menjadi null setelah audio selesai
      audio = null;

      // Setel tombol play menjadi disabled setelah audio selesai
      playButton.disabled = true;
    });
  }
}

// Larangan Reload Browser
window.addEventListener('beforeunload', function (event) {
  // Membuat pesan peringatan kustom
  var warningMessage = 'Apakah Anda yakin ingin me-reload halaman?';

  // Standar untuk menampilkan pesan peringatan
  event.returnValue = warningMessage; // For some browsers
  return warningMessage;
});

// Reset Audio

function resetAudio() {
  localStorage.removeItem('audioPlayed');
  playButton.disabled = false;
}
