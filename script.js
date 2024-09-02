const uploadBox = document.querySelector(".upload-box")
const previewImg = document.querySelector("img")
const fileInput = document.querySelector("input")
const widthInput = document.querySelector(".width input")
const heightInput = document.querySelector(".height input")
const ratioInput = document.querySelector(".ratio input")
const qualityInput = document.querySelector(".quality input")
const downloadBtn = document.querySelector(".download-btn")

let ogImageRatio

const loadFile = (e) => {
    const file = e.target.files[0] // getting first user selected image
    if(!file) return; // return if user user hasn't selected any imge file
    previewImg.src = URL.createObjectURL(file) // passing selected image url to preview the image src

    previewImg.addEventListener("load", () => {
        widthInput.value = previewImg.naturalWidth
        heightInput.value = previewImg.naturalHeight
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight
        document.querySelector(".wrapper").classList.add("active")
    })
}

widthInput.addEventListener("keyup", () => {
    // getting the height according to the ratio checkbox status
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value
    heightInput.value = Math.floor(height)
})

heightInput.addEventListener("keyup", () => {
    // getting the height according to the ratio checkbox status
    const width = ratioInput.checked ? heightInput.value / ogImageRatio : widthInput.value
    widthInput.value = Math.floor(width)
})

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    // If the quality checkcbox is checked, pass 0.5 to imgQuality. Else pass 1.0
    // 1.0 is 100% of the image quality where .5 is 50% of the quality. you can pass 0.1 = 1.0
    const imgQuality = qualityInput.checked ? 0.5 : 1.0;

    // Getting the canvas height and width according to the input values
    canvas.width = widthInput.value
    canvas.height = heightInput.value

    // drawing user selected image onto the canvas
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height)

    // Passing canvas data url as href value of <a> tag
    a.href = canvas.toDataURL("image/jpeg", imgQuality)
    a.download = new Date().getTime() // passing current time as download value
    a.click() // Clicking the <a> tag so the file downloads
}

// Event Listeners
fileInput.addEventListener("change", loadFile)
uploadBox.addEventListener("click", () => fileInput.click())
downloadBtn.addEventListener("click", resizeAndDownload)
