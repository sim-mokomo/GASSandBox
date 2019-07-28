class SlackService {
    private token: string
    constructor(token: string) {
        this.token = token
    }

    postMessage(url: string, channel: string, text: string, username: string = "default bot name", icon_emoji: string = "") {
        var payload = {
            "token": this.token,
            "channel": channel,
            "text": text,
        var params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
            "method": "post",
            "payload": payload
        };
        const response = UrlFetchApp.fetch(url, params)
    }

    getChannelInfos() {
        var url = `https://slack.com/api/channels.list?token=${this.token}`
        var data = JSON.parse(UrlFetchApp.fetch(url).getContentText())
        return data["channels"]
    }

    getMessages(channelId: string, count: number) {
        var url = `https://slack.com/api/channels.history?token=${this.token}&channel=${channelId}&count=${count}`
        var data = JSON.parse(UrlFetchApp.fetch(url).getContentText())

        return data["messages"]
    }
