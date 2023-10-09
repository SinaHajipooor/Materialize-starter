const navigation = () => {


    return [
        {
            title: 'داشبورد',
            path: '/',
            icon: 'mdi:home-outline',
        },
        {
            title: 'تقویم',
            path: '/calendar',
            icon: 'mdi:calendar-outline',
        },
        {
            title: 'اعضای سیستم',
            icon: 'mdi:users-outline',
            children: [
                {
                    title: 'مدیر',
                    path: '/authorize/manager'
                },
                {
                    title: 'ادمین',
                    path: '/authorize/admin'
                },
                {
                    title: 'کاربر',
                    path: '/authorize/user'
                },
            ]
        },

        {
            title: 'سوابق فعالیت',
            path: '/activityHistories',
            icon: 'mdi:person-outline',
        },
        {
            title: 'نقشه',
            path: '/map',
            icon: 'mdi:map-outline',
        },
        {
            title: 'آپلود فایل',
            path: '/filepondTest',
            icon: 'mdi:upload-outline',
        },
    ]
}

export default navigation
