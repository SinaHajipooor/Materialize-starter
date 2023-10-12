// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

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
import { Box, Switch, Typography, Stack, CircularProgress } from '@mui/material'
import fa from 'date-fns/locale/fa-IR'


// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Link from 'next/link'
import { useSettings } from 'src/@core/hooks/useSettings'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import useUpdateActivity from '../../../../hooks/activity-history/useUpdateActivity'



function UpdateActivityHistory({ activityHistory }) {

    const { settings } = useSettings()
    const [file, setFile] = useState(activityHistory?.file);
    const [fileHelper, setfileHelper] = useState('')
    const { mutate, isLoading } = useUpdateActivity(file, activityHistory.id);

    useEffect(() => {
        activityHistory?.file ? setfileHelper('یک فایل وجود دارد') : setfileHelper('فایل مورد نظر را انتخاب کنید')

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ activityHistory })


    // methods 
    const CustomInput = forwardRef(({ ...props }, ref) => {
        return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
    })

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setfileHelper('فایل مورد نظر جایگزین شد')
        } else {
            setFile(null);
        }
    };


    const onSubmit = (values) => {
        const updatedActivityHistory = { ...values, user_id: 1, start_date: '1402-09-20', end_date: '1402-09-10', work_type_id: 1 }
        mutate(updatedActivityHistory, file)
    }

    // form
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
                    <Typography fontWeight={600} fontSize={19}>تغییر سوابق فعالیت</Typography>
                </Box>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <Controller
                                        defaultValue={activityHistory?.title}
                                        name='title'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                onChange={onChange}
                                                label='عنوان'
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
                                        defaultValue={activityHistory?.institute_title ?? null}
                                        name='institute_title'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value}
                                                onChange={onChange}
                                                label='نام موسسه'
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
                                        defaultValue={activityHistory?.position}
                                        name='position'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                type='text'
                                                value={value}
                                                onChange={onChange}
                                                label='سمت'
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
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        id='validation-basic-select'
                                        error={Boolean(errors.select)}
                                        htmlFor='validation-basic-select'
                                    >
                                        نوع همکاری
                                    </InputLabel>
                                    <Controller
                                        defaultValue={activityHistory?.work_type ?? 1}
                                        name='work_type_id'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                onChange={onChange}
                                                value={value}
                                                label='نوع همکاری'
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


                            <Grid item xs={12} sm={4}>
                                <Controller

                                    defaultValue={new Date(activityHistory?.start_date)}
                                    name='start_date'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <DatePicker

                                            locale={fa}
                                            selected={value}
                                            showYearDropdown
                                            showMonthDropdown
                                            onChange={e => onChange(e)}
                                            placeholderText='MM/DD/YYYY'
                                            customInput={
                                                <CustomInput
                                                    onChange={onChange}
                                                    value={value}
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
                            <Grid item xs={12} sm={4}>
                                <Controller
                                    defaultValue={new Date(activityHistory?.end_date)}
                                    name='end_date'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <DatePicker
                                            selected={value}
                                            showYearDropdown
                                            showMonthDropdown
                                            onChange={e => onChange(e)}
                                            placeholderText='MM/DD/YYYY'
                                            customInput={
                                                <CustomInput
                                                    value={activityHistory?.end_date ?? ''}
                                                    onChange={onchange}
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
                            <Grid item xs={12} sm={4} mt={3}>
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
                                                    height: '100%', overflow: 'hidden', width: '110px', borderTopRightRadius: 1,
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
                                            {fileHelper}
                                        </span>
                                        <TextField
                                            name="file"
                                            type='file'
                                            id="file-input"
                                            onChange={handleFileUpload}
                                            style={{ display: 'none' }}
                                        />
                                    </Box>

                                </Grid>
                            </Grid>

                            <Grid container spacing={3} sm={8} item mt={4}>
                                <Grid item xs={12} sm={4} ml={7}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='has_certificate'
                                            control={control}
                                            defaultValue={activityHistory?.has_certificate ?? false}
                                            rules={{ required: false }}
                                            render={({ field: { value, onChange } }) => (
                                                <FormControlLabel

                                                    name='has_certificate'
                                                    control={
                                                        <Switch

                                                            defaultChecked={activityHistory?.has_certificate ?? false}
                                                            value={value}
                                                            onChange={onChange}
                                                        />
                                                    }
                                                    label={'دارای گواهینامه'}
                                                />
                                            )}
                                        />

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4} ml={0}>
                                    <FormControl fullWidth>
                                        <Controller
                                            name='is_related'
                                            control={control}
                                            defaultValue={activityHistory?.is_related ?? false}
                                            rules={{ required: false }}
                                            render={({ field: { value, onChange } }) => (
                                                <FormControlLabel

                                                    name='is_related'
                                                    control={
                                                        <Switch
                                                            defaultChecked={activityHistory?.is_related ?? false}

                                                            value={value}
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
                                            defaultValue={activityHistory?.current_position ?? false}
                                            control={control}
                                            rules={{ required: false }}
                                            render={({ field: { value, onChange } }) => (
                                                <FormControlLabel

                                                    name='current_position'
                                                    control={
                                                        <Switch
                                                            value={value}
                                                            onChange={onChange}
                                                            defaultChecked={activityHistory?.current_position ?? false}


                                                        />
                                                    }
                                                    label={'فعالیت جاری'}
                                                />
                                            )}
                                        />

                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} mt={2}>
                                <FormControl fullWidth>
                                    <Controller
                                        defaultValue={activityHistory?.address ?? ''}
                                        name='address'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <TextField
                                                aria-readonly
                                                value={activityHistory?.address}
                                                placeholder='ادرس را وارد کنید'
                                                onChange={onchange}
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
                            <Grid item xs={12} sm={3} ml={3}>
                                <FormControl fullWidth>
                                    <Controller
                                        name='status'
                                        control={control}
                                        rules={{ required: false }}
                                        defaultValue={activityHistory?.status ?? false}
                                        render={({ field: { value, onChange } }) => (
                                            <FormControlLabel
                                                name='status'
                                                control={
                                                    <Switch
                                                        value={value}
                                                        onChange={onChange}
                                                        defaultChecked={activityHistory?.status ?? false}

                                                    />
                                                }
                                                label={'وضعیت'}
                                            />
                                        )}
                                    />

                                </FormControl>
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
                                            برگشت
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

export default UpdateActivityHistory
