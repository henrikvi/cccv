function startup() {
    const width = 720;
    let height = 0;
    let streaming = false;
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const photo = document.getElementById('photo');
    
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
    
    video.addEventListener('click', (ev) => {
      takePicture();
      ev.preventDefault();
    }, false);
    
    photo.addEventListener('click', (ev) => {
      returnToCamera();
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
        
        recognizeCharacters(data);
    }
}

function returnToCamera(){
    video.style.display = 'block';
    photo.style.display = 'none';
}

function recognizeCharacters(data){
    Tesseract.recognize(data)
    .catch(err => console.error(err))
    .then(result => {
        console.log(result.text);
        let text = document.createTextNode(result.text);
        document.getElementById('text').appendChild(text);
    })
}

window.addEventListener('load', startup());