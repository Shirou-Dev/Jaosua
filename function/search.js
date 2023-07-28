const {google} = require('googleapis');

google.youtube("v3").search.list({
    part: 'snippet',
    type: 'video',
    key: client.config.YOUTUBE_API,
    maxResults: 10,
    
}).then((response) => {
    const { data } = response;
    data.items.forEach((item) => {
        console.log(`Title: ${item.snippet.title}\nDescription: ${item.snippet.description}\n`);
    })
}).catch((err) => console.log(err));