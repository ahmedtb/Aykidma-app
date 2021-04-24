

export const LocaleWeeks = (weekName) => {
    var KeywordsMap = {
        Saturday : 'السبت',
        Sunday : 'الأحد',
        Monday : 'الاثنين',
        Tuesday : 'الثلاثاء',
        Wednesday : 'الأربعاء',
        Thursday : 'الخميس',
        Friday : 'الجمعة'
    }

    if(!(weekName in KeywordsMap)){
        console.error('no suck week name exisits');
    }
    else
        return KeywordsMap[weekName];
}

export const LocaleStatus = (keyword) => {
    var KeywordsMap = {
        pending : 'معلّق',
        approved : 'موافقة',
        rejected : 'مرفوض'
    }

    if(!(keyword in KeywordsMap)){
        console.error('no suck status name exists in the keywords map');
    }
    else
        return KeywordsMap[keyword];
}

export const LocaleRequestType = (keyword) => {
    var KeywordsMap = {
        absence: 'غياب بدون إذن مسبق',
        holiday : 'طلب إجازة',
        swap_inc: 'عمل يوم عطلة',
        swap_dec: 'راحة بدل يوم',
        swap_dec_in_money:'تسييل بدل يوم',
        mission:'مهمة خارجية',
        late:'عذر تأخير',
        early_leave:'مغادرة مبكرا',
        shift_change:'تغيير دوام',
        over_time:'وقت عمل إضافي',
        leave_during_work:'خروج أثناء الدوام',
        insteadOfTime:'تعويض وقت',
        nonePrint:'عدم وجود بصمة',
        sick:'إجازة مرضية',
        relativeDeath:'حالة وفاة',
        unpaidHoliday:'إجازة بدون مرتب',
        sleepBonus:'علاوة مبيت',
        videoBonus:'علاوة تصوير',
        night_watch:'علاوة مناوبة ليلية',
    }


    if(!(keyword in KeywordsMap)){
        console.error('no suck status name exists in the keywords map');
    }
    else
        return KeywordsMap[keyword];
}