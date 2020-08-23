import React,{useState, useEffect, createRef} from 'react'
import {Card, CardActions, CardActionArea,CardContent,CardMedia,Button,Typography} from "@material-ui/core"
import useStyles from "./styles"
import classNames from "classnames"


const NewsCard = ({article:{ description, publishedAt, source, title, url, urlToImage}, i, activeArticle}) => {
    const classes = useStyles(); //this is working now as a hook
    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offset -50);

    useEffect(() => {
        setElRefs((refs) => Array(20).fill().map((_,j) => refs[j] || createRef()))
    }, [])

    useEffect(() => {
        if(i === activeArticle && elRefs[activeArticle]){
            scrollToRef(elRefs[activeArticle])
        }
    }, [i, activeArticle, elRefs])

    return (
        <Card ref={elRefs[i]} className={ classNames(classes.card, activeArticle === i ? classes.activeCard : null )}>
           <CardActionArea href={url} target="_blank">
              <CardMedia className={classes.media} image={urlToImage || 'https://www.google.com/search?q=news+image+pic&tbm=isch&sxsrf=ALeKk01Pz4aE7WsaEHpFG0r1pwR_yH-OgA:1597911671703&source=lnms&sa=X&ved=0ahUKEwiB3svsrKnrAhXIxTgGHWarDBgQ_AUIECgD&biw=1366&bih=576&dpr=1#imgrc=A8WuPNML3_qgCM'}/>
               <div className={classes.details}>
                 <Typography variant="body2" color = "textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                 <Typography variant="body2" color = "textSecondary" component="h2">{source.name}</Typography>
               </div>
               <Typography className={classes.title} gutterBottom variant="h5">{title}</Typography>
               <CardContent>
                 <Typography variant = "body2" color = "textSecondary"component="p">{description}</Typography>

               </CardContent>
           </CardActionArea>
           <CardActions className={classes.cardActions}>
             <Button size="small" color = "primary">Learn More</Button>
             <Typography variant="h5" color="textSecondary">{i + 1}</Typography>
           </CardActions>
        </Card>
    )
}

export default NewsCard;
