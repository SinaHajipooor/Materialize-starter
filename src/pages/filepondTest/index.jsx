// import React, { useState } from 'react'

// // Import React FilePond
// import { FilePond, File, registerPlugin } from 'react-filepond'

// // Import FilePond styles
// import 'filepond/dist/filepond.min.css'

// // Import the Image EXIF Orientation and Image Preview plugins
// // Note: These need to be installed separately
// // `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// import FilePondPluginImageResize from "filepond-plugin-image-resize";
// import FilePondPluginImageCrop from "filepond-plugin-image-crop";
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
// import { Box, Card, CardHeader, Divider } from '@mui/material'

// // Register the plugins
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageResize, FilePondPluginImageCrop)

// // Our app
// export default function App() {
//     const [files, setFiles] = useState([])


//     return (
//         <Card>
//             <CardHeader subheader='فایل های مورد نظر خود را انتخاب کنید' >
//             </CardHeader>
//             <Divider />
//             <Box width='30%' mt={7}>
//                 <FilePond

//                     imagePreviewHeight={400}
//                     files={files}
//                     onupdatefiles={setFiles}
//                     allowMultiple={true}
//                     maxFiles={20}
//                     allowImageTransform

//                     imageCropAspectRatio={"1:1"}
//                     imageResizeTargetWidth={100}
//                     imageResizeTargetHeight={400}
//                     imageResizeMode={"cover"}
//                     name="files"
//                     labelIdle='انتخاب فایل'
//                     labelFileProcessingError='خطایی رخ داد'
//                     labelTapToRetry='دوباره تلاش کن'

//                     styleItemPanelAspectRatio='0.6'
//                     itemInsertLocation='after'
//                     imagePreviewMarkupShow
//                 />
//             </Box>
//         </Card>
//     )
// }


// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import CardSnippet from 'src/@core/components/card-snippet'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Demo Components Imports
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import FileUploaderMultiple from 'src/views/forms/form-elements/file-uploader/FileUploaderMultiple'
import FileUploaderRestrictions from 'src/views/forms/form-elements/file-uploader/FileUploaderRestrictions'

// ** Source code imports
import * as source from 'src/views/forms/form-elements/file-uploader/FileUploaderSourceCode'

const FileUploader = () => {
    return (
        <DropzoneWrapper>
            <Grid container spacing={6} className='match-height'>

                <Grid item xs={12}>
                    <CardSnippet
                        title='Upload Multiple Files'
                        code={{
                            tsx: null,
                            jsx: source.FileUploaderMultipleJSXCode
                        }}
                    >
                        <FileUploaderMultiple />
                    </CardSnippet>
                </Grid>
            </Grid>
        </DropzoneWrapper>
    )
}

export default FileUploader
