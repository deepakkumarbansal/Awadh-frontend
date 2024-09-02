import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  Epaper,
  FollowUs,
  SamacharSangrah,
  Health,
  Hero,
  Rajya,
  PopularNews,
  Section,
  SectionCatagory,
  Videsh,
  Rajnetic,
  TrendingNews,
  Desh
} from "../index";
import "./Home.css";
import { articlesEndPoints } from "../../Services/apis";
import { toast } from "react-hot-toast";
import { apiConnector } from "../../Services/connector";
import { getAllArticles } from "../../Services/Operations/article";
const Youtube = lazy(()=>import('./Youtube/Youtube'))
const { GET_ALL_ARTICLE } = articlesEndPoints;
const Home = () => {
  // const disptach =useDispatch()
  const latestNewsData = [
    {
      category: "विश्व",
      title: "जलवायु परिवर्तन पर चर्चा के लिए वैश्विक नेताओं की बैठक",
      date: "2024-08-01",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "जॉन डो",
    },
    {
      category: "प्रौद्योगिकी",
      title: "नई एआई सफलता से उद्योग में क्रांति की संभावना",
      date: "2024-08-02",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "जेन स्मिथ",
    },
    {
      category: "स्वास्थ्य",
      title: "मेडिटेरेनियन आहार के स्वास्थ्य लाभों की पुष्टि नए अध्ययन द्वारा",
      date: "2024-08-03",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "डॉ. ऐलिस जॉनसन",
    },
    {
      category: "खेल",
      title: "ओलंपिक 2024: ट्रैक और फील्ड में रिकॉर्ड तोड़ प्रदर्शन",
      date: "2024-08-04",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "माइक एडम्स",
    },
    {
      category: "वित्त",
      title: "आर्थिक सुधार के बीच स्टॉक मार्केट ने छुआ सर्वकालिक उच्च स्तर",
      date: "2024-08-05",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "सुसान ली",
    },
    {
      category: "मनोरंजन",
      title: "नई ब्लॉकबस्टर फिल्म ने बॉक्स ऑफिस पर रिकॉर्ड तोड़ा",
      date: "2024-08-06",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "एमिली डेविस",
    },
    {
      category: "राजनीति",
      title: "राष्ट्रपति पद के उम्मीदवारों के बीच पहली बहस",
      date: "2024-08-07",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "रॉबर्ट विल्सन",
    },
    {
      category: "विज्ञान",
      title: "नासा ने दूरस्थ एक्सोप्लैनेट की खोज के लिए मिशन की घोषणा की",
      date: "2024-08-08",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "लौरा मार्टिनेज",
    },
    {
      category: "पर्यावरण",
      title: "प्रमुख संरक्षण प्रयास से विलुप्तप्राय प्रजातियों को बचाया गया",
      date: "2024-08-09",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "माइकल ग्रीन",
    },
    {
      category: "शिक्षा",
      title: "स्कूलों ने शिक्षा को बढ़ाने के लिए नई तकनीक को अपनाया",
      date: "2024-08-10",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "एंजेला ब्राउन",
    },
    {
      category: "यात्रा",
      title: "2024 के शीर्ष गंतव्य यात्रा विशेषज्ञों द्वारा प्रकट",
      date: "2024-08-11",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "डेविड क्लार्क",
    },
    {
      category: "जीवनशैली",
      title: "शहरी क्षेत्रों में न्यूनतम जीवन जीने का बढ़ता चलन",
      date: "2024-08-12",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "करेन व्हाइट",
    },
    {
      category: "व्यापार",
      title: "टेक दिग्गजों का अरब डॉलर का सौदा",
      date: "2024-08-13",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "डैनियल हैरिस",
    },
    {
      category: "खाद्य",
      title:
        "पाक नवप्रवर्तनकर्ताओं ने नई फ्यूजन व्यंजनों के साथ सीमाओं को तोड़ा",
      date: "2024-08-14",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "ओलिविया रॉबर्ट्स",
    },
    {
      category: "रियल एस्टेट",
      title: "मुख्य शहरों में हाउसिंग मार्केट में उछाल",
      date: "2024-08-15",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "सोफिया लुईस",
    },
    {
      category: "फैशन",
      title: "सस्टेनेबल फैशन: उद्योग का भविष्य",
      date: "2024-08-16",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "राचेल स्कॉट",
    },
    {
      category: "ऑटोमोटिव",
      title:
        "गैस की कीमतों में वृद्धि के साथ इलेक्ट्रिक वाहनों की लोकप्रियता बढ़ी",
      date: "2024-08-17",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "केविन एंडरसन",
    },
    {
      category: "संस्कृति",
      title: "कला प्रदर्शनी में दुनिया भर के विविध प्रतिभाओं का प्रदर्शन",
      date: "2024-08-18",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "नताली थॉमस",
    },
    {
      category: "अर्थव्यवस्था",
      title: "वैश्विक अर्थव्यवस्था में स्थिरता के संकेत",
      date: "2024-08-19",
      img: "https://via.placeholder.com/150?text=Image+1",
      slug: "/",
      author: "एरिक कैंपबेल",
    },
  ];
  const ytVideos = [
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/niQMB7NV9NU?si=QhPeuHbgSjPTWp60"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/e3xORtmMH9o?si=42NoPWMgJ30cjgA6"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/mW85_7ARy9I?si=1cXv682kmqzBBN7E"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/tYDM2r8PhCk?si=gxA-KPCVoxSdxQ2r"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/IYBXnMgTQu8?si=zcgIYtGdLrdkYQSW"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/QGpo9UQW6ZE?si=r--FpKqgrzeoAxTJ"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/h-2L2eyBwzg?si=fdWMqWfpqj6sfWfP"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/r00tZpzz-0M?si=IDG0gEe-pNIKToWc"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/8OZKurrGBjw?si=WDcGGCTr_nhMCFt6"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/dtuG6NeVB8k?si=dPLip0EQXpPQUH3J"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/TkpHLE7J0wQ?si=scSa9xE9b-t_nBCZ"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/RPDPuz8gVTw?si=4ntQ8TqF7NSfLI7G"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/bfk5BLVeLT4?si=FeVmOHqQPUJcKR1T"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/z8iQFmLzSYg?si=cuL4Vzf9cpps_N6D"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/OurT-SW_cLs?si=qkBPtCpqcjO2f806"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/Xheufu4n3K0?si=etiELZVjRWq-a2oP"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/iLTVbxcylRA?si=YYNPCVgW7vmbPUDy"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/U8OfcnERTbk?si=GSOVkXq5Y7YSuk2B"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
    <iframe
      max-width="460"
      height="215"
      src="https://www.youtube.com/embed/x7OlH1vGE8g?si=9752HytZ2KAT_YAp"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>,
  ];

  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetching all the articles
  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      const data = await getAllArticles();
      setArticles(data);
      setLoading(false);
      console.log("data in home", data);
      // You can do more with the data here

    }

    fetchArticles();
  }, []);

  console.log("articles in jome", articles);
  return (
    <div>
      <Section id="hero">
          <Hero newsData={loading ? latestNewsData : articles} />
      </Section>
      <div id="container1">
        <div className="w-full">
          <Section id="desh" className="w-full">
            <Desh newsData={latestNewsData} />
          </Section>
          <Section id="videsh">
            <Videsh newsData={latestNewsData} />
          </Section>
          <Section id="Rajya">
            <Rajya newsData={latestNewsData} />
          </Section>
          <h1>Instagram</h1>
          <Section id="travel">
            <Rajnetic newsData={latestNewsData} />
          </Section>
          <Section id="health">
            <Health newsData={latestNewsData} />
          </Section>
          <Section id="SamacharSangrah">
            <SamacharSangrah newsData={latestNewsData} />
          </Section>
        </div>
        <div>
          {/* <Section id="popular"><PopularNews newsData={popularNewsData} /></Section>
          <div className='bg-gray-400 h-[300px] w-full my-10'>Ad</div>
          <Section id="trending"><TrendingNews newsData={trendingNewsData} /></Section> */}
          <Section>
            <SectionCatagory name="Youtube videos" />
              <Suspense fallback={<h1>Loading....</h1>}>
                <Youtube ytVideos={ytVideos}/>
              </Suspense>
          </Section>
        </div>
      </div>
      {/* <div id='container2'>
        <Section id="travel"><Travel newsData={travelNewsData} /></Section>
        <Section id="gadgets"><Gagets newsData={gadgetsNewsData} /></Section>
        <Section id="health"><Health newsData={healthNewsData} /></Section>
      </div> */}
    </div>
  );
};

export default Home;
