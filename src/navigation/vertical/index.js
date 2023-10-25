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
            title: 'مجوز ها',
            icon: 'mdi:users-outline',
            children: [
                {
                    title: 'اپدیت',
                    path: '/authorize/manager'
                },
                {
                    title: 'ایجاد',
                    path: '/authorize/admin'
                },
                {
                    title: 'حذف',
                    path: '/authorize/user'
                },
            ]
        },

        {
            title: 'SSG',
            path: '/activityHistories',
            icon: 'mdi:person-outline',
        },
        {
            title: 'SSR',
            path: '/ssr',
            icon: 'mdi:home-outline',
        },
        {
            title: 'فرم چند مرحله‌ای',
            path: '/wizard',
            icon: 'mdi:home-outline',
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
        {
            title: 'فیلتر',
            path: '/filterTable',
            icon: 'mdi:filter-outline',
        },
    ]
}

export default navigation
