// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

import InputLabel from '@mui/material/InputLabel'

import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import { Box, Switch, Typography, Stack } from '@mui/material'
import persian_fa from "react-date-object/locales/persian_fa"
import persian from "react-date-object/calendars/persian"


// ** Third Party Imports
import DatePicker from 'react-multi-date-picker'
import { useForm, Controller } from 'react-hook-form'


// ** Icon Imports
import Link from 'next/link'
import { useSettings } from 'src/@core/hooks/useSettings'
import useCreateActivity from 'src/hooks/activity-history/useCreateActivity'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"


const defaultValues = {
    title: '',
    institute_title: '',
    position: '',
    work_type_id: 1,
    start_date: null,
    end_date: null,
    address: '',
    has_certificate: false,
    is_related: false,
    current_position: false,
    status: false,
}

const CustomInput = forwardRef(({ ...props }, ref) => {
    return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const FormValidationBasic = () => {
    // ** States
    const [file, setFile] = useState(null);
    const { settings } = useSettings()
    const { mutate, isLoading } = useCreateActivity(file)
    const weekDays = ['شنبه', '1ش', '2ش', '3ش', '4ش', '5ش', 'جمعه']
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()


    // methods
    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };

    // ** Hooks
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues })


    const onSubmit = (values) => {
        setStartDate(values.start_date);
        setEndDate(values.end_date)
        const newActivityHistory = { ...values, user_id: 1, start_date: '1402-09-20', end_date: '1402-09-10', work_type_id: 1 }
        mutate(newActivityHistory, file)
    }



    return (
        <DatePickerWrapper>
            <Card>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '4rem',
                    }}
                >
                    <Typography fontWeight={600} fontSize={19}>ایجاد سوابق فعالیت</Typography>
                </Box>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='title'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                label='عنوان'
                                                onChange={onChange}
                                                placeholder='عنوان را وارد کنید'
                                                error={Boolean(errors.title)}
                                                aria-describedby='validation-basic-first-name'
                                            />
                                        )}
                                    />
                                    {errors.title && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                                            عنوان اجباری است
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='institute_title'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                label='نام موسسه'
                                                onChange={onChange}
                                                placeholder='نام موسسه را وارد کنید'
                                                error={Boolean(errors.institute_title)}
                                                aria-describedby='validation-basic-last-name'
                                            />
                                        )}
                                    />
                                    {errors.institute_title && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-last-name'>
                                            نام موسسه اجباری است
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='position'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                label='سمت'
                                                onChange={onChange}
                                                error={Boolean(errors.position)}
                                                placeholder='سمت را وارد کنید'
                                                aria-describedby='validation-basic-email'
                                            />
                                        )}
                                    />
                                    {errors.position && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-email'>
                                            سمت اجباری است
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4} mt={3} >
                                <Grid>
                                    <Box
                                        border={0.3}
                                        borderRadius={0.8}
                                        overflow="hidden"
                                        display="flex"
                                        justifyContent="start"
                                        height={51}
                                        borderColor={settings.mode === 'dark' ? '#57596C' : '#BFBFD5'}
                                    >
                                        <label htmlFor="file-input">
                                            <Button
                                                variant="contained"
                                                component="span"
                                                style={{
                                                    height: '100%', overflow: 'hidden', width: '105px', borderTopRightRadius: 1,
                                                    borderBottomRightRadius: 1,
                                                    borderTopLeftRadius: 0,
                                                    borderBottomLeftRadius: 0,

                                                }}
                                            >
                                                آپلود فایل
                                            </Button>
                                        </label>
                                        <span
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'start',
                                                paddingRight: '18px',
                                                paddingLeft: '8px',
                                                fontSize: '13px',
                                                color: 'grey'
                                            }}
                                        >
                                            {file ? 'فایل مورد نظر انتخاب شد' : 'یک فایل انتخاب کنید'}
                                        </span>
                                        <TextField
                                            name="file"
                                            type="file"
                                            id="file-input"
                                            onChange={handleFileUpload}
                                            style={{ display: 'none' }}
                                        />
                                    </Box>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={4} mt={3}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        id='validation-basic-select'
                                        error={Boolean(errors.select)}
                                        htmlFor='validation-basic-select'
                                    >
                                        نوع همکاری
                                    </InputLabel>
                                    <Controller
                                        name='work_type_id'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                value={value}
                                                label='نوع همکاری'
                                                onChange={onChange}
                                                error={Boolean(errors.work_type_id)}
                                                labelId='validation-basic-select'
                                                aria-describedby='validation-basic-select'
                                            >
                                                <MenuItem value={1}>تمام وقت</MenuItem>
                                                <MenuItem value={2}>پاره وقت</MenuItem>
                                            </Select>
                                        )}
                                    />
                                    {errors.work_type_id && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-select'>
                                            انتخاب نوع همکاری اجباری است
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={2} mt={3}>
                                <Controller
                                    name='start_date'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, name, value } }) => (
                                        <DatePicker
                                            locale={persian_fa}
                                            value={startDate}
                                            className={settings.mode === 'dark' ? 'bg-dark' : 'teal'}
                                            calendar={persian}
                                            placeholderText='MM/DD/YYYY'
                                            weekDays={weekDays}
                                            onChange={(date) => {
                                                onChange(date.format());
                                            }}

                                            //     onChange={onchange}
                                            format="YYYY/MM/DD"
                                            render={
                                                <CustomInput

                                                    //     value={startDate}

                                                    //     onChange={onchange}
                                                    label='تاریخ شروع'
                                                    error={Boolean(errors.start_date)}
                                                    aria-describedby='validation-basic-dob'
                                                />
                                            }
                                        />
                                    )}
                                />
                                {errors.start_date && (
                                    <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                                        تاریخ شروع اجباری است
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={2} mt={3}>
                                <Controller
                                    name='end_date'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <DatePicker
                                            className={settings.mode === 'dark' ? 'bg-dark' : null}
                                            locale={persian_fa}
                                            value={endDate}
                                            calendar={persian}

                                            onChange={(date) => {
                                                onChange(date.format());
                                            }}
                                            placeholderText='MM/DD/YYYY'
                                            render={
                                                <CustomInput
                                                    value={value}

                                                    onChange={onChange}
                                                    label='تاریخ پایان'
                                                    error={Boolean(errors.end_date)}
                                                    aria-describedby='validation-basic-dob'
                                                />
                                            }
                                        />
                                    )}
                                />
                                {errors.end_date && (
                                    <FormHelperText sx={{ mx: 3.5, color: 'error.main' }} id='validation-basic-dob'>
                                        تاریخ پایان اجباری است
                                    </FormHelperText>
                                )}
                            </Grid>

                            <Grid item xs={12} mt={3}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='address'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <TextField
                                                placeholder='ادرس را وارد کنید'
                                                rows={4}
                                                multiline
                                                {...field}
                                                label='آدرس'
                                                error={Boolean(errors.address)}
                                                aria-describedby='validation-basic-textarea'
                                            />
                                        )}
                                    />
                                    {errors.address && (
                                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-textarea'>
                                            وارد کردن آدرس اجباری است
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid container spacing={3} sm={12} item mt={4}>
                                <Grid item xs={12} sm={3} >
                                    <FormControl fullWidth>
                                        <Controller
                                            name='has_certificate'
                                            control={control}
                                            rules={{ required: false }}
                                            render={({ field: { value, onChange } }) => (
                                                <FormControlLabel
                                                    name='has_certificate'
                                                    control={
                                                        <Switch
                                                            checked={value}
                                                            onChange={onChange}
                                                        />
                                                    }
                                                    label={'دارای گواهینامه'}
                                                />
                                            )}
                                        />

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3} >
                                    <FormControl fullWidth>
                                        <Controller
                                            name='is_related'
                                            control={control}
                                            rules={{ required: false }}
                                            render={({ field: { value, onChange } }) => (
                                                <FormControlLabel
                                                    name='is_related'
                                                    control={
                                                        <Switch
                                                            checked={value}
                                                            onChange={onChange}
                                                        />
                                                    }
                                                    label={'فعالیت مرتبط'}
                                                />
                                            )}
                                        />

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='current_position'
                                            control={control}
                                            rules={{ required: false }}
                                            render={({ field: { value, onChange } }) => (
                                                <FormControlLabel
                                                    name='current_position'
                                                    control={
                                                        <Switch
                                                            checked={value}
                                                            onChange={onChange}
                                                        />
                                                    }
                                                    label={'فعالیت جاری'}
                                                />
                                            )}
                                        />

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={3} >
                                    <FormControl fullWidth>
                                        <Controller
                                            name='status'
                                            control={control}
                                            rules={{ required: false }}
                                            render={({ field: { value, onChange } }) => (
                                                <FormControlLabel
                                                    name='status'
                                                    control={
                                                        <Switch
                                                            checked={value}
                                                            onChange={onChange}
                                                        />
                                                    }
                                                    label={'وضعیت'}
                                                />
                                            )}
                                        />

                                    </FormControl>
                                </Grid>
                            </Grid>



                            <Grid item xs={12}>
                                <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={2}
                                    justifyContent="space-between"
                                    mt={2}
                                >
                                    <Stack spacing={1} direction="row">
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                        <Button LinkComponent={Link} href='/activityHistories' variant="contained" type='reset' color="error">
                                            لغو
                                        </Button>
                                        <Button
                                            disabled={isLoading}
                                            type='submit'
                                            style={{ fontFamily: 'IRANSans' }}
                                            variant="contained"
                                            color="primary"
                                        >
                                            ثبت
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card >
        </DatePickerWrapper>
    )
}

export default FormValidationBasic
