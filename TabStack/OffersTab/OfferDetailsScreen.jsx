

import React, { useEffect } from "react";
import { ScrollView, useWindowDimensions, View, TouchableOpacity, Text } from "react-native";
import HTML from "react-native-render-html";

let htmlContent = null;

export default function OfferDetailsScreen({ navigation, route }) {
  const offerId = route.params.offer;

  if (offerId == 1)
    htmlContent = `
    <h1 style="text-align: center">عروض التنظيف لشهر رمضان المبارك</h1>
    <img src="https://static.seattletimes.com/wp-content/uploads/2018/11/cleaning_1111-780x520.jpg" />
    <p style="font-size:18;">أقوي غسيل سجاد وكل المفروشات صالونات جلسات ستارات فرشات منادير صالونات...درجة أولي وبإحترافية عالية - مش كل من عنده ماكينة يعرف ينظف...</p>
    <p style="font-size:18;">خبرة سنوات طويلة في التنظيف أقوي معدات لشفط البقع العميقة لغسيل ونظافة وتجفيف السجاد في عين المكان</p>
    <p style="font-size:18;">مش ماكينة صابون وخلاص....نشفطوا الاوساخ (زيوت دهون سوائل...أي شي) من العمق الي السطح والنتيجة أنظف سجاد وريحة روعة من لاخير موكيت - بن وليد - عجمي - صيني - أي سجاد يحتاج الي عناية متخصصة</p>
    <p style="font-size:18;">تنظيفنا من الجذور لجميع المفروشات و أنواع السجاد وليس سطحي فقط غسيلنا عميق وعلي 3 مراحل - مفروشاتك و سجادك يصبح فعلا نظيف نظيف نظيف ثم التعطير بعطر شرقي او غربي </p>
    <p style="font-size:18;">فريق متخصص لغسيل المفروشات والسجاد لخدمتكم أين ماكنتم</p>
    <p style="font-size:18;">المساجد : سعر خاص للمساجد والعقود الثابتة والمساحات فوق 500م</p>

    <p style="font-size:18;">مفيش حاجة متتنظفش...ستائر جلسات صالونات سيارات...كله في مكانه</p>    
`;
  else if (offerId == 2)
    htmlContent = `
<h1 style="text-align: center">غسيل صالونات السيارات</h1>
<img src="https://www.end-of-tenancy-london.co.uk/wp-content/uploads/2018/02/car-interior-cleaning.jpg?x53702" />
<p style="font-size:18;">إزالة البقع والترسبات وأثار العرق والروائح الكريهة من العمق</p>
<p style="font-size:18;">• أرضية وكراسى فقط + (تلميع فودرة وأبواب مجانا)</p>
<p style="font-size:18;">كركوبة-------- 120د (بيكانتو, وماشابه)</p>

<p style="font-size:18;">عادية --------- 140د ( سيراتو, فيرنا, أكسنت, أزيرا, وماشابه)</p>

<p style="font-size:18;">عالية صفتين كراسى ----160 د ( سانتافي, سبورتاج, وماشابه)</p>
<p style="font-size:18;">عالية 3 صفات كراسى --- 180د (سانتافي, جيب, بي أم, مرسيدس, وماشابه)</p>
<p style="font-size:18;">عالية كبيرة ------ 220د ( مفخرة, لبوة, جى أم سي, وماشابه)</p>

<p style="font-size:18;">• كاملة ( أرضية وكراسى سقف) + (تلميع فودرة وأبواب وكوفيني خلفي مجانآ)</p>
<p style="font-size:18;">كركوبة-------- 150د (بيكانتو, وماشابه)</p>
<p style="font-size:18;">عادية --------- 180د ( سيراتو, فيرنا, أكسنت, أزيرا, وماشابه)</p>
<p style="font-size:18;">عالية صفتين كراسى --- 200 د ( سانتافي, سبورتاج, وماشابه)</p>
<p style="font-size:18;">عالية 3 صفات كراسى --- 220د (سانتافي, جيب, بي أم, مرسيدس, وماشابه)</p>
<p style="font-size:18;">عالية كبيرة ------ 250د ( مفخرة, لبوة, جى أم سي, وماشابه)</p>

<p style="font-size:18;">*ملاحظة: لو سيارتك حالتها سيئة.. يعني فيها بقع صعبة وإتساخ زايد تحتاج خدمة إضافية, فيه تكلفة إضافية بسيطة يحددها الفني لما يجيك.</p>
<p style="font-size:18;">للحجز الان:</p>
0918510100
0928510100
`;
  else if (offerId == 3)
    htmlContent = `
    <h1 style="text-align: center">سيارة نقل بورتر حافظة لنقل اغرضكم الشخصية</h1>
    <img src="https://scontent.fmji1-1.fna.fbcdn.net/v/t1.0-9/162401705_1168100206969525_4678605220874723277_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=9267fe&_nc_ohc=YNHgciJmL6wAX9RRyIY&_nc_ht=scontent.fmji1-1.fna&oh=87a0570264a6a12bf73300ac46a8169f&oe=607BAC98" />
    <p style="font-size:18;">نوفر لك فني فك وتركيب الاثاث واعمال صيانة متنوعة</p>

    <p style="font-size:18;">الاسعار من 50د وتزيد حسب الاغراض</p>

    <p style="font-size:18;">مثلا: صيانة أثاث - تركيب أقفال أبواب - تعديل تركيب الخدمات المنزلية البسيطة- سباكة - كهرباء - اي شي يبي خدمة في المنزل</p>

    <p style="font-size:18;">للتواصل من 9 - 5 يوميا فقط</p>

    <p style="font-size:18;">"أي خدمة" الشركة الوحيدة في طرابلس توفر لككم فنيين خبرة في كل المجالات</p>

    <p style="font-size:18;">- راحة وأمان .. جودة و ضمان...</p>

    <p style="font-size:18;">0918510100</p>
    <p style="font-size:18;">0928510100</p>`;
  else if (offerId == 4)
    htmlContent = `<h1 style="text-align: center">خدمات طلاء</h1>
    <img src="https://scontent.fmji1-1.fna.fbcdn.net/v/t1.0-9/161046382_777648833127560_8437564257839968440_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=825194&_nc_ohc=UHo9dO0aUjMAX_WPcw8&_nc_ht=scontent.fmji1-1.fna&oh=a4288bd2fe56a74e44e0850c1b83193d&oe=607C328C" />
    أقوي وأسرع وأضمن خدمات طلاء متوفرة مباني وعمارات وشقق..فنيين ليبيين ومصريين خبرة

خدماتتنا أي نوع طلاء نخدموه لك

- أعمال بضمان النتيجة وخبرتنا فنيينا أكثر من 15 سنة بإشراف علي كامل العمل والعمال
- التنفيذ سريع بعدة فرق جاهزة لاأي عدد للشقق والمباني الكبيرة والعمارات
- أعمالنا بإحترافية تنفيذ وتعامل راقي وتصحيح أي عيوب والتسليم علي مستوي %100

*معاينة العمل قبل العمل والاتفاق واضح من البداية

ملاحظة: يتوفر لدينا خدمة الجرافيت والسليكات والتكست ميديا أكثر من 200 لون متوفر

للتواصل:
0917510100
0927510100`;
  else if (offerId == 5)
    htmlContent = `<h1 style="text-align: center">تجديد وترميم الحمامات والمطابخ</h1>
  <img src="https://scontent.fmji1-1.fna.fbcdn.net/v/t1.0-9/159316826_1162178994228313_7413538856658560435_n.jpg?_nc_cat=104&ccb=1-3&_nc_sid=9267fe&_nc_ohc=6Zflkfk_HloAX91xR2o&_nc_ht=scontent.fmji1-1.fna&oh=da01d63b4c89e03a9f7fcbfdfa3eaf59&oe=607D5B41" />
  أروع تجديد وترميم الحمامات والمطابخ..
  نقوم بالتكسير ونقل المخلفات وتنخدم السباكة بالكامل والكهرباء ثم الارضيات والحوائط
  
  خدمتنا يد عاملة فقط ونوفر تصميم تام شوف حمامك قبل مانخدموه...
  مدة العمل عادة 10 ايام
  السداد كاش وعلي دفعات مقدما.
  
  أي إستفسار اخر تفضل
  0917510100
  0927510100
  `;
  else if (offerId == 6)
    htmlContent = `<h1 style="text-align: center">صيانة وتنظيف وتجديد أفران الغاز والكهربائية</h1>
  <img src="https://cache-landingpages-images.services.handy.com/2018/10/30/03/35/42/c0565f0f-d9b9-4273-87be-c1890dd997f9/woman-cleaning-oven-in-kitchen-closeup-picture-id942141666.jpg" />
  صيانة وتنظيف وتجديد أفران الغاز والكهربائية منازل مطاعم مقاهي فنادة بإحترافية عالية - فني خبرة 10سنوات
 "أي خدمة" توفر لكم خدمات صيانة الافران المنزلية الكهربائية والغاز وانت في مكانك نجوك لعندك
::::: صيانة * تنظيف * تجديد ::::::
خدماتنا :
- تصليح ألافران كهربائية و غاز
- توفير بعض قطع الغيار
- تفيير المرشة المكسورة
- تبديل المفاتيح المكسورة والمفقودة
- تنظيف وتجديد الافران بالمواد الخاصة تولي شبه جديدة

قريبا..!!!خدمات تنظيف بالبخار  غاز ثلاجة مكيفات مركزي وعادي غسالات مجففات مطابخ وحمامات ومفروشات البيت كلها بالبخار وانت في مكانك نجوك لعندك

الكشف مجاني في حالة تمت الصيانة  أو  50د الكشف فقط
نجوك لعندك
"أي خدمة" لجميع أعمال الصيانة والتركيب والتشطيب والتنظيف
أظف رقمنا الان:::"أي خدمة"::::::::
0918510100
0928510100
للمزيد من خدماتنا:  زوروا متجر "أي خدمة" علي السوق المفتوح أو زوروا صفحاتنا علي الفيس بوك 
  `;


  const contentWidth = useWindowDimensions().width;
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ marginHorizontal: 15, padding: 5, }}>
        <HTML source={{ html: htmlContent }} contentWidth={contentWidth} />
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('FormScreen', { offer: offerId })}
        style={{ backgroundColor: 'red', flexDirection: 'row', margin: 10, padding: 10, borderRadius: 10, }}
      >
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, flex: 1 }}>املأ نموذج طلبك الان</Text>
      </TouchableOpacity>
    </View>
  );
}
