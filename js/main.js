function startup() {
    const width = 720;
    let height = 0;
    let streaming = false;
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const startbutton = document.getElementById('startbutton');
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
        video.srcObject = stream;
        video.play();
    })
    .catch((err) => {
        console.log(err);
    })
    
    video.addEventListener('canplay', () => {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        
        streaming = true;
      }
    }, false);
    
    startbutton.addEventListener('click', (ev) => {
      takePicture();
      ev.preventDefault();
    }, false);
    
}

function takePicture(){
    /*const photo = document.getElementById('photo');
    const video = document.getElementById('video');*/
    
    const width = video.getAttribute('width');
    const height = video.getAttribute('height');
    const context = canvas.getContext('2d');
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
    
        let data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
        photo.style.display = 'block';
        video.style.display = 'none';
    }
}

window.addEventListener('load', startup());