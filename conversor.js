document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const previewArea = document.getElementById('preview-area');
    const imagePreview = document.getElementById('image-preview');
    const btnConvert = document.getElementById('btn-convert');
    
    // Novos elementos da barra de progresso
    const progressContainer = document.getElementById('progress-container');
    const progressFill = document.getElementById('progress-fill');

    let currentImageData = null;

    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

    function handleFile(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                currentImageData = event.target.result;
                imagePreview.src = currentImageData;
                dropZone.classList.add('hidden');
                previewArea.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    }

    btnConvert.addEventListener('click', () => {
        // 1. Esconde o botão e mostra o progresso
        btnConvert.style.display = 'none';
        progressContainer.classList.remove('hidden');

        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
                generatePDF(); // Chama a função real de PDF
            } else {
                width += 5; // Aumenta o progresso simulado
                progressFill.style.width = width + '%';
            }
        }, 100); // Velocidade da simulação
    });

    function generatePDF() {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();

        // Adiciona a imagem
        pdf.addImage(currentImageData, 'JPEG', 10, 10, 190, 0); 
        pdf.save("documento-foto.pdf");
        
        // Reinicia o site após 3 segundos
        setTimeout(() => {
            location.reload();
        }, 3000);
    }
});
