import React from "react";
import "./About.css";
import aboutimg from "../../../assets/image1.png";

const About = () => {
  return (
    <>
      <div className="about_contaner">
        <div className="about_maxwidth">
          <div className="about_image">
            <img src={aboutimg} />
          </div>
          <div className="about_contant">
            <h6>ABOUT ME</h6>
            <h1>Stories That Touch Souls</h1>
            <p>
             Writing, for me, has never been merely a creative pursuit. It has been a lifelong dialogue with people, emotions, and society itself. Over the years, I have authored more than two dozen short stories, two novels, and several poems in my native language. Each work reflects fragments of my lived experiences, personal reflections, and a deep observation of the world around me. My writings are shared openly through social platforms and this website, inviting readers not just to read, but to connect, reflect, and engage.
My literary journey took a purposeful turn in 2016, when I began working closely with social organizations such as the UIS Cancer Foundation Charitable Trust, Ramadas Seba Sangathan, and Cancer Volunteers of Odisha, with the collective support of dedicated professionals. Through these collaborations, we were able to reach over 6,000 individuals, extend direct support to 334 cancer survivors, organize 21 cancer awareness programs across Odisha, and assist in the rehabilitation and education of children from nine affected families.
These experiences profoundly reshaped my understanding of life and reaffirmed my belief that literature carries responsibility. Writing, I realized, is not only an expression of thought but also a form of service. It has the power to cultivate empathy, provoke meaningful dialogue, and contribute to tangible social change.
While completing my novel <span style={{fontWeight:"600"}}>"Rupa Raija ra Rupaye(ରୁପ ରାଇଜ ର ରୂପେଇ)" ,"Bana Mallia ra Mahlara(ବଣ ମଲ୍ଲି ର ମହ୍ଲାର) " </span>every sentence felt infused with intention and emotional depth. The work became a quiet reminder of my purpose as a writer: to touch hearts, to inspire hope, and to contribute, even in a small way, toward a more compassionate and conscious society.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
