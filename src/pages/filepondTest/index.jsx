import React, { useState } from 'react'

// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'


// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageResize, FilePondPluginImageCrop)

// Our app
export default function App() {
    const [files, setFiles] = useState([])

    console.log(files)



    return (
        <FilePond

            imagePreviewHeight={200}
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={true}
            maxFiles={20}
            allowImageTransform
            imageCropAspectRatio={"1:1"}
            imageResizeTargetWidth={100}
            imageResizeTargetHeight={100}
            imageResizeMode={"cover"}
            name="files"
            labelIdle='فایل های مورد نظر خود را انتخاب کنید'
            labelFileProcessingError='خطایی رخ داد'
            labelTapToRetry='دوباره تلاش کن'
            styleItemPanelAspectRatio='0.25'
        />
    )
}