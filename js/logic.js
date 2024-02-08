// Inisialisasi objek untuk melacak status pemutaran masing-masing audio
var audioStatus = {};

function playAudio(audioId) {
  // Cek apakah audio sedang diputar
  if (!audioStatus[audioId]) {
    // Lakukan tindakan atau logika pemutaran audio di sini
    console.log("Audio " + audioId + " belum diputar.");

    // Nonaktifkan tombol setelah audio selesai
    document.querySelector(
      '.playButton[data-audio="' + audioId + '"]'
    ).disabled = true;

    // Mulai pemutaran audio
    var audioElement = document.getElementById(audioId);
    audioElement.play();

    // Tambahkan event listener untuk menangani ketika audio selesai diputar
    audioElement.addEventListener("ended", function () {
      audioEnded(audioId);
    });

    // Setel status pemutaran untuk audio tertentu
    audioStatus[audioId] = true;

    // Nonaktifkan tombol pemutaran audio lainnya
    disableOtherPlayButtons(audioId);

    // Simpan status pemutaran ke localStorage
    localStorage.setItem("audioStatus", JSON.stringify(audioStatus));
  } else {
    console.log("Audio " + audioId + " sudah diputar.");
  }
}

function resetAudio(audioId) {
  // Hapus status pemutaran untuk audio tertentu dari localStorage
  delete audioStatus[audioId];

  // Aktifkan kembali tombol pemutaran
  document.querySelector(
    '.playButton[data-audio="' + audioId + '"]'
  ).disabled = false;

  // Aktifkan kembali tombol pemutaran audio lainnya
  enableAllPlayButtons();

  // Simpan status pemutaran yang diperbarui ke localStorage
  localStorage.setItem("audioStatus", JSON.stringify(audioStatus));
}

function resetAllAudio() {
  // Hapus status pemutaran untuk semua audio dari localStorage
  audioStatus = {};

  // Aktifkan kembali tombol pemutaran untuk semua audio
  enableAllPlayButtons();

  // Simpan status pemutaran yang diperbarui ke localStorage
  localStorage.setItem("audioStatus", JSON.stringify(audioStatus));
}

// Fungsi yang akan dipanggil ketika audio selesai diputar
function audioEnded(audioId) {
  console.log("Audio " + audioId + " selesai diputar.");

  // Tambahkan logika atau tindakan setelah audio selesai diputar

  // Aktifkan kembali tombol pemutaran audio lainnya
  enableAllPlayButtons();
}

// Fungsi untuk menonaktifkan tombol pemutaran audio lainnya
function disableOtherPlayButtons(currentAudioId) {
  var playButtons = document.querySelectorAll(".playButton");
  playButtons.forEach(function (button) {
    var buttonAudioId = button.getAttribute("data-audio");
    if (buttonAudioId !== currentAudioId) {
      button.disabled = true;
    }
  });
}

// Fungsi untuk mengaktifkan kembali semua tombol pemutaran audio
function enableAllPlayButtons() {
  var playButtons = document.querySelectorAll(".playButton");
  playButtons.forEach(function (button) {
    button.disabled = false;
  });
}

// Cek status pemutaran dari localStorage saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  var storedAudioStatus = localStorage.getItem("audioStatus");
  if (storedAudioStatus) {
    audioStatus = JSON.parse(storedAudioStatus);

    // Nonaktifkan tombol untuk audio yang sudah diputar
    for (var audioId in audioStatus) {
      if (audioStatus[audioId]) {
        document.querySelector(
          '.playButton[data-audio="' + audioId + '"]'
        ).disabled = true;
        console.log("Audio " + audioId + " sudah diputar.");
      }
    }
  }
});
