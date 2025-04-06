import { tweetService } from "../db/prueba";

class TweetController{
   
    async getAllTweets(){
        const allTweets = await tweetService.getAll();
       
      return allTweets;
    }

    async Pares() {
        const allTweets = await tweetService.getAll();
        const numPares = allTweets.filter((num: number) => num % 2 === 0);
        return numPares;
    }

}

export default TweetController;