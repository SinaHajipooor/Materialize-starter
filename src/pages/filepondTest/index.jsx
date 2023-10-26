// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import CardSnippet from 'src/@core/components/card-snippet'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'

// ** Demo Components Imports
import FileUploaderMultiple from 'src/views/forms/form-elements/file-uploader/FileUploaderMultiple'

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
