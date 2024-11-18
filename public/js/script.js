const socket = io();

const uploadFile = () => {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();

        formData.append("file", file);

        fetch("/api/v1/upload", {
            method: "POST",
            body: formData
        }).then((response) => response.json()).then((data) => {
            alert(data.message)
        }).catch((err) => alert(error.message))
    } else {
        alert("Please select a file");
    }
}

const downloadFile = (fileName) => {
    console.log(fileName)
    fetch(`/api/v1/download/${fileName}`).then((response) => response.blob()).then((blob) => {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    })
}

const updateFileList = (files) => {
    const fileListElement = document.getElementById("fileList");

    fileListElement.innerHTML = null;

    files.forEach((file) => {
        const divElem = document.createElement("div");

        const spanElem = document.createElement("span");
        spanElem.textContent = file.fileName;

        const downloadButton = document.createElement("button");
        downloadButton.classList.add("download-button");
        downloadButton.textContent = "Download";
        downloadButton.onclick = () => {
            downloadFile(file.fileName);
        }
        divElem.appendChild(spanElem);
        divElem.appendChild(downloadButton);

        fileListElement.appendChild(divElem);
    })
}

socket.on("updateFileList", (files) => {
    updateFileList(files);
})

