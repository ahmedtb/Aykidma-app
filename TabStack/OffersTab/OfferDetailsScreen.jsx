

import React, { Component } from "react";
import { ScrollView, useWindowDimensions, View, TouchableOpacity, Text } from "react-native";
import HTML from "react-native-render-html";

const htmlContent = `
    <h1 style="text-align: center">عروض التنظيف لشهر رمضان المبارك</h1>
    <h2>عنوان جانبي</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <p style="">أقوي غسيل سجاد وكل المفروشات صالونات جلسات ستارات فرشات منادير صالونات...درجة أولي وبإحترافية عالية - مش كل من عنده ماكينة يعرف ينظف...</p>
    <p>خبرة سنوات طويلة في التنظيف أقوي معدات لشفط البقع العميقة لغسيل ونظافة وتجفيف السجاد في عين المكان</p>
    <p>مش ماكينة صابون وخلاص....نشفطوا الاوساخ (زيوت دهون سوائل...أي شي) من العمق الي السطح والنتيجة أنظف سجاد وريحة روعة من لاخير موكيت - بن وليد - عجمي - صيني - أي سجاد يحتاج الي عناية متخصصة</p>
    <p>تنظيفنا من الجذور لجميع المفروشات و أنواع السجاد وليس سطحي فقط غسيلنا عميق وعلي 3 مراحل - مفروشاتك و سجادك يصبح فعلا نظيف نظيف نظيف ثم التعطير بعطر شرقي او غربي </p>
    <p>فريق متخصص لغسيل المفروشات والسجاد لخدمتكم أين ماكنتم</p>
    <p>المساجد : سعر خاص للمساجد والعقود الثابتة والمساحات فوق 500م</p>

    <p>مفيش حاجة متتنظفش...ستائر جلسات صالونات سيارات...كله في مكانه</p>    
`;

export default function OfferDetailsScreen({ navigation }) {
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
