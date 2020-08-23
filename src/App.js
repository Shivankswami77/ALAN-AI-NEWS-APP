import React,{useEffect, useState} from "react"
import alanBtn from "@alan-ai/alan-sdk-web"
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles"
import wordsToNumbers from "words-to-numbers"
const alanLogoSrc = 'https://alan.app/voice/images/previews/preview.jpg';

const alanKey = 'd720dd264cca9b922e3791922099e9032e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {

    const[newsArticles, setNewsArticles] = useState([]);
    const[activeArticle, setActiveArticle] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();

useEffect(() => {
    alanBtn({
        key: alanKey,
        onCommand: ({ command, articles, number }) => {
            if (command === 'newHeadlines') {
              setNewsArticles(articles);
              setActiveArticle(-1);
            } else if (command === 'instructions') {
              setIsOpen(true);
            } else if (command === 'highlight') {
              setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
            } else if (command === 'open') {
              const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
              const article = articles[parsedNumber - 1];
    
              if (parsedNumber > 20) {
                alanBtn().playText('Please try that again...');
              } else if (article) {
                window.open(article.url, '_blank');
                alanBtn().playText('Opening...');
              } else {
                alanBtn().playText('Please try that again...');
              }
            }
          },
        });
      }, []); //is there is no array [] then it means it is going to run only one time

    return(
        <div>
        <div className = {classes.logoContainer}>
        
        <img src={alanLogoSrc} className={classes.alanLogo} alt="alan logo"></img>
        </div>
        <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}
//BBC NEWS - ThIS is what alan understands
//bbc-news -THIS IS WHAT API NEEDS
export default App;