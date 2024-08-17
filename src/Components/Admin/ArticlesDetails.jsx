import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Avatar } from "@mui/material";

// लेखों के लिए नकली डेटा का उपयोग
const ArticleDetails = () => {
  const { id } = useParams();

  const mockArticlesData = [
    {
      _id: "1",
      reporterId: "123",
      title: "नेतानगरी: कोलकाता रेप-मर्डर केस में किसे बचाया जा रहा? स्टूडेंट और पत्रकारों ने क्या सच बता दिया?",
      subheading: "Netanagri के इस एपिसोड में Kolkata rape-murder case में पश्चिम बंगाल सरकार, पुलिस और अस्पताल प्रशासन की भूमिका के बारे में विस्तार से चर्चा हुई. स्वतंत्रता दिवस पर PM Modi की स्पीच पर भी बात हुई. साथ ही लाल किले से पूर्व प्रधानमंत्रियो की स्पीच पर एक्सपर्ट्स ने मजेदार किस्से सुनाए. देखें वीडियो...",
      content:
        "नेतानगरी में इस हफ्ते कोलकाता रेप-मर्डर केस के बारे में बात हुई. इसके अलावा स्वतंत्रता दिवस पर प्रधानमंत्री नरेंद्र मोदी के भाषण और लाल किले से पूर्व प्रधानमंत्रियों के भाषण और उस समय की परिस्थितियों पर विस्तार से चर्चा हुई. कोलकाता के RG KAR मेडिकल कॉलेज की ट्रेनी डॉक्टर के साथ हुई बर्बरता से पूरा देश गुस्से में है. और इस मामले में खूब राजनीति भी हो रही है. मेडिकल कॉलेज में घटना वाली रात क्या हुआ था? क्या वाकई कोलकाता पुलिस किसी को बचा रही है? आरजी मेडिकल कॉलेज में वहां पढ़ने वाले डॉक्टर और नर्स को किस तरह की परेशानियों का सामना करना पड़ता है? अस्पताल में हमले की रात क्या हुआ था? और RG KAR मेडिकल कॉलेज के प्रिंसिपल पर किसकी मेहरबानी है? जानने के लिए देखें नेतानगरी का ये एपिसोड.",
      category: "Technology",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQALEg-R_CJCav9rTawcYIWH6royDfV0L2ZLg&s",
      ],
      videoLink: "",
      verified: true,
      verifiedBy: "456",
      verifiedAt: new Date("2024-08-15"),
      status: "published",
      publishedBy: "रवि सिंह",
      publishDate: new Date("2024-08-16"),
    },
    {
      _id: "2",
      reporterId: "124",
      title: "स्वास्थ्य के क्षेत्र में नई खोज",
      subheading: "स्वास्थ्य के क्षेत्र में महत्वपूर्ण प्रगति",
      content:
        "स्वास्थ्य क्षेत्र में नई खोजों से रोगों के उपचार में नई दिशाएं खुली हैं...",
      category: "Health",
      images: [],
      videoLink: "",
      verified: true,
      verifiedBy: "457",
      verifiedAt: new Date("2024-07-22"),
      status: "published",
      publishedBy: "सीमा शर्मा",
      publishDate: new Date("2024-07-23"),
    },
    {
      _id: "3",
      reporterId: "125",
      title: "राष्ट्रीय खेल समाचार",
      subheading: "खेल जगत में भारत का दबदबा",
      content: "भारत ने राष्ट्रीय खेलों में अपनी स्थिति को और मजबूत किया है...",
      category: "Sports",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQALEg-R_CJCav9rTawcYIWH6royDfV0L2ZLg&s",
      ],
      videoLink: "",
      verified: true,
      verifiedBy: "458",
      verifiedAt: new Date("2024-06-10"),
      status: "rejected",
      rejectionReason: "असत्यापित स्रोतों का उपयोग",
      rejectionDate: new Date("2024-06-12"),
      publishedBy: "मोहन वर्मा",
      publishDate: null,
    },
    {
      _id: "4",
      reporterId: "126",
      title: "अंतरराष्ट्रीय व्यापार की स्थिति",
      subheading: "व्यापार जगत में नई चुनौतियां",
      content:
        "अंतरराष्ट्रीय व्यापार में इस साल कई चुनौतियों का सामना करना पड़ा...",
      category: "Business",
      images: [],
      videoLink: "",
      verified: true,
      verifiedBy: "459",
      verifiedAt: new Date("2024-05-15"),
      status: "published",
      publishedBy: "गीता देवी",
      publishDate: new Date("2024-05-20"),
    },
    {
      _id: "5",
      reporterId: "127",
      title: "मनोरंजन जगत की ताज़ा खबरें",
      subheading: "मनोरंजन जगत में इस हफ्ते की प्रमुख घटनाएं",
      content:
        "इस हफ्ते बॉलीवुड और हॉलीवुड की दुनिया से कई महत्वपूर्ण खबरें आई हैं...",
      category: "Entertainment",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQALEg-R_CJCav9rTawcYIWH6royDfV0L2ZLg&s",
      ],
      videoLink: "",
      verified: true,
      verifiedBy: "460",
      verifiedAt: new Date("2024-04-25"),
      status: "published",
      publishedBy: "राजेश कुमार",
      publishDate: new Date("2024-04-26"),
    },
  ];

  const article = mockArticlesData.find((article) => article._id === id);

  if (!article) {
    return <Typography>लेख नहीं मिला</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" fontWeight="600" gutterBottom>
        {article.title}
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {article.subheading}
      </Typography>
      {article.images.length > 0 && (
        <Avatar
          src={article.images[0]}
          alt="article image"
          sx={{ width: 300, height: 300, marginBottom: 2 }}
        />
      )}
      <Typography variant="body1" paragraph>
        {article.content}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        श्रेणी: {article.category}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        प्रकाशित तिथि:{" "}
        {article.publishDate
          ? article.publishDate.toLocaleDateString("hi-IN")
          : "N/A"}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        स्थिति: {article.status === "published" ? "स्वीकृत" : "अस्वीकृत"}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        लेखक: {article.publishedBy}
      </Typography>
    </Box>
  );
};

export default ArticleDetails;
