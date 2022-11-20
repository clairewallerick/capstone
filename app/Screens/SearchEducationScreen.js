import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import List from "../Components/List";
import SearchBar from "../Components/SearchBar";
import YoutubePlayer from "react-native-youtube-iframe";
import Button from "../Components/Button";
import { useIsFocused } from "@react-navigation/native";
import colors from "../config/colors";

const SearchEducationScreen = ({ navigation }) => {
  const [searchPhrase, setSearchPhrase] = useState(""); //variable keeping track of what user is wanting to search
  const [clicked, setClicked] = useState(false); //changes styling for search bar based on if user clicks on it
  const [data, setData] = useState(); //stores flat list of data from useEffect so can be used elsewhere

  const isFocused = useIsFocused();
  isFocused
    ? useEffect(() => {
        navigation.getParent().setOptions({ headerShown: true });
      })
    : useEffect(() => {
        navigation.getParent().setOptions({ headerShown: false });
      });

  // get data from the api in future when education is in the database
  //   useEffect(() => {
  //     const getData = async () => {
  //       const apiResponse = await fetch(
  //         ""
  //       );
  //       const edudata = await apiResponse.json();
  //       console.log(edudata);
  //       setData(edudata);
  //     };
  //     getData();
  //   }, []);

  // get data from the static list
  useEffect(() => {
    //CALLED AUTOMATICALLY WHEN PAGE LOADS
    const getData = async () => {
      const edudata = [
        {
          name: "Safe Sex",
          id: "1",
          details:
            "- An external condom (or just condom) is worn over the penis.\n- An internal condom is used in the vagina or anus.\n- Flavored condoms shoule be used for oral sex only.\n- Latex condoms protect best against HIV.\n- Plastic or synthetic rubber condoms are hypoallergenic but break easier.\n- Use water or silicone-based lube during sex to help keep the condom from tearing. Oil-based lube weakens condoms and causes them to break.",
          link: "https://www.cdc.gov/std/healthcomm/stdfact-stdriskandoralsex.htm",
        },
        {
          name: "HIV",
          id: "2",
          details:
            "HIV or human immunodeficiency virus is a virus that attacks the body's immune system. If HIV is not treated, it can lead to AIDS (acquired immunodeficiency syndrome). There is currently no effective cure. Once people get HIV, they have it for life. But with proper medical care, HIV can be controlled. People with HIV who get effective HIV treatment can live long, healthy lives and protect their partners.",
          link: "https://www.cdc.gov/hiv/basics/whatishiv.html",
        },
        {
          name: "Chlamydia",
          id: "3",
          details:
            "Chlamydia is a common STD that can infect both men and women, sometimes without any symptoms. It can cause serious, permanent damage to a woman's reproductive system. This can make it difficult or impossible for her to get pregnant in the future. \n\n Common Symptoms: \nburning sensation, abnormal discharge",
          link: "https://www.cdc.gov/std/chlamydia/default.htm ",
        },
        {
          name: "Prep/PeP",
          id: "4",
          details:
            "Prep or pre-exposure prophylaxis is a medicine taken daily to lower a person's chances of getting HIV. Two medications sold under the brand names Truvada® and Descovy® are approved for daily use as PrEP to help prevent a person without HIV from getting the virus from sex or injection drug use. PrEP is highly effective for preventing HIV if it is used as prescribed. PrEP is much less effective when it is not taken consistently.\n\nPep or post-exposure prophylaxis is a 30-day daily regimen taken to lower the chances of HIV infection in individuals after a single high-risk event. PEP must be started within 72 hours of exposure to be effective.",
          link: "https://www.cdc.gov/hiv/risk/",
        },
        {
          name: "Gonorrhea",
          id: "5",
          details:
            "Gonorrhea is an STD that can infect both men and women. It can cause infections in the genitals, rectum, and throat. It is very common, especially among young people aged 15-24 years.\n\nCommon Symptoms:\nBurning sensation, abnormal discharge, bleeding between periods, swollen testicles, anal itching",
          link: "https://www.cdc.gov/std/gonorrhea/default.htm ",
        },
        {
          name: "HPV",
          id: "6",
          details:
            "HPV is a very common virus that can be spread from one person to another person through anal, vaginal, or oral sex, or through other close skin-to-skin touching during sexual activity. Approximately 79 million Americans, most in their late teens and early 20s, are infected with HPV. Nearly all sexually active people who do not get the HPV vaccine get infected at some point in their lives. \n\nIn general, HPV is considered responsible for >90% of anal and cervical cancers, ~70% of vaginal cancers, and ~60% of penile cancers.",
          link: "https://www.cdc.gov/cancer/hpv/",
        },
        {
          name: "Herpes",
          id: "7",
          details:
            "Genital herpes is an STD caused by two types of viruses. Oral herpes is usually caused by HSV-1 and can result in cold sores or fever blisters on or around the mouth. Most people with oral herpes were infected during childhood or young adulthood from non-sexual contact with saliva.\n\nRecurring genital herpes is usually caused by HSV-2 and it is a chronic lifelong infection marked by sores in the genital area.  However, most people do not have any symptoms.",
          link: "https://www.cdc.gov/std/treatment-guidelines/herpes.htm  ",
        },
        {
          name: "Hepatitis",
          id: "8",
          details:
            "Hepatitis A, B, and C are viral infections that result in liver inflammation. All three can be transmitted via sexual activity. These viruses can also be spread by sharing needles. Hepatitis A and B are preventable with vaccination, but there is no vaccine for Hepatitis C.",
          link: "https://www.cdc.gov/hepatitis/index.htm",
        },
        {
          name: "Syphilis",
          id: "9",
          details:
            "Syphilis is a sexually transmitted infection that can cause serious health problems, if it is not treated. Syphilis is divided into stages (primary, secondary, latent, and tertiary). You can get syphilis by direct contact with a syphilis sore during vaginal, anal, or oral sex. You can find sores on or around the penis, vagina, anus, in the rectum, on the lips, or in the mouth. Syphilis can spread from an infected mother to her unborn baby.",
          link: "https://www.cdc.gov/std/syphilis/  ",
        },
        {
          name: "Trich",
          id: "10",
          details:
            "Trichomoniasis (or “trich”) is a very common sexually transmitted infection. It is caused by infection with a protozoan parasite called trichomonas vaginalis. Although symptoms of the disease vary, most people who have the parasite cannot tell they are infected.",
          link: "https://www.cdc.gov/std/treatment-guidelines/trichomoniasis.htm  ",
        },
        {
          name: "COVID-19",
          id: "11",
          details:
            "COVID-19 is an infectious disease caused by the SARS-CoV-2 virus. Most people infected with the virus will experience mild to moderate respiratory illness and recover without requiring special treatment. However, some will become seriously ill and require medical attention. Older people and those with underlying medical conditions like cardiovascular disease, diabetes, chronic respiratory disease, or cancer are more likely to develop serious illness. Anyone can get sick with COVID-19 and become seriously ill or die at any age.",
          link: "https://www.cdc.gov/coronavirus/2019-ncov/index.html",
        },
        {
          name: "Monkeypox",
          id: "12",
          details:
            "Monkey Pox is a rare disease caused by infection with the monkeypox virus. Monkeypox virus is part of the same family of viruses as variola virus, the virus that causes smallpox. Monkeypox symptoms are similar to smallpox symptoms, but milder, and monkeypox is rarely fatal.",
          link: "https://www.cdc.gov/poxvirus/monkeypox/about/index.html",
        },
      ];
      setData(edudata);
    };
    getData();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/textured-background.webp")}
      resizeMode="cover"
      style={styles.image}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.video}>
          {/* client said they wanted video on this page but at this point had not made one yet, left remnants of component that I didn't use so that could be used if needed */}
          {/* https://www.npmjs.com/package/react-native-youtube-iframe */}
          <YoutubePlayer
            height={250}
            play={false}
            videoId={"ydrtF45-y-g"}
            // onChangeState={onStateChange}
          />
          {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}
        </View>

        <SearchBar
          // style={{ borderWidth: 4, size: "5%" }}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        />

        {!data ? (
          <ActivityIndicator size="large" />
        ) : (
          // List component renders flatlist, this just passes it the info it needs
          // <View style={{ height: "50%", backgroundColor: colors.dark }}>
          <List
            searchPhrase={searchPhrase}
            data={data}
            setClicked={setClicked}
            setScroll={false} //makes it so that this screen doesn't scroll cause doesn't need to
            style={{ marginTop: "10%" }} //style specific to the list on this page, didn't want margin on full screen
            count={4} //allows me to control how many show up on the page so I can reuse List for the full screen
          />
          // </View>
        )}

        <View style={{ width: "100%" }}>
          {/* see below on how to pass variables on navigation */}
          <Button
            onPress={() =>
              navigation.navigate("FullEducationScreen", { data: data })
            }
            title="See All"
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SearchEducationScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    top: "5%",
    marginLeft: 5,
    marginRight: 5,
    justifyContent: "center",
    // flexDirection: "row",
    // flexWrap: "wrap",
    alignContent: "center",
  },
  title: {
    width: "100%",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
  button: {
    width: "50%",
    padding: 5,
    marginTop: "10%",
    marginLeft: "25%",
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 15,
  },
  video: {
    width: "100%",
    marginTop: "20%",
    marginBottom: "5%",
  },
  listviewstyle: {
    height: "30%",
  },
  image: {
    flex: 1,
  },
});
