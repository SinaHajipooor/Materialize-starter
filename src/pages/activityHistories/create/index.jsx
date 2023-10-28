// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import FormValidationBasic from 'src/views/forms/form-validation/FormValidationBasic'
import MyComponent from 'src/views/forms/form-validation/test'

const FormValidation = () => {
    return (
        <Grid item xs={12}>
            <FormValidationBasic />
        </Grid>
    )
}

export default FormValidation
