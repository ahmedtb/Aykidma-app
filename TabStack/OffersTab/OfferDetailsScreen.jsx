

import React, { Component } from "react";
import { ScrollView, useWindowDimensions, View, TouchableOpacity, Text } from "react-native";
import HTML from "react-native-render-html";

let htmlContent = `
    <h1 style="text-align: center">عروض التنظيف لشهر رمضان المبارك</h1>
    <h2>عنوان جانبي</h2>
    <img src="https://static.seattletimes.com/wp-content/uploads/2018/11/cleaning_1111-780x520.jpg" />
    <p style="">أقوي غسيل سجاد وكل المفروشات صالونات جلسات ستارات فرشات منادير صالونات...درجة أولي وبإحترافية عالية - مش كل من عنده ماكينة يعرف ينظف...</p>
    <p>خبرة سنوات طويلة في التنظيف أقوي معدات لشفط البقع العميقة لغسيل ونظافة وتجفيف السجاد في عين المكان</p>
    <p>مش ماكينة صابون وخلاص....نشفطوا الاوساخ (زيوت دهون سوائل...أي شي) من العمق الي السطح والنتيجة أنظف سجاد وريحة روعة من لاخير موكيت - بن وليد - عجمي - صيني - أي سجاد يحتاج الي عناية متخصصة</p>
    <p>تنظيفنا من الجذور لجميع المفروشات و أنواع السجاد وليس سطحي فقط غسيلنا عميق وعلي 3 مراحل - مفروشاتك و سجادك يصبح فعلا نظيف نظيف نظيف ثم التعطير بعطر شرقي او غربي </p>
    <p>فريق متخصص لغسيل المفروشات والسجاد لخدمتكم أين ماكنتم</p>
    <p>المساجد : سعر خاص للمساجد والعقود الثابتة والمساحات فوق 500م</p>

    <p>مفيش حاجة متتنظفش...ستائر جلسات صالونات سيارات...كله في مكانه</p>    
`;

export default function OfferDetailsScreen({ navigation, route }) {
  if (route.params.service == 2)
    htmlContent = `
    <h1 style="text-align: center">غسيل صالونات السيارات</h1>
  <h2>عنوان جانبي</h2>
  <img src="https://www.end-of-tenancy-london.co.uk/wp-content/uploads/2018/02/car-interior-cleaning.jpg?x53702" />
  إزالة البقع والترسبات وأثار العرق والروائح الكريهة من العمق
  • أرضية وكراسى فقط + (تلميع فودرة وأبواب مجانا)
  كركوبة-------- 120د (بيكانتو, وماشابه)

  عادية --------- 140د ( سيراتو, فيرنا, أكسنت, أزيرا, وماشابه)

  عالية صفتين كراسى ----160 د ( سانتافي, سبورتاج, وماشابه)
  عالية 3 صفات كراسى --- 180د (سانتافي, جيب, بي أم, مرسيدس, وماشابه)
  عالية كبيرة ------ 220د ( مفخرة, لبوة, جى أم سي, وماشابه)

  • كاملة ( أرضية وكراسى سقف) + (تلميع فودرة وأبواب وكوفيني خلفي مجانآ)
  كركوبة-------- 150د (بيكانتو, وماشابه)
  عادية --------- 180د ( سيراتو, فيرنا, أكسنت, أزيرا, وماشابه)
  عالية صفتين كراسى --- 200 د ( سانتافي, سبورتاج, وماشابه)
  عالية 3 صفات كراسى --- 220د (سانتافي, جيب, بي أم, مرسيدس, وماشابه)
  عالية كبيرة ------ 250د ( مفخرة, لبوة, جى أم سي, وماشابه)

  <p>*ملاحظة: لو سيارتك حالتها سيئة.. يعني فيها بقع صعبة وإتساخ زايد تحتاج خدمة إضافية, فيه تكلفة إضافية بسيطة يحددها الفني لما يجيك.</p>
  <p>للحجز الان:
  </p>
  0918510100
  0928510100
  `;

  const contentWidth = useWindowDimensions().width;
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ margin: 20 }}>
        <HTML source={{ html: htmlContent }} contentWidth={contentWidth} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('FormScreen')} style={{ backgroundColor: 'red', flexDirection: 'row', margin: 10, padding: 10, borderRadius: 10 }}>
        <Text style={{ textAlign: 'center', flex: 1, color: 'white', fontSize: 20 }}>إبدا الان</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
