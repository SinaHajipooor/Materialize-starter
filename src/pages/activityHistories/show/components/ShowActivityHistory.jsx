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
import { Box, Switch, Typography, Stack, CircularProgress } from '@mui/material'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Link from 'next/link'
import { useSettings } from 'src/@core/hooks/useSettings'
import useCreateActivity from 'src/hooks/activity-history/useCreateActivity'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import useActivityDetails from '../../../../hooks/activity-history/useActivityDetails'
import { useRouter } from 'next/router'


function ShowActivityHistory({ activityHistory }) {

    const { settings } = useSettings()

    const {
        control,
        formState: { errors },
    } = useForm({ activityHistory })


    // methods 
    const CustomInput = forwardRef(({ ...props }, ref) => {
        return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
    })

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
                    <Typography fontWeight={600} fontSize={19}>جزییات سوابق فعالیت</Typography>
                </Box>
                <CardContent>
                    <form >
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
                                                value={activityHistory.title ?? 'عنوان وارد نشده است'}
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
                                        defaultValue={activityHistory?.institute_title}
                                        name='institute_title'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={activityHistory?.institute_title ?? 'نام موسسه وارد نشده است'}
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
                                                value={activityHistory?.position ?? 'سمت وارد نشده است'}
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
                                        defaultValue={activityHistory?.work_type}
                                        name='work_type_id'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                value={activityHistory?.work_type}
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
                                    defaultValue={activityHistory?.start_date}
                                    name='start_date'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <DatePicker
                                            value={activityHistory?.start_date ?? ''}
                                            showYearDropdown
                                            showMonthDropdown
                                            onChange={() => { }}
                                            placeholderText='MM/DD/YYYY'
                                            customInput={
                                                <CustomInput
                                                    value={activityHistory?.start_date ?? ''}
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
                                    name='end_date'
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                        <DatePicker
                                            value={activityHistory?.end_date ?? ''}
                                            showYearDropdown
                                            showMonthDropdown
                                            onChange={e => { }}
                                            placeholderText='MM/DD/YYYY'
                                            customInput={
                                                <CustomInput
                                                    value={activityHistory?.end_date ?? ''}
                                                    onChange={() => { }}
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
                                                دانلود فایل
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
                                            {activityHistory?.file ? 'یک فایل وجود دارد' : 'فایلی وجود ندارد'}
                                        </span>
                                        <TextField
                                            name="file"
                                            id="file-input"
                                            onChange={() => { }}
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
                                            rules={{ required: false }}
                                            render={({ field: { value, onChange } }) => (
                                                <FormControlLabel
                                                    defaultChecked={activityHistory?.has_certificate}
                                                    defaultValue={activityHistory?.has_certificate}
                                                    name='has_certificate'
                                                    control={
                                                        <Switch
                                                            defaultChecked={activityHistory?.has_certificate ?? false}
                                                            checked={activityHistory?.has_certificate ?? false}
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
                                            rules={{ required: false }}
                                            render={({ field: { value, onChange } }) => (
                                                <FormControlLabel
                                                    defaultValue={activityHistory?.is_related}
                                                    defaultChecked={activityHistory?.is_related}
                                                    name='is_related'
                                                    control={
                                                        <Switch
                                                            defaultChecked={activityHistory?.is_related ?? false}
                                                            checked={activityHistory?.is_related ?? false}
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
                                                    defaultChecked={activityHistory?.current_position}
                                                    defaultValue={activityHistory?.current_position}
                                                    name='current_position'
                                                    control={
                                                        <Switch
                                                            defaultChecked={activityHistory?.current_position ?? false}
                                                            checked={activityHistory?.current_position ?? false}

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
                                                defaultValue={activityHistory?.address ?? ''}
                                                value={activityHistory?.address ?? 'آدرس وارد نشده است'}
                                                placeholder='ادرس را وارد کنید'
                                                onChange={() => { }}
                                                disabled
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
                                        render={({ field: { value, onChange } }) => (
                                            <FormControlLabel
                                                defaultValue={activityHistory?.status ?? false}
                                                defaultChecked={activityHistory?.status ?? false}
                                                name='status'
                                                control={
                                                    <Switch
                                                        defaultChecked={activityHistory?.status ?? false}
                                                        checked={activityHistory?.status ?? false}
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

export default ShowActivityHistory
